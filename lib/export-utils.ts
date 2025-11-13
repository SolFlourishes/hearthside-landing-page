// Export utility functions for conversations, translations, and progress reports

interface ExportOptions {
  format: "text" | "json" | "markdown"
  includeMetadata?: boolean
}

export function exportConversation(conversation: any, options: ExportOptions = { format: "text" }) {
  const { format, includeMetadata = true } = options
  const date = new Date(conversation.created_at).toLocaleDateString()

  if (format === "json") {
    const data = JSON.stringify(conversation, null, 2)
    downloadFile(data, `conversation-${conversation.id}.json`, "application/json")
    return
  }

  if (format === "markdown") {
    let content = `# ${conversation.title || "Clarity Coach Conversation"}\n\n`

    if (includeMetadata) {
      content += `**Date:** ${date}\n`
      content += `**Mode:** ${conversation.mode || "Chat"}\n\n`
      content += `---\n\n`
    }

    if (Array.isArray(conversation.messages)) {
      conversation.messages.forEach((msg: any, idx: number) => {
        content += `### ${msg.role === "user" ? "You" : "Clarity Coach"}\n\n`
        content += `${msg.content}\n\n`
      })
    }

    downloadFile(content, `conversation-${date}.md`, "text/markdown")
    return
  }

  // Default to plain text
  let content = `${conversation.title || "Clarity Coach Conversation"}\n`
  content += `${"=".repeat(60)}\n\n`

  if (includeMetadata) {
    content += `Date: ${date}\n`
    content += `Mode: ${conversation.mode || "Chat"}\n\n`
    content += `${"=".repeat(60)}\n\n`
  }

  if (Array.isArray(conversation.messages)) {
    conversation.messages.forEach((msg: any) => {
      content += `${msg.role === "user" ? "YOU" : "CLARITY COACH"}:\n`
      content += `${msg.content}\n\n`
      content += `${"-".repeat(60)}\n\n`
    })
  }

  downloadFile(content, `conversation-${date}.txt`, "text/plain")
}

export function exportTranslation(translation: any, options: ExportOptions = { format: "text" }) {
  const { format, includeMetadata = true } = options
  const date = new Date(translation.created_at).toLocaleDateString()

  if (format === "json") {
    const data = JSON.stringify(translation, null, 2)
    downloadFile(data, `translation-${translation.id}.json`, "application/json")
    return
  }

  if (format === "markdown") {
    let content = `# Clarity Coach Translation\n\n`

    if (includeMetadata) {
      content += `**Date:** ${date}\n`
      content += `**Mode:** ${translation.mode}\n`
      content += `**Communication Style:** ${translation.communication_mode}\n\n`
      content += `---\n\n`
    }

    content += `## Original Message\n\n${translation.original_message}\n\n`
    content += `## Translated Message\n\n${translation.translation}\n\n`

    if (translation.explanation) {
      content += `## Explanation\n\n${stripHtml(translation.explanation)}\n\n`
    }

    downloadFile(content, `translation-${date}.md`, "text/markdown")
    return
  }

  // Default to plain text
  let content = `CLARITY COACH TRANSLATION\n`
  content += `${"=".repeat(60)}\n\n`

  if (includeMetadata) {
    content += `Date: ${date}\n`
    content += `Mode: ${translation.mode}\n`
    content += `Communication Style: ${translation.communication_mode}\n\n`
    content += `${"=".repeat(60)}\n\n`
  }

  content += `ORIGINAL MESSAGE:\n${translation.original_message}\n\n`
  content += `${"-".repeat(60)}\n\n`
  content += `TRANSLATED MESSAGE:\n${translation.translation}\n\n`

  if (translation.explanation) {
    content += `${"-".repeat(60)}\n\n`
    content += `EXPLANATION:\n${stripHtml(translation.explanation)}\n\n`
  }

  downloadFile(content, `translation-${date}.txt`, "text/plain")
}

export function exportBatchConversations(conversations: any[], format: "text" | "json" | "markdown" = "text") {
  if (format === "json") {
    const data = JSON.stringify(conversations, null, 2)
    downloadFile(data, `clarity-conversations-${new Date().toLocaleDateString()}.json`, "application/json")
    return
  }

  let content =
    format === "markdown"
      ? `# Clarity Coach Conversations Export\n\n**Exported:** ${new Date().toLocaleDateString()}\n\n---\n\n`
      : `CLARITY COACH CONVERSATIONS EXPORT\n${"=".repeat(60)}\nExported: ${new Date().toLocaleDateString()}\n\n`

  conversations.forEach((conv, idx) => {
    if (format === "markdown") {
      content += `## ${idx + 1}. ${conv.title || "Conversation"}\n\n`
      content += `**Date:** ${new Date(conv.created_at).toLocaleDateString()}\n\n`

      if (Array.isArray(conv.messages)) {
        conv.messages.forEach((msg: any) => {
          content += `**${msg.role === "user" ? "You" : "Clarity Coach"}:** ${msg.content}\n\n`
        })
      }
      content += `---\n\n`
    } else {
      content += `${idx + 1}. ${conv.title || "Conversation"}\n`
      content += `Date: ${new Date(conv.created_at).toLocaleDateString()}\n\n`

      if (Array.isArray(conv.messages)) {
        conv.messages.forEach((msg: any) => {
          content += `${msg.role === "user" ? "YOU" : "CLARITY COACH"}: ${msg.content}\n\n`
        })
      }
      content += `${"=".repeat(60)}\n\n`
    }
  })

  const extension = format === "markdown" ? "md" : "txt"
  const mimeType = format === "markdown" ? "text/markdown" : "text/plain"
  downloadFile(content, `clarity-conversations-${new Date().toLocaleDateString()}.${extension}`, mimeType)
}

export function exportBatchTranslations(translations: any[], format: "text" | "json" | "markdown" = "text") {
  if (format === "json") {
    const data = JSON.stringify(translations, null, 2)
    downloadFile(data, `clarity-translations-${new Date().toLocaleDateString()}.json`, "application/json")
    return
  }

  let content =
    format === "markdown"
      ? `# Clarity Coach Translations Export\n\n**Exported:** ${new Date().toLocaleDateString()}\n\n---\n\n`
      : `CLARITY COACH TRANSLATIONS EXPORT\n${"=".repeat(60)}\nExported: ${new Date().toLocaleDateString()}\n\n`

  translations.forEach((trans, idx) => {
    if (format === "markdown") {
      content += `## Translation ${idx + 1}\n\n`
      content += `**Date:** ${new Date(trans.created_at).toLocaleDateString()}\n`
      content += `**Mode:** ${trans.mode} | **Style:** ${trans.communication_mode}\n\n`
      content += `**Original:**\n${trans.original_message}\n\n`
      content += `**Translation:**\n${trans.translation}\n\n`
      content += `---\n\n`
    } else {
      content += `TRANSLATION ${idx + 1}\n`
      content += `Date: ${new Date(trans.created_at).toLocaleDateString()}\n`
      content += `Mode: ${trans.mode} | Style: ${trans.communication_mode}\n\n`
      content += `Original: ${trans.original_message}\n\n`
      content += `Translation: ${trans.translation}\n\n`
      content += `${"=".repeat(60)}\n\n`
    }
  })

  const extension = format === "markdown" ? "md" : "txt"
  const mimeType = format === "markdown" ? "text/markdown" : "text/plain"
  downloadFile(content, `clarity-translations-${new Date().toLocaleDateString()}.${extension}`, mimeType)
}

export function exportContactProgress(contact: any, interactions: any[]) {
  const content =
    `COMMUNICATION PROGRESS REPORT\n${"=".repeat(60)}\n\n` +
    `Contact: ${contact.name}\n` +
    `Relationship: ${contact.relationship}\n` +
    `Total Interactions: ${contact.interaction_count}\n` +
    `Date Range: ${new Date(interactions[interactions.length - 1]?.created_at || contact.created_at).toLocaleDateString()} - ${new Date(interactions[0]?.created_at || Date.now()).toLocaleDateString()}\n\n` +
    `${"=".repeat(60)}\n\n` +
    `PROGRESS METRICS:\n\n` +
    `Communication Effectiveness: ${contact.avg_effectiveness_score ? (contact.avg_effectiveness_score * 100).toFixed(1) + "%" : "N/A"}\n` +
    `Tool Reliance Trend: ${contact.reliance_trend || "Building baseline"}\n\n` +
    `${"=".repeat(60)}\n\n` +
    `INTERACTION HISTORY:\n\n`

  let history = content
  interactions.forEach((interaction: any, idx: number) => {
    history += `${idx + 1}. ${new Date(interaction.created_at).toLocaleDateString()}\n`
    history += `   Mode: ${interaction.mode}\n`
    history += `   Effectiveness: ${interaction.effectiveness_score ? (interaction.effectiveness_score * 100).toFixed(0) + "%" : "N/A"}\n\n`
  })

  downloadFile(
    history,
    `progress-${contact.name.replace(/\s+/g, "-")}-${new Date().toLocaleDateString()}.txt`,
    "text/plain",
  )
}

// Helper functions
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function stripHtml(html: string): string {
  const tmp = document.createElement("div")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}
