"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";

export type FilterType = "all" | "completed" | "active";

interface TodoFilterProps {
  currentFilter: FilterType;
  onChange: (filter: FilterType) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onChange }) => {
  return (
    <ButtonGroup>
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        size="sm"
        className={` ${
                  currentFilter === "all" ? "border-white/20 bg-gray-500/20 transition" : "border-white/20 hover:bg-gray-400/20"
                }`}
        onClick={() => onChange("all")}
      >
        All
      </Button>
      <ButtonGroupSeparator />
      <Button
        variant={currentFilter === "completed" ? "default" : "outline"}
        size="sm"
        className={` ${
                  currentFilter === "completed" ? "border-white/20 bg-gray-500/20 transition" : "border-white/20 hover:bg-gray-400/20"
                }`}
        onClick={() => onChange("completed")}
      >
        Completed
      </Button>
      <ButtonGroupSeparator />
      <Button
        variant={currentFilter === "active" ? "default" : "outline"}
        size="sm"
        className={` ${
                  currentFilter === "active" ? "border-white/20 bg-gray-500/20 transition" : "border-white/20 hover:bg-gray-400/20"
                }`}
        onClick={() => onChange("active")}
      >
        Active
      </Button>
    </ButtonGroup>
  );
};
