import { Info } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CommunicationStyleInfoProps {
  mode: "draft" | "analyze"
}

export function CommunicationStyleInfo({ mode }: CommunicationStyleInfoProps) {
  return (
    <Card className="p-3 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 mb-3">
      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-blue-900 dark:text-blue-100">
          <p className="font-semibold mb-1">How Communication Preferences Work:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>
              <strong>Communication Style</strong> (Direct/Indirect) is the foundation - how you naturally express
              yourself
            </li>
            <li>
              <strong>Neurotype & Generation</strong> add important context about{" "}
              {mode === "draft" ? "how you and your audience" : "how they and you"} process information
            </li>
            <li>
              <strong>All selections work together</strong> - they don't override each other, they help us understand
              the full picture
            </li>
            <li>
              <strong>Unsure is okay!</strong> We'll use the information you do provide to give the best guidance
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
