"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AgentForm from "@/components/agent-form"
import ResultDisplay from "@/components/result-display"
import AgentWorkflow from "@/components/agent-workflow"
import { ContentProvider } from "@/context/content-context"
import { Zap } from 'lucide-react'

export default function Dashboard() {
    return (
        <ContentProvider>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <div className="flex items-center space-x-2">
                        <Zap className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">ContentForge AI</span>
                    </div>
                </div>
                <Tabs defaultValue="create" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="create">Create Content</TabsTrigger>
                        <TabsTrigger value="results">Results</TabsTrigger>
                    </TabsList>
                    <TabsContent value="create" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Content Generation</CardTitle>
                                <CardDescription>
                                    Use our AI agents to create, refine, and optimize your content.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AgentForm />
                            </CardContent>
                        </Card>
                        <AgentWorkflow />
                    </TabsContent>
                    <TabsContent value="results" className="space-y-4">
                        <ResultDisplay />
                    </TabsContent>
                </Tabs>
            </div>
        </ContentProvider>
    )
}