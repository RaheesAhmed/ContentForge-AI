"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface ContentState {
    topic: string
    selectedAgents: Record<string, boolean>
    results: Record<string, any> | null
    error: string | null
}

interface ContentContextType {
    contentState: ContentState
    setContentState: React.Dispatch<React.SetStateAction<ContentState>>
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
    const [contentState, setContentState] = useState<ContentState>({
        topic: "",
        selectedAgents: {
            research: true,
            outline: true,
            writing: true,
            editing: true,
            seo: true,
        },
        results: null,
        error: null,
    })

    return (
        <ContentContext.Provider value={{ contentState, setContentState }}>
            {children}
        </ContentContext.Provider>
    )
}

export function useContent() {
    const context = useContext(ContentContext)
    if (context === undefined) {
        throw new Error("useContent must be used within a ContentProvider")
    }
    return context
}