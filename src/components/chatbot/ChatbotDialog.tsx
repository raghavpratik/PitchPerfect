
// This file is deprecated and replaced by NarratoSheet.tsx.
// Keeping it temporarily to avoid build errors if referenced elsewhere,
// but it should be deleted.
"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ChatbotDialog({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chatbot (Deprecated)</DialogTitle>
        </DialogHeader>
        <p>This component is deprecated. Please use NarratoSheet.</p>
      </DialogContent>
    </Dialog>
  );
}
