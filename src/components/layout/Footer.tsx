
"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Rocket className="h-6 w-6 text-primary hidden md:inline-block" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by PitchPerfect Team. &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link>
            <Link href="/news" className="text-sm text-muted-foreground hover:text-primary">News</Link>
            <Link href="/messages" className="text-sm text-muted-foreground hover:text-primary">Messages</Link>
            <Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
