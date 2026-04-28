import { CodeHealthMetrics } from "@/types/type"

export function CodeHealthIndicators({ data }: { data: CodeHealthMetrics }) {
    return (
        <div className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">📝 Code Health Indicators</h3>
                <div className="text-2xl font-bold text-primary">{data.score}/100</div>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground mb-2">License</div>
                <div className="flex items-center gap-2 mb-2">
                    {data.hasLicense ? "✅" : "❌"}
                    <span className="font-medium">
                    {data.licenseType || "No license found"}
                    </span>
                </div>
                {data.isOsiApproved && (
                    <div className="text-xs text-green-600">✓ OSI Approved</div>
                )}
                {!data.hasLicense && (
                    <div className="text-xs text-yellow-600 mt-2">
                    Adding a license helps others use your code
                    </div>
                )}
                </div>
                
                <div className="p-4 rounded-lg border">
                    <div className="text-sm text-muted-foreground mb-2">Topics</div>
                    {data.topics.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {data.topics.map((topic) => (
                                <span key={topic} className="px-2 py-1 bg-secondary rounded-full text-xs">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted-foreground text-sm">
                            No topics added. Add topics to help people find your repo.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}