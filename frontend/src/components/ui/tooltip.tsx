import React from "react";

export const TooltipProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  // Minimal provider stub — just render children.
  // Replace with Radix/real provider later if you want tooltips.
  return <>{children}</>;
};