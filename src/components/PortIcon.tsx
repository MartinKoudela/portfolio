export default function PortIcon({ console, compact = false }: { console: boolean; compact?: boolean }) {
    if (compact) {
        return (
            <svg className="port-icon" width="24" height="17" viewBox="0 0 24 17" aria-hidden="true">
                {console ? (
                    <rect x="4.5" y="5" width="15" height="7" rx="3.5" />
                ) : (
                    <>
                        <rect x="0.5" y="0.5" width="23" height="16" />
                        <path d="M5.5 5 H18.5 V11.5 H15 V13.5 H9 V11.5 H5.5 Z" />
                    </>
                )}
            </svg>
        );
    }

    return (
        <svg className="port-icon" width="26" height="18" viewBox="0 0 26 18" aria-hidden="true">
            {console ? (
                <rect x="5.5" y="5.5" width="15" height="7" rx="3.5" />
            ) : (
                <>
                    <rect x="0.5" y="0.5" width="25" height="17" />
                    <path d="M6 5.5 H20 V12.5 H16 V14.5 H10 V12.5 H6 Z" />
                </>
            )}
        </svg>
    );
}
