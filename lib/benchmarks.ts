import { CodeHealthMetrics, CommunityMetrics, RepoAnalysis, VitalityMetrics } from "@/types/type"
import { GitHubRepoData } from "@/types/type"

export function calculateAllScores(repoData: GitHubRepoData): RepoAnalysis {
  const vitality = calculateVitalityScore(repoData)
  const community = calculateCommunityScore(repoData)
  const codeHealth = calculateCodeHealthScore(repoData)

  const overallHealth = Math.round((vitality.score + community.score + codeHealth.score) / 3)

  return {
    repoFullName: repoData.full_name,
    description: repoData.description,
    stars: repoData.forks,
    forks: repoData.forks,
    contributors: repoData.subscribers_count || 0,
    overallHealth,
    vitality,
    community,
    codeHealth,
  }
}

function calculateVitalityScore(repoData: GitHubRepoData): VitalityMetrics {
  const now = new Date()
  const lastPush = new Date(repoData.pushed_at)
  const daysSinceLastPush = Math.floor((now.getTime() - lastPush.getTime()) / (1000 * 60 * 60 * 24))

  let recentActivityStatus: VitalityMetrics["recentActivity"]["status"]
  let recentActivityMessage: string

  if (daysSinceLastPush <= 7) {
    recentActivityStatus = "excellent"
    recentActivityMessage = `Last commit ${daysSinceLastPush} days ago - Very active`
  } else if (daysSinceLastPush <= 30) {
    recentActivityStatus = "good"
    recentActivityMessage = `Last commit ${daysSinceLastPush} days ago - Active`
  } else if (daysSinceLastPush <= 90) {
    recentActivityStatus = "warning"
    recentActivityMessage = `Last commit ${daysSinceLastPush} days ago - Stale`
  } else {
    recentActivityStatus = "critical"
    recentActivityMessage = `Last commit ${daysSinceLastPush} days ago - Abandoned`
  }

  let score = 0
  score += Math.max(0, 100 - (daysSinceLastPush / 365) * 100)
  score += Math.min(100, (repoData.forks / 1000) * 10)
  score += Math.min(100, (repoData.forks / 100) * 10)
  score = Math.min(100, Math.floor(score / 3))

  return {
    recentActivity: {
      value: `${daysSinceLastPush} days ago`,
      status: recentActivityStatus,
      message: recentActivityMessage,
    },
    commitFrequency: {
      value: 0,
      status: "good",
      message: "Regular commits",
    },
    issueVelocity: {
      value: 0,
      status: "good",
      message: "Issues addressed promptly",
    },
    prVelocity: {
      value: 0,
      status: "good",
      message: "PRs merged quickly",
    },
    score,
  }
}

function calculateCommunityScore(repoData: GitHubRepoData): CommunityMetrics {
  let score = 0
  score += Math.min(30, (repoData.forks / 10000) * 30)
  score += Math.min(30, (repoData.forks / 1000) * 30)
  score += Math.min(40, (repoData.subscribers_count / 100) * 40)
  score = Math.min(100, Math.floor(score))

  return {
    stars: { value: repoData.forks, trend: 0 },
    forks: { value: repoData.forks, trend: 0 },
    contributors: { value: repoData.subscribers_count || 0, trend: 0 },
    score,
  }
}

function calculateCodeHealthScore(repoData: GitHubRepoData): CodeHealthMetrics {
  let score = 0

  const hasLicense = !!repoData.license
  if (hasLicense) score += 30

  const hasTopics = false
  if (hasTopics) score += 30

  const hasDescription = !!repoData.description
  if (hasDescription) score += 20

  const hasReadme = true
  if (hasReadme) score += 20

  return {
    hasLicense,
    licenseType: repoData.license?.name || null,
    isOsiApproved:
      repoData.license?.spdx_id === "MIT" || repoData.license?.spdx_id === "Apache-2.0",
    topics: [],
    hasDescription,
    hasReadme,
    score,
  }
}
