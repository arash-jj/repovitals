import { NextRequest, NextResponse } from "next/server"
import { extractRepoInfo, fetchRepoData, fetchRepoLanguages } from "@/lib/github-service"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { repoInput } = body
    if (!repoInput || typeof repoInput !== "string") {
      return NextResponse.json({ error: "Repository input is required" }, { status: 400 })
    }
    const repoInfo = extractRepoInfo(repoInput)
    if (!repoInfo) {
      return NextResponse.json(
        { error: "Invalid GitHub repository format. Use owner/repo or full GitHub URL" },
        { status: 400 }
      )
    }
    const [repoData, languages] = await Promise.all([
      fetchRepoData(repoInfo.owner, repoInfo.repo),
      fetchRepoLanguages(repoInfo.owner, repoInfo.repo),
    ])
    return NextResponse.json({
      success: true,
      repo: {
        ...repoInfo,
        data: repoData,
        languages,
      },
    })
  } catch (error) {
    console.error("Error analyzing repo:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to analyze repository"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
