import { GitHubRepoData, RepoInfo } from "@/types/type"

export function extractRepoInfo(input: string): RepoInfo | null {
    const trimmed = input.trim()
    if (!trimmed) return null
    let match = trimmed.match(/github\.com\/([^\/\s?#]+)\/([^\/\s?#]+)/)
    if (match) {
        return {
        owner: match[1],
        repo: match[2],
        fullName: `${match[1]}/${match[2]}`,
        url: `https://github.com/${match[1]}/${match[2]}`
        }
    }
    match = trimmed.match(/^([a-zA-Z0-9-]+)\/([a-zA-Z0-9-_.]+)$/)
    if (match) {
        return {
        owner: match[1],
        repo: match[2],
        fullName: `${match[1]}/${match[2]}`,
        url: `https://github.com/${match[1]}/${match[2]}`
        }
    }
    match = trimmed.match(/git@github\.com:([^\/]+)\/([^\.]+)/)
    if (match) {
        return {
        owner: match[1],
        repo: match[2].replace(/\.git$/, ''),
        fullName: `${match[1]}/${match[2].replace(/\.git$/, '')}`,
        url: `https://github.com/${match[1]}/${match[2].replace(/\.git$/, '')}`
        }
    }
    return null
    }
    export async function fetchRepoData(owner: string, repo: string): Promise<GitHubRepoData> {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
            'Accept': 'application/vnd.github.v3+json',
            ...(process.env.GITHUB_TOKEN && {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            })
        }
        })
    
    if (!response.ok) {
        if (response.status === 404) {
        throw new Error(`Repository "${owner}/${repo}" not found on GitHub`)
        }
        if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.')
        }
        throw new Error(`Failed to fetch repository: ${response.statusText}`)
    }
    
    const data = await response.json()
    return data as GitHubRepoData
    }
    export async function fetchRepoLanguages(owner: string, repo: string): Promise<Record<string, number>> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
        }
    })
    
    if (!response.ok) {
        throw new Error(`Failed to fetch languages: ${response.statusText}`)
    }
    
    return await response.json()
    }
    export async function fetchContributorStats(owner: string, repo: string): Promise<any> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`, {
        headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
        }
    })
    
    if (!response.ok) {
        return null
    }
    
    return await response.json()
}

export async function fetchCommitActivity(owner: string, repo: string) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`)
    const data = await res.json()
    return data.map((week: any) => ({
        date: new Date(week.week * 1000).toLocaleDateString(),
        commits: week.total
    }))
}

export async function fetchIssues(owner: string, repo: string) {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=closed&per_page=100`)
    const issues = await res.json()
    
    const resolutionTimes = issues.map((issue: any) => {
        const created = new Date(issue.created_at)
        const closed = new Date(issue.closed_at)
        return (closed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    })
    
    const avgTime = resolutionTimes.reduce((a: number, b: number) => a + b, 0) / resolutionTimes.length
    return { avgTime: avgTime.toFixed(1), total: issues.length }
}

export async function fetchStarHistory(owner: string, repo: string) {
    const res = await fetch(`https://api.star-history.com/json?owner=${owner}&name=${repo}`)
    const data = await res.json()
    return data
}