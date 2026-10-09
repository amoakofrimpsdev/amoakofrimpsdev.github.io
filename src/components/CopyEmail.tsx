"use client";

import { useState } from "react";
import { Check, Copy } from "./icons";

export default function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied. Fall back to opening the mail client.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className={`btn btn-line ${className}`}>
      {copied ? <Check /> : <Copy />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
