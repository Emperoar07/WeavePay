"use client";

import { useEffect } from "react";

export function ExtensionErrorGuard() {
  useEffect(() => {
    function silenceWalletInjectionConflict(event: ErrorEvent) {
      const source = event.filename || "";
      const message = event.message || "";

      if (
        source.startsWith("chrome-extension://") &&
        message.includes("Cannot redefine property: ethereum")
      ) {
        event.preventDefault();
      }
    }

    window.addEventListener("error", silenceWalletInjectionConflict);
    return () => window.removeEventListener("error", silenceWalletInjectionConflict);
  }, []);

  return null;
}
