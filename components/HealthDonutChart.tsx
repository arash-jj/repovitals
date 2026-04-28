"use client"

import { HealthDonutChartProps } from "@/types/type"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const HealthDonutChart = ({ score, size = 200 }: HealthDonutChartProps) => {
    const data = [
        { name: "Health Score", value: score, color: "#22c55e" },
        { name: "Remaining", value: 100 - score, color: "#e5e7eb" },
    ]
    return (
        <div className="relative" style={{ width: size, height: size }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="100%"
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold">{score}</span>
                <span className="text-xs text-muted-foreground">Health Score</span>
            </div>
        </div>
    )
}

export default HealthDonutChart