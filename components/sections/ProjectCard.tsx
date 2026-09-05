"use client"

import { ExternalLink, Github, Star, Code } from "lucide-react"
import Image from "next/image"
import { Lanyard, LanyardHeader, LanyardBody, LanyardFooter } from "@/components/reactbits/Lanyard"

export default function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <Lanyard variant="glass" hover={true} className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden -m-6 md:-m-8 mb-4 md:mb-6">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            quality={80}
            loading="lazy"
            onError={(e) => {
              console.error("Image load error:", project.image)
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Code className="w-16 h-16 text-purple-400/30" />
          </div>
        )}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm shadow-lg">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-xs font-semibold text-white">Featured</span>
            </div>
          </div>
        )}
      </div>
      
      <LanyardHeader>
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
      </LanyardHeader>

      <LanyardBody className="flex-1">
        <p className="text-purple-200/70 text-sm md:text-base mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies?.split(",").map((tech: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      </LanyardBody>

      <LanyardFooter>
        <div className="flex gap-3">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 transition-all text-sm font-medium border border-purple-500/30"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 hover:border-purple-500/40 transition-colors text-sm font-medium text-purple-300"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </LanyardFooter>
    </Lanyard>
  )
}
