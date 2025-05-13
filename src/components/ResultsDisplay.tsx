import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Save, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";

interface ResultsDisplayProps {
  originalText?: string;
  humanizedText?: string;
  aiDetectionScore?: number;
  onSaveToHistory?: () => void;
  onProcessAnother?: () => void;
  isLoggedIn?: boolean;
}

const ResultsDisplay = ({
  originalText = "This is a placeholder for the original AI-generated text. Paste your content in the input area above to see it transformed.",
  humanizedText = "Your humanized text will appear here after processing. The text will maintain key points while appearing more naturally written.",
  aiDetectionScore = 25,
  onSaveToHistory = () => {},
  onProcessAnother = () => {},
  isLoggedIn = false,
}: ResultsDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(humanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToHistory = () => {
    onSaveToHistory();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Determine score color based on AI detection probability
  const getScoreColor = () => {
    if (aiDetectionScore < 30) return "text-green-500";
    if (aiDetectionScore < 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Results</h2>
          <p className="text-gray-500">Your text has been humanized</p>
        </div>

        <div className="flex flex-col items-center mt-4 md:mt-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">
              AI Detection Probability:
            </span>
            <span className={`text-xl font-bold ${getScoreColor()}`}>
              {aiDetectionScore}%
            </span>
          </div>
          <Progress value={100 - aiDetectionScore} className="w-48 h-2" />
          <div className="flex items-center gap-2 mt-1">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-500">Human-like</span>
            <Separator orientation="vertical" className="h-4" />
            <ThumbsDown className="h-4 w-4 text-red-500" />
            <span className="text-xs text-gray-500">AI-like</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Original Text</h3>
              <span className="text-xs text-gray-500">Before</span>
            </div>
            <div className="h-64 overflow-y-auto border rounded-md p-3 text-sm bg-gray-50">
              {originalText}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Humanized Text</h3>
              <span className="text-xs text-gray-500">After</span>
            </div>
            <div className="h-64 overflow-y-auto border rounded-md p-3 text-sm bg-gray-50">
              {humanizedText}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy humanized text to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {isLoggedIn && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={saveToHistory}
                      >
                        <Save className="h-4 w-4 mr-1" />
                        {saved ? "Saved!" : "Save"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save this result to your history</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={onProcessAnother}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Process Another Text
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
