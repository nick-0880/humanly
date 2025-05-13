import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import HumanizationControls from "./HumanizationControls";
import ResultsDisplay from "./ResultsDisplay";
import SubscriptionBanner from "./SubscriptionBanner";
import { motion } from "framer-motion";

interface TextHumanizerToolProps {
  userSubscription?: "free" | "premium" | "pro";
  wordLimit?: number;
}

const TextHumanizerTool = ({
  userSubscription = "free",
  wordLimit = 500,
}: TextHumanizerToolProps) => {
  const [inputText, setInputText] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [humanizationSettings, setHumanizationSettings] = useState({
    level: 50, // 0-100 scale
    style: "academic",
    preserveKeyPoints: true,
  });

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
  const isOverLimit = userSubscription === "free" && wordCount > wordLimit;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleClearText = () => {
    setInputText("");
    setHumanizedText("");
    setAiScore(null);
    setActiveTab("input");
  };

  const handleProcessText = () => {
    if (isOverLimit) return;

    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      // This is a placeholder for the actual humanization logic
      // In a real implementation, this would call an API
      const processed = simulateHumanization(inputText, humanizationSettings);
      setHumanizedText(processed.text);
      setAiScore(processed.aiScore);
      setIsProcessing(false);
      setActiveTab("results");
    }, 1500);
  };

  // Placeholder function to simulate text humanization
  const simulateHumanization = (
    text: string,
    settings: typeof humanizationSettings,
  ) => {
    // This would be replaced with actual API call to humanization service
    const words = text.split(" ");

    // Simple simulation - in reality this would be much more sophisticated
    const modifiedWords = words.map((word) => {
      // Randomly modify some words based on humanization level
      if (Math.random() < settings.level / 200) {
        return word + (Math.random() > 0.5 ? "s" : "");
      }
      return word;
    });

    // Calculate a fake AI detection score (lower is more human-like)
    const aiScore = Math.max(5, 90 - settings.level);

    return {
      text: modifiedWords.join(" "),
      aiScore,
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-background p-4 rounded-xl">
      <SubscriptionBanner
        subscription={userSubscription}
        wordCount={wordCount}
        wordLimit={wordLimit}
        isOverLimit={isOverLimit}
      />

      <Card className="mt-4 border-2 shadow-lg">
        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="input">Input Text</TabsTrigger>
              <TabsTrigger value="results" disabled={!humanizedText}>
                Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="input" className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Paste AI-Generated Text</h3>
                <div className="text-sm text-muted-foreground">
                  {wordCount} words{" "}
                  {userSubscription === "free" && `/ ${wordLimit}`}
                </div>
              </div>

              <Textarea
                placeholder="Paste your AI-generated text here..."
                className="min-h-[300px] text-base p-4"
                value={inputText}
                onChange={handleInputChange}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleClearText}>
                  Clear Text
                </Button>
                <div className="space-x-2">
                  <Button
                    variant="default"
                    onClick={handleProcessText}
                    disabled={!inputText.trim() || isProcessing || isOverLimit}
                  >
                    {isProcessing ? "Processing..." : "Humanize Text"}
                  </Button>
                </div>
              </div>

              <HumanizationControls
                settings={humanizationSettings}
                onSettingsChange={setHumanizationSettings}
                disabled={!inputText.trim() || isProcessing}
              />
            </TabsContent>

            <TabsContent value="results">
              {humanizedText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ResultsDisplay
                    originalText={inputText}
                    humanizedText={humanizedText}
                    aiScore={aiScore || 0}
                    onProcessAnother={() => setActiveTab("input")}
                  />
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextHumanizerTool;
