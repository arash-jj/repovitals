import { VitalityMetrics } from "@/types/type"

const statusColors = {
    excellent: "text-green-600 bg-green-50",
    good: "text-blue-600 bg-blue-50",
    warning: "text-yellow-600 bg-yellow-50",
    critical: "text-red-600 bg-red-50",
}

export function ProjectVitality({ data }: { data: VitalityMetrics }) {
    return (
        <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">📊 Project Vitality</h3>
            <div className="text-2xl font-bold text-primary">{data.score}/100</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
            label="Recent Activity"
            value={data.recentActivity.value}
            status={data.recentActivity.status}
            message={data.recentActivity.message}
            />
            <MetricCard
            label="Commit Frequency"
            value={`${data.commitFrequency.value}/week`}
            status={data.commitFrequency.status}
            message={data.commitFrequency.message}
            />
            <MetricCard
            label="Issue Velocity"
            value={`${data.issueVelocity.value} days`}
            status={data.issueVelocity.status}
            message={data.issueVelocity.message}
            />
            <MetricCard
            label="PR Velocity"
            value={`${data.prVelocity.value} days`}
            status={data.prVelocity.status}
            message={data.prVelocity.message}
            />
        </div>
        </div>
    )
}

function MetricCard({ label, value, status, message }: { 
    label: string
    value: string
    status: string
    message: string
    }) {
    return (
        <div className="p-4 rounded-lg border">
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="text-xl font-semibold mb-2">{value}</div>
        <div className={`text-xs px-2 py-1 rounded-full inline-block ${statusColors[status as keyof typeof statusColors]}`}>
            {message}
        </div>
        </div>
    )
}