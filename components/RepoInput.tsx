"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RepoInputProps } from "@/types/type"

const RepoInput = ({ onAnalyze, isLoading = false }: RepoInputProps) => {
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState("")
    const [isValid, setIsValid] = useState(false)
    const validateRepo = (value: string): boolean => {
        if(!value.trim()) return false
        const githubUrlPattern = /github\.com\/([^\/\s?#]+)\/([^\/\s?#]+)/
        const ownerRepoPattern = /^([a-zA-Z0-9-]+)\/([a-zA-Z0-9-_.]+)$/
        return githubUrlPattern.test(value) || ownerRepoPattern.test(value)
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        const valid = validateRepo(value)
        setIsValid(valid)
        if (value && !valid) {
            setError("Enter a GitHub repo (e.g., facebook/react or https://github.com/vercel/next.js)")
        } else {
            setError("")
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValid) {
            setError("Please enter a valid GitHub repository")
            return
        }
        let owner = ""
        let repo = ""
        const urlMatch = inputValue.match(/github\.com\/([^\/\s?#]+)\/([^\/\s?#]+)/)
        if (urlMatch) {
            owner = urlMatch[1]
            repo = urlMatch[2]
        } else {
            const parts = inputValue.split("/")
            owner = parts[0]
            repo = parts[1]
        }
        
        onAnalyze(owner, repo)
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Input
                type="text"
                placeholder="facebook/react or https://github.com/vercel/next.js"
                value={inputValue}
                onChange={handleInputChange}
                className={error ? "border-red-500" : isValid ? "border-green-500" : ""}
                disabled={isLoading}
                />
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
                {isValid && !error && inputValue && (
                <p className="text-sm text-green-500">
                    ✓ Valid GitHub repository
                </p>
                )}
                <p className="text-xs text-muted-foreground">
                    Examples: facebook/react, vercel/next.js, or paste full GitHub URL
                </p>
            </div>
            <Button type="submit" disabled={!isValid || isLoading} className="w-full">
                {isLoading ? "Analyzing..." : "Check Repository Health"}
            </Button>
        </form>
    )
}

export default RepoInput