"use client";

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { StartupStage } from '@/types';
import { Search, X } from 'lucide-react';

interface StartupFiltersProps {
  onFilterChange: (filters: { industry: string; stage: string; searchTerm: string }) => void;
}

const industries = ["All", "Tech", "Healthcare", "Finance", "Education", "E-commerce", "Sustainability", "AI"];
const stages: (StartupStage | "All")[] = ["All", "Idea", "MVP", "Growth"];

export function StartupFilters({ onFilterChange }: StartupFiltersProps) {
  const [industry, setIndustry] = React.useState("All");
  const [stage, setStage] = React.useState<StartupStage | "All">("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleApplyFilters = () => {
    onFilterChange({ industry, stage, searchTerm });
  };

  const handleClearFilters = () => {
    setIndustry("All");
    setStage("All");
    setSearchTerm("");
    onFilterChange({ industry: "All", stage: "All", searchTerm: "" });
  };

  return (
    <div className="p-4 mb-6 bg-card border rounded-lg shadow-sm space-y-4 md:space-y-0 md:flex md:items-end md:gap-4 animate-fade-in-up">
      <div className="flex-grow">
        <Label htmlFor="searchTerm">Search by Name/Keyword</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            id="searchTerm" 
            placeholder="e.g., InnovateX, AI, SaaS" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="industryFilter">Industry</Label>
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger id="industryFilter">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="stageFilter">Stage</Label>
        <Select value={stage} onValueChange={(value) => setStage(value as StartupStage | "All")}>
          <SelectTrigger id="stageFilter">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            {stages.map(stg => <SelectItem key={stg} value={stg}>{stg}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleApplyFilters} className="w-full md:w-auto">Apply Filters</Button>
      <Button onClick={handleClearFilters} variant="outline" className="w-full md:w-auto">
        <X className="mr-2 h-4 w-4"/> Clear
      </Button>
    </div>
  );
}
