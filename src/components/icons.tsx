import type { Status } from "../types";

export function StatusIcon({ status, size = 14 }: { status: Status; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 14 14", "aria-hidden": true } as const;
  switch (status) {
    case "todo":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--muted)" strokeWidth="1.5" />
        </svg>
      );
    case "progress":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--warn)" strokeWidth="1.5" />
          <path d="M7 3.5 A3.5 3.5 0 0 1 7 10.5 Z" fill="var(--warn)" />
        </svg>
      );
    case "blocked":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="5.5" fill="none" stroke="var(--danger)" strokeWidth="1.5" />
          <path d="M3.2 10.8 L10.8 3.2" stroke="var(--danger)" strokeWidth="1.5" />
        </svg>
      );
    case "done":
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="6.25" fill="var(--accent)" />
          <path d="M4.3 7.2 L6.2 9 L9.8 5.2" fill="none" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-label="Blocked" role="img">
      <rect x="2.5" y="5.5" width="7" height="5" rx="1" fill="none" stroke="var(--danger)" strokeWidth="1.2" />
      <path d="M4 5.5 V4 a2 2 0 0 1 4 0 V5.5" fill="none" stroke="var(--danger)" strokeWidth="1.2" />
    </svg>
  );
}

export function EyeOffIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path d="M1.5 6 C3 3.5 9 3.5 10.5 6 C9 8.5 3 8.5 1.5 6 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M2 10 L10 2" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
