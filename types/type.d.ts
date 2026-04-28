type MongooseModule = typeof import("mongoose")

export interface MongooseCache {
  conn: MongooseModule | null
  promise: Promise<MongooseModule> | null
}

export interface RepoInfo {
  owner: string
  repo: string
  fullName: string
  url: string
}

export interface GitHubRepoData {
  // Basic info
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null

  // Metrics for benchmarks
  stars: number
  forks: number
  open_issues: number
  watchers: number
  size: number // in KB

  // Activity metrics
  created_at: string
  updated_at: string
  pushed_at: string

  // Owner info
  owner: {
    login: string
    avatar_url: string
    type: string
  }

  // Language stats
  language: string | null
  languages_url: string

  // Community health
  has_wiki: boolean
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_pages: boolean
  archived: boolean
  disabled: boolean

  // License
  license: {
    key: string
    name: string
    spdx_id: string
  } | null

  // Social proof
  subscribers_count: number
  network_count: number // forks count
}

export interface RepoInputProps {
  onAnalyze: (owner: string, repo: string) => void
  isLoading?: boolean
}

export interface HealthDonutChartProps {
  score: number
  size?: number
}

export interface VitalityMetrics {
  recentActivity: {
    value: string
    status: "excellent" | "good" | "warning" | "critical"
    message: string
  }
  commitFrequency: {
    value: number
    status: string
    message: string
  }
  issueVelocity: {
    value: number
    status: string
    message: string
  }
  prVelocity: {
    value: number
    status: string
    message: string
  }
  score: number
}

export interface CommunityMetrics {
  stars: { value: number; trend: number }
  forks: { value: number; trend: number }
  contributors: { value: number; trend: number }
  score: number
}

export interface CodeHealthMetrics {
  hasLicense: boolean
  licenseType: string | null
  isOsiApproved: boolean
  topics: string[]
  hasDescription: boolean
  hasReadme: boolean
  score: number
}

export interface RepoAnalysis {
  repoFullName: string
  description: string | null
  stars: number
  forks: number
  contributors: number
  overallHealth: number
  vitality: VitalityMetrics
  community: CommunityMetrics
  codeHealth: CodeHealthMetrics
}

export interface CommitData {
  date: string
  commits: number
}
