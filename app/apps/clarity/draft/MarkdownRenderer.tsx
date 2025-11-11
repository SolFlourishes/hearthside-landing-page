"use client"

import type React from "react" // Import React to declare JSX

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string) => {
    const lines = text.split("\n")
    const elements: React.JSX.Element[] = [] // Declare JSX.Element with React import
    let listItems: string[] = []
    let listStartIndex = 0

    const flushList = (index: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ol key={`list-${listStartIndex}`} className="list-decimal list-inside space-y-1 mb-4">
            {listItems.map((item, i) => (
              <li key={i} className="text-sm" dangerouslySetInnerHTML={{ __html: parseBold(item) }} />
            ))}
          </ol>,
        )
        listItems = []
      }
    }

    const parseBold = (text: string) => {
      return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    }

    lines.forEach((line, index) => {
      // Headings
      if (line.startsWith("### ")) {
        flushList(index)
        elements.push(
          <h3 key={index} className="text-base font-bold mb-2 mt-4">
            {line.replace("### ", "")}
          </h3>,
        )
      }
      // Numbered lists
      else if (/^\d+\.\s/.test(line)) {
        if (listItems.length === 0) {
          listStartIndex = index
        }
        listItems.push(line.replace(/^\d+\.\s/, ""))
      }
      // Regular paragraphs
      else if (line.trim()) {
        flushList(index)
        elements.push(
          <p
            key={index}
            className="text-sm mb-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseBold(line) }}
          />,
        )
      }
      // Empty lines
      else {
        flushList(index)
      }
    })

    // Flush any remaining list items
    flushList(lines.length)

    return elements
  }

  return <div className="prose prose-sm dark:prose-invert max-w-none">{parseMarkdown(content)}</div>
}
