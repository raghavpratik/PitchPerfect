"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress";
import type { StartupStage } from '@/types';
import { Lightbulb, Zap, TrendingUp } from 'lucide-react';

interface StatusTrackerProps {
  currentStage: StartupStage;
}

const stages: StartupStage[] = ["Idea", "MVP", "Growth"];
const stageIcons = {
  "Idea": <Lightbulb className="h-5 w-5" />,
  "MVP": <Zap className="h-5 w-5" />,
  "Growth": <TrendingUp className="h-5 w-5" />,
};

export function StatusTracker({ currentStage }: StatusTrackerProps) {
  const currentStageIndex = stages.indexOf(currentStage);
  const progressValue = ((currentStageIndex + 1) / stages.length) * 100;

  return (
    <div className="w-full p-4 border rounded-lg shadow-sm bg-card">
      <h3 className="text-lg font-semibold mb-4 font-headline">Startup Progress</h3>
      <div className="relative mb-2">
        <Progress value={progressValue} className="h-3" />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-3">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className={`flex flex-col items-center text-center w-1/3 ${
              index <= currentStageIndex ? 'text-primary font-medium' : ''
            }`}
          >
            <div className={`p-2 rounded-full mb-1 ${index <= currentStageIndex ? 'bg-primary/20' : 'bg-muted'}`}>
              {React.cloneElement(stageIcons[stage], { className: `h-5 w-5 ${index <= currentStageIndex ? 'text-primary' : 'text-muted-foreground'}`})}
            </div>
            {stage}
          </div>
        ))}
      </div>
    </div>
  );
}
