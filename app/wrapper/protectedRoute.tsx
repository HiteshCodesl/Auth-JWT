"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); 
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  if (!token) return null; 

  return <>{children}</>;
}
