"use client"

import { useContent } from "@/context/content-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, BookOpen, Pencil, Edit, BarChart } from 'lucide-react'

const agentIcons = {
    research: Search,
    outline: BookOpen,
    writing: Pencil,
    editing: Edit,
    seo: BarChart,
}

export default function ResultDisplay() {
    const { contentState } = useContent()

    if (!contentState.results) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Content Generation Results</CardTitle>
                <CardDescription>
                    Review the output from each AI agent in the content creation process.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(contentState.results).map(([agent, result]) => {
                        const Icon = agentIcons[agent as keyof typeof agentIcons]
                        return (
                            <AccordionItem key={agent} value={agent}>
                                <AccordionTrigger className="text-left">
                                    <div className="flex items-center space-x-2">
                                        <Icon className="h-5 w-5" />
                                        <span>{agent.charAt(0).toUpperCase() + agent.slice(1)} Agent Result</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">
                                        {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                                    </pre>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </CardContent>
        </Card>
    )
}