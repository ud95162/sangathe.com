"use client";

import { useRef, useState } from "react";
import { ta } from "@/lib/i18n/ta";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={ta.share.copy}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-page text-ink"
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {copied ? <path d="M5 13l4 4L19 7" /> : <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>}
        </svg>
      </button>
      <span role="status" className="sr-only">
        {copied ? ta.share.copied : ""}
      </span>
    </>
  );
}
