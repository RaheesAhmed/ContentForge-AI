"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Search, BookOpen, Pencil, Edit, BarChart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const agents = [
    { name: "Research", icon: Search, color: "agent-research" },
    { name: "Outline", icon: BookOpen, color: "agent-outline" },
    { name: "Writing", icon: Pencil, color: "agent-writing" },
    { name: "Editing", icon: Edit, color: "agent-editing" },
    { name: "SEO", icon: BarChart, color: "agent-seo" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full bg-background/80 backdrop-blur-sm z-50">
        <Link className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">ContentForge AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Forge Brilliant Content with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Harness the power of multiple AI agents to create, refine, and optimize your content. From research to SEO, we've got you covered.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-sm space-y-2"
              >
                <Link href="/dashboard">
                  <Button className="w-full text-lg" size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our AI Agents
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Five specialized AI agents working together to create top-notch content
              </p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className={`agent-icon ${agent.color} mb-4`}>
                      <agent.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{agent.name} Agent</h3>
                    <p className="text-center text-muted-foreground">
                      {getAgentDescription(agent.name)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: scrollY > 200 ? 1 : 0, y: scrollY > 200 ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Creating Content Today
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform coordinates calls to different AI agents in sequence, building upon the work of previous agents to deliver fully researched, written, edited, and SEO-optimized content.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/dashboard">
                  <Button className="w-full text-lg" size="lg">
                    Try it for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  No credit card required. 14-day free trial.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <Zap className="h-6 w-6 text-primary" />
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2024 ContentForge AI. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

function getAgentDescription(agentName: string) {
  switch (agentName) {
    case "Research":
      return "Gathers comprehensive information on given topics"
    case "Outline":
      return "Structures the content for optimal flow and coherence"
    case "Writing":
      return "Produces high-quality, engaging main body of text"
    case "Editing":
      return "Refines and polishes the content for clarity and style"
    case "SEO":
      return "Optimizes the content for search engines and discoverability"
    default:
      return ""
  }
}