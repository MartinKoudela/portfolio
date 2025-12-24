'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * AntigravityInner Component
 * 
 * The core logic for the particle field. It handles:
 * - Particle initialization and state
 * - Mouse interaction (magnetism)
 * - Autonomous movement (autoAnimate)
 * - Rendering via Three.js InstancedMesh for high performance
 */
const AntigravityInner = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = '#FF9FFC',
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10
}) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Track mouse state for interactivity
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  // Initialize particles with random properties
  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;

      // Initial positions
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 20;

      const randomRadiusOffset = (Math.random() - 0.5) * 2;

      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: x, // Main X (base position)
        my: y, // Main Y
        mz: z, // Main Z
        cx: x, // Current X (animated position)
        cy: y,
        cz: z,
        vx: 0, // Velocity X
        vy: 0,
        vz: 0,
        randomRadiusOffset
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  // Animation loop
  useFrame(state => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v, pointer: m } = state;

    // Detect mouse movement
    const mouseDist = Math.sqrt(Math.pow(m.x - lastMousePos.current.x, 2) + Math.pow(m.y - lastMousePos.current.y, 2));

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: m.x, y: m.y };
    }

    // Determine target coordinates for the virtual "magnet"
    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    // If no mouse move for 2s, switch to autonomous circular motion
    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
    }

    // Smoothly transition the virtual mouse position
    const smoothFactor = 0.05;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;

    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    // Update each particle's position and orientation
    particles.forEach((particle, i) => {
      let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;

      t = particle.t += speed / 2;

      // Perspective-aware target projection
      const projectionFactor = 1 - cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;

      const dx = mx - projectedTargetX;
      const dy = my - projectedTargetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetPos = { x: mx, y: my, z: mz * depthFactor };

      // Magnetism logic: If particle is near target, pull it into a ring formation
      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;

        // Add wave and randomness to the ring
        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));

        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z = mz * depthFactor + Math.sin(t) * (1 * waveAmplitude * depthFactor);
      }

      // Smoothly interpolate current position toward target position
      particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

      // Update the dummy object and apply its matrix to the instanced mesh
      dummy.position.set(particle.cx, particle.cy, particle.cz);

      // Make particles face the magnet center
      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      // Scale particles based on distance to the ring for a "focus" effect
      const currentDistToMouse = Math.sqrt(
        Math.pow(particle.cx - projectedTargetX, 2) + Math.pow(particle.cy - projectedTargetY, 2)
      );

      const distFromRing = Math.abs(currentDistToMouse - ringRadius);
      let scaleFactor = 1 - distFromRing / 10;

      scaleFactor = Math.max(0, Math.min(1, scaleFactor));

      const finalScale = scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);

      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Dynamic geometry selection */}
      {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
      {particleShape === 'sphere' && <sphereGeometry args={[0.2, 16, 16]} />}
      {particleShape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

/**
 * Antigravity Component
 * 
 * High-performance 3D particle background using React Three Fiber.
 * Particles react to mouse movement, creating a magnetic field effect.
 */
const Antigravity = props => {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
      <AntigravityInner {...props} />
    </Canvas>
  );
};

export default Antigravity;
