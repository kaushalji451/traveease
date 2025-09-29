"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyUserToken } from "@/lib/auth";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("auth/login");
      return;
    }

    async function checkAuth() {
      const userData = await verifyUserToken(token);
      if (!userData) {
        localStorage.removeItem("token");
        router.push("auth/login");
      }
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  return {loading };
}
