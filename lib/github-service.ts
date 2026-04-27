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