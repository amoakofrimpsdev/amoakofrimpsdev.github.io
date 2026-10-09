"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
};

/** The current time in a given zone. Renders nothing on the server, so it cannot mismatch. */
export default function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone,
      }).format(new Date()),
    () => null,
  );

  if (!time) return null;
  return <span className="tabular-nums">{time}</span>;
}
