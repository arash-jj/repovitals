"use client"

import { useState } from "react"
import { ProjectVitality } from "@/components/ProjectVitality"
import { CommunityEngagement } from "@/components/CommunityEngagement"
import { CodeHealthIndicators } from "@/components/CodeHealthIndicators"
import { RepoAnalysis } from "@/types/type"
import { calculateAllScores } from "@/lib/benchmarks"
import RepoInput from "@/components/RepoInput"
import HealthDonutChart from "@/components/HealthDonutChart"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<RepoAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (owner: string, repo: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/analyze-repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoInput: `${owner}/${repo}` }),
      })
      
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)
      
      const analysisResults = calculateAllScores(data.repo.data)
      setAnalysis(analysisResults)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-learner-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl py-8 px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-learner-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            RepoVitals
          </h1>
          <p className="text-muted-foreground mt-2">
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <RepoInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </div>

        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-center">
            {error}
          </div>
        )}

        {analysis && (
          <div className="space-y-8 mt-8">
            
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0">
                  <HealthDonutChart score={analysis.overallHealth} size={180} />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">{analysis.repoFullName}</h2>
                  <p className="text-muted-foreground mb-4">{analysis.description}</p>
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                    <div>
                      <div className="text-sm text-muted-foreground">Stars</div>
                      <div className="text-xl font-semibold">{analysis.stars.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Forks</div>
                      <div className="text-xl font-semibold">{analysis.forks.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Contributors</div>
                      <div className="text-xl font-semibold">{analysis.contributors.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProjectVitality data={analysis.vitality} />
            <CommunityEngagement data={analysis.community} />
            <CodeHealthIndicators data={analysis.codeHealth} />

          </div>
        )}
      </div>
    </main>
  )
}