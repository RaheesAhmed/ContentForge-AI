"use client"

import { useState } from "react"
import { useContent } from "@/context/content-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, BookOpen, Pencil, Edit, BarChart } from 'lucide-react'

const agents = [
    { name: "research", label: "Research", icon: Search, description: "Gather comprehensive information" },
    { name: "outline", label: "Outline", icon: BookOpen, description: "Structure content flow" },
    { name: "writing", label: "Writing", icon: Pencil, description: "Produce main body of text" },
    { name: "editing", label: "Editing", icon: Edit, description: "Refine and polish content" },
    { name: "seo", label: "SEO", icon: BarChart, description: "Optimize for search engines" },
]

export default function AgentForm() {
    const [topic, setTopic] = useState("")
    const [selectedAgents, setSelectedAgents] = useState({
        research: true,
        outline: true,
        writing: true,
        editing: true,
        seo: true,
    })
    const { setContentState } = useContent()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setContentState((prev) => ({
            ...prev,
            topic,
            selectedAgents,
            results: null,
            error: null
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your content topic"
                    className="w-full"
                />
            </div>
            <div className="space-y-4">
                <Label>Select AI Agents</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map(({ name, label, icon: Icon, description }) => (
                        <div key={name} className="flex items-start space-x-3 space-y-0">
                            <Checkbox
                                id={name}
                                checked={selectedAgents[name as keyof typeof selectedAgents]}
                                onCheckedChange={(checked) =>
                                    setSelectedAgents((prev) => ({ ...prev, [name]: !!checked }))
                                }
                            />
                            <div className="flex flex-col">
                                <Label
                                    htmlFor={name}
                                    className="font-normal flex items-center space-x-2 cursor-pointer"
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                </Label>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Button type="submit" className="w-full">
                Generate Content
            </Button>
        </form>
    )
}