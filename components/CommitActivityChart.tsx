"use client"

import { CommitData } from "@/types/type"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"



export function CommitActivityChart({ data }: { data: CommitData[] }) {
    return (
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                <defs>
                    <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="commits" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    fill="url(#commitGradient)" 
                />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}