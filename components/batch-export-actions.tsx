"use client"

import { exportBatchConversations, exportBatchTranslations } from "@/lib/export-utils"
import { ExportMenu } from "@/components/export-menu"

interface BatchExportActionsProps {
  data: any[]
  type: "conversations" | "translations"
}

export function BatchExportActions({ data, type }: BatchExportActionsProps) {
  const handleExport = (format: "text" | "json" | "markdown") => {
    if (type === "conversations") {
      exportBatchConversations(data, format)
    } else {
      exportBatchTranslations(data, format)
    }
  }

  return <ExportMenu onExport={handleExport} label="Export All" variant="outline" />
}
