export function IssueHeatmap({ avgTime, trend }: { avgTime: number; trend: 'improving' | 'stable' | 'declining' }) {
    const colors = {
        improving: 'text-green-600 bg-green-50',
        stable: 'text-blue-600 bg-blue-50',
        declining: 'text-red-600 bg-red-50'
    }
    const messages = {
        improving: '↓ Getting faster! Issues resolved 15% quicker this month',
        stable: '→ Consistent resolution time. Room for improvement',
        declining: '↑ Getting slower! Consider more maintainers'
    }
    return (
        <div className={`p-4 rounded-lg border ${colors[trend]}`}>
        <div className="text-sm text-muted-foreground">Avg Issue Resolution</div>
        <div className="text-2xl font-bold">{avgTime} days</div>
        <div className="text-xs mt-2">{messages[trend]}</div>
        </div>
    )
}