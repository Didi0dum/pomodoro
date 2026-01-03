import React from "react";

/**
 * Very small dialog primitives used by SettingsModal.
 * They are NOT accessible Radix replacements — just placeholders so imports work.
 */
export const Dialog: React.FC<{ children?: React.ReactNode; open?: boolean; onOpenChange?: (v: boolean) => void }> =
  ({ children }) => <>{children}</>;

export const DialogTrigger: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const DialogContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const DialogHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const DialogTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;