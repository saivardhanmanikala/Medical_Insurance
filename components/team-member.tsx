"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TeamMemberProps {
  name: string
  role: string
  funFact: string
  github: string
  linkedin: string
}

export function TeamMember({ name, role, funFact, github, linkedin }: TeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-muted-foreground mb-4">{role}</p>

        <div
          className={`overflow-hidden transition-all duration-300 ${isHovered ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm bg-muted p-2 rounded-md">"{funFact}"</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fun Fact</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center gap-4 p-4 border-t bg-muted/50">
        <Link href={github} className="text-muted-foreground hover:text-primary transition-colors">
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link href={linkedin} className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Link>
      </CardFooter>
    </Card>
  )
}

