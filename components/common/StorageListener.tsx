"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StorageListener() {
  const router = useRouter();

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        router.push("/login");
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [router]);

  return null;
}
