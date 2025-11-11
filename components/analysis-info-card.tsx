import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"

interface AnalysisInfoCardProps {
  detectedStyle?: string
  yourNeurotype?: string
  theirNeurotype?: string
  yourGeneration?: string
  theirGeneration?: string
  yourPoliticalIdentity?: string
  theirPoliticalIdentity?: string
  relationship?: string
  mode: "draft" | "analyze"
}

export function AnalysisInfoCard({
  detectedStyle,
  yourNeurotype,
  theirNeurotype,
  yourGeneration,
  theirGeneration,
  yourPoliticalIdentity,
  theirPoliticalIdentity,
  relationship,
  mode,
}: AnalysisInfoCardProps) {
  return (
    <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
            How This {mode === "draft" ? "Translation" : "Analysis"} Was Made
          </h4>
          <div className="text-xs text-blue-800 dark:text-blue-200 space-y-2">
            {detectedStyle && (
              <p>
                <strong>Detected Communication Style:</strong> <span className="capitalize">{detectedStyle}</span>
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {yourNeurotype && yourNeurotype !== "Unsure" && (
                <p>
                  <strong>Your Neurotype:</strong> {yourNeurotype}
                </p>
              )}
              {theirNeurotype && theirNeurotype !== "Unsure" && (
                <p>
                  <strong>Their Neurotype:</strong> {theirNeurotype}
                </p>
              )}
              {yourGeneration && yourGeneration !== "unsure" && (
                <p>
                  <strong>Your Generation:</strong> {yourGeneration}
                </p>
              )}
              {theirGeneration && theirGeneration !== "unsure" && (
                <p>
                  <strong>Their Generation:</strong> {theirGeneration}
                </p>
              )}
              {yourPoliticalIdentity && yourPoliticalIdentity !== "unsure" && (
                <p>
                  <strong>Your Politics:</strong> {yourPoliticalIdentity}
                </p>
              )}
              {theirPoliticalIdentity && theirPoliticalIdentity !== "unsure" && (
                <p>
                  <strong>Their Politics:</strong> {theirPoliticalIdentity}
                </p>
              )}
              {relationship && relationship !== "colleague" && (
                <p>
                  <strong>Relationship:</strong> <span className="capitalize">{relationship}</span>
                </p>
              )}
            </div>

            <p className="text-[10px] italic mt-2 pt-2 border-t border-blue-300 dark:border-blue-700">
              Each of these factors meaningfully influenced the {mode === "draft" ? "translation" : "analysis"} you
              received.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
