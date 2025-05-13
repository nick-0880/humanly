import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sliders, BookOpen, Briefcase, Coffee, Sparkles } from "lucide-react";

interface HumanizationControlsProps {
  onProcess?: () => void;
  isProcessing?: boolean;
}

const HumanizationControls = ({
  onProcess = () => {},
  isProcessing = false,
}: HumanizationControlsProps) => {
  const [humanizationLevel, setHumanizationLevel] = useState<number[]>([50]);
  const [style, setStyle] = useState<string>("academic");
  const [preserveKeyPoints, setPreserveKeyPoints] = useState<boolean>(true);

  const handleHumanizationLevelChange = (value: number[]) => {
    setHumanizationLevel(value);
  };

  const handleStyleChange = (value: string) => {
    setStyle(value);
  };

  const handlePreserveKeyPointsChange = () => {
    setPreserveKeyPoints(!preserveKeyPoints);
  };

  const handleProcess = () => {
    onProcess();
  };

  return (
    <Card className="w-full bg-white border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-gray-500" />
                <Label className="text-base font-medium">
                  Humanization Level
                </Label>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {humanizationLevel[0] < 33
                  ? "Subtle"
                  : humanizationLevel[0] < 66
                    ? "Moderate"
                    : "Aggressive"}
              </span>
            </div>
            <Slider
              value={humanizationLevel}
              onValueChange={handleHumanizationLevelChange}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Subtle</span>
              <span>Moderate</span>
              <span>Aggressive</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {style === "academic" && (
                <BookOpen className="h-5 w-5 text-gray-500" />
              )}
              {style === "professional" && (
                <Briefcase className="h-5 w-5 text-gray-500" />
              )}
              {style === "casual" && (
                <Coffee className="h-5 w-5 text-gray-500" />
              )}
              <Label className="text-base font-medium">Writing Style</Label>
            </div>
            <Select value={style} onValueChange={handleStyleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a writing style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gray-500" />
              <Label className="text-base font-medium">
                Preserve Key Points
              </Label>
            </div>
            <Switch
              checked={preserveKeyPoints}
              onCheckedChange={handlePreserveKeyPointsChange}
            />
          </div>

          <Button
            onClick={handleProcess}
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Humanize Text"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumanizationControls;
