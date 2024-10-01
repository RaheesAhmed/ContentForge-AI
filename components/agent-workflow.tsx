"use client"

import { useEffect, useState } from "react"
import { useContent } from "@/context/content-context"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AgentWorkflow() {
    const { contentState, setContentState } = useContent()
    const [progress, setProgress] = useState(0)
    const [currentAgent, setCurrentAgent] = useState<string | null>(null)

    useEffect(() => {
        if (contentState.topic && contentState.selectedAgents) {
            runAgentWorkflow()
        }
    }, [contentState.topic, contentState.selectedAgents])

    const runAgentWorkflow = async () => {
        const results: Record<string, any> = {}
        const selectedAgents = Object.entries(contentState.selectedAgents)
            .filter(([, isSelected]) => isSelected)
            .map(([agent]) => agent)

        for (let i = 0; i < selectedAgents.length; i++) {
            const agent = selectedAgents[i]
            setCurrentAgent(agent)
            setProgress((i / selectedAgents.length) * 100)

            try {
                const result = await callAgent(agent, getAgentInput(agent, results))
                results[agent] = result
            } catch (error) {
                console.error(`Error in ${agent} agent:`, error)
                setContentState((prev) => ({ ...prev, error: `Error in ${agent} agent` }))
                return
            }
        }

        setProgress(100)
        setCurrentAgent(null)
        setContentState((prev) => ({ ...prev, results, error: null }))
    }

    const callAgent = async (agent: string, data: any) => {
        const response = await fetch(`/api/agents/${agent}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        return result[agent] || result // Ensure we're returning the correct data
    }

    const getAgentInput = (agent: string, results: Record<string, any>) => {
        switch (agent) {
            case "research":
                return { topic: contentState.topic }
            case "outline":
                return { research: results.research }
            case "writing":
                return { outline: results.outline }
            case "editing":
                return { content: results.writing }
            case "seo":
                return { content: results.editing || results.writing }
            default:
                return {}
        }
    }

    if (!currentAgent && progress === 0) return null

    return (
        <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            {currentAgent && (
                <p className="text-sm text-muted-foreground">
                    Currently running: {currentAgent.charAt(0).toUpperCase() + currentAgent.slice(1)} Agent
                </p>
            )}
            {contentState.error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{contentState.error}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}