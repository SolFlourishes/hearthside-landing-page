"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, FileText, File } from "lucide-react"

interface UploadedFile {
  name: string
  size: number
  type: string
  content: string
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
  disabled?: boolean
}

export function FileUpload({ onFilesChange, maxFiles = 3, acceptedTypes, disabled = false }: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const defaultAcceptedTypes = [
    "text/plain",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "image/png",
    "image/jpeg",
  ]

  const accept = acceptedTypes?.join(",") || defaultAcceptedTypes.join(",")

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = async (e) => {
        const content = e.target?.result as string

        // For text files, return content directly
        if (file.type === "text/plain") {
          resolve(content)
          return
        }

        // For PDFs and Word docs, we'll send the base64 content
        // The AI can work with descriptions of the content
        if (file.type === "application/pdf" || file.type.includes("word")) {
          resolve(content)
          return
        }

        // For images, return base64
        if (file.type.startsWith("image/")) {
          resolve(content)
          return
        }

        resolve(content)
      }

      reader.onerror = () => reject(new Error("Failed to read file"))

      if (file.type === "text/plain") {
        reader.readAsText(file)
      } else {
        reader.readAsDataURL(file)
      }
    })
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])

    if (files.length + selectedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    setError(null)
    setIsProcessing(true)

    try {
      const processedFiles: UploadedFile[] = []

      for (const file of selectedFiles) {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          setError(`${file.name} is too large. Maximum size is 10MB.`)
          continue
        }

        const content = await readFileContent(file)

        processedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          content,
        })
      }

      const updatedFiles = [...files, ...processedFiles]
      setFiles(updatedFiles)
      onFilesChange(updatedFiles)
    } catch (err) {
      setError("Failed to process files. Please try again.")
      console.error("[v0] File processing error:", err)
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
    setError(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getFileIcon = (type: string) => {
    if (type === "text/plain") return <FileText className="w-4 h-4" />
    if (type === "application/pdf") return <FileText className="w-4 h-4 text-red-500" />
    if (type.includes("word")) return <FileText className="w-4 h-4 text-blue-500" />
    if (type.startsWith("image/")) return <File className="w-4 h-4 text-green-500" />
    return <File className="w-4 h-4" />
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isProcessing || files.length >= maxFiles}
          className="text-xs"
        >
          <Upload className="w-3 h-3 mr-1" />
          {isProcessing ? "Processing..." : "Attach Files"}
        </Button>
        <span className="text-xs text-muted-foreground">
          {files.length}/{maxFiles} files
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}

      {files.length > 0 && (
        <div className="space-y-1">
          {files.map((file, index) => (
            <Card key={index} className="p-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {getFileIcon(file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                disabled={disabled}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground">Supported: PDF, Word, Text, Images (max 10MB each)</p>
    </div>
  )
}
