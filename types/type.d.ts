type MongooseModule = typeof import("mongoose");

export interface MongooseCache {
    conn: MongooseModule | null;
    promise: Promise<MongooseModule> | null;
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
    size: number  // in KB
    
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
    network_count: number  // forks count
}

export interface RepoInputProps {
    onAnalyze: (owner: string, repo: string) => void
    isLoading?: boolean
}

export interface HealthDonutChartProps {
    score: number
    size?: number
}

