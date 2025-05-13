import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Crown, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SubscriptionBannerProps {
  userSubscription?: "free" | "premium" | "pro";
  wordCount?: number;
  wordLimit?: number;
  onUpgrade?: () => void;
}

const SubscriptionBanner = ({
  userSubscription = "free",
  wordCount = 0,
  wordLimit = 500,
  onUpgrade = () => {},
}: SubscriptionBannerProps) => {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const isPremium = userSubscription !== "free";
  const usagePercentage = Math.min(
    Math.round((wordCount / wordLimit) * 100),
    100,
  );
  const isNearLimit = usagePercentage > 80;
  const isAtLimit = usagePercentage >= 100;

  return (
    <div className="w-full bg-white border rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {isPremium ? (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"
          >
            <Crown size={14} className="text-yellow-500" />
            {userSubscription.charAt(0).toUpperCase() +
              userSubscription.slice(1)}
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Free Tier
          </Badge>
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {wordCount} / {wordLimit} words
            </span>
            {isNearLimit && !isAtLimit && (
              <AlertCircle size={14} className="text-amber-500" />
            )}
            {isAtLimit && <AlertCircle size={14} className="text-red-500" />}
          </div>
          <Progress value={usagePercentage} className="w-40 h-2" />
        </div>
      </div>

      {!isPremium && (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
          onClick={() => setShowSubscriptionModal(true)}
        >
          Upgrade <ChevronRight size={14} />
        </Button>
      )}

      <Dialog
        open={showSubscriptionModal}
        onOpenChange={setShowSubscriptionModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade Your Plan</DialogTitle>
            <DialogDescription>
              Get unlimited words and premium features with our subscription
              plans.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium flex items-center gap-2">
                <Crown size={16} className="text-yellow-500" /> Premium Plan
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                $9.99/month - Unlimited words, priority support
              </p>
              <Button
                className="mt-3 w-full"
                onClick={() => {
                  setShowSubscriptionModal(false);
                  onUpgrade();
                }}
              >
                Select Plan
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium flex items-center gap-2">
                <Crown size={16} className="text-purple-500" /> Pro Plan
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                $19.99/month - Everything in Premium + advanced features
              </p>
              <Button
                className="mt-3 w-full"
                onClick={() => {
                  setShowSubscriptionModal(false);
                  onUpgrade();
                }}
              >
                Select Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionBanner;
