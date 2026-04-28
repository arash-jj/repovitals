import { CommunityMetrics } from "@/types/type"

export function CommunityEngagement({ data }: { data: CommunityMetrics }) {
    return (
        <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">👥 Community Engagement</h3>
            <div className="text-2xl font-bold text-primary">{data.score}/100</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricItem
            label="Stars"
            value={data.stars.value.toLocaleString()}
            trend={data.stars.trend}
            icon="⭐"
            />
            <MetricItem
            label="Forks"
            value={data.forks.value.toLocaleString()}
            trend={data.forks.trend}
            icon="🍴"
            />
            <MetricItem
            label="Contributors"
            value={data.contributors.value.toLocaleString()}
            trend={data.contributors.trend}
            icon="👥"
            />
        </div>
        </div>
    )
}

function MetricItem({ label, value, trend, icon }: { 
    label: string
    value: string
    trend: number
    icon: string
    }) {
    return (
        <div className="text-center p-4 rounded-lg border">
        <div className="text-2xl mb-2">{icon}</div>
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== 0 && (
            <div className={`text-sm ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
            {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}% this month
            </div>
        )}
        </div>
    )
}