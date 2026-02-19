import React from "react";

interface FraudRing {
    ring_id: string;
    member_accounts: string[];
    pattern_type: string;
    risk_score: number;
}

interface Props {
    rings: FraudRing[];
}

export default function FraudRingTable({ rings }: Props) {
    if (rings.length === 0) {
        return (
            <p className="text-text-secondary text-sm">
                No fraud rings detected.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full forensic-table">
                <thead>
                    <tr>
                        <th>Ring ID</th>
                        <th>Pattern Type</th>
                        <th>Member Count</th>
                        <th>Risk Score</th>
                        <th>Member Accounts</th>
                    </tr>
                </thead>
                <tbody>
                    {rings.map((ring) => (
                        <tr key={ring.ring_id}>
                            <td className="font-mono text-accent-violet font-semibold">
                                {ring.ring_id}
                            </td>
                            <td>
                                <span className="inline-block px-2.5 py-1 rounded-full bg-accent-rose/10 text-accent-rose text-xs font-semibold uppercase tracking-wide">
                                    {ring.pattern_type}
                                </span>
                            </td>
                            <td className="text-text-primary font-medium">
                                {ring.member_accounts.length}
                            </td>
                            <td>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[80px]">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                                width: `${ring.risk_score}%`,
                                                background:
                                                    ring.risk_score >= 70
                                                        ? "linear-gradient(90deg, #f43f5e, #e11d48)"
                                                        : ring.risk_score >= 40
                                                            ? "linear-gradient(90deg, #f59e0b, #d97706)"
                                                            : "linear-gradient(90deg, #06b6d4, #0891b2)",
                                            }}
                                        />
                                    </div>
                                    <span
                                        className={`text-xs font-bold ${ring.risk_score >= 70
                                                ? "text-accent-rose"
                                                : ring.risk_score >= 40
                                                    ? "text-accent-amber"
                                                    : "text-accent-cyan"
                                            }`}
                                    >
                                        {ring.risk_score}
                                    </span>
                                </div>
                            </td>
                            <td className="font-mono text-xs text-text-secondary max-w-xs truncate">
                                {ring.member_accounts.join(", ")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
