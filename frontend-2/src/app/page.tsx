"use client";

import { useRef,useEffect } from "react";

export default function Home() {
    useEffect(() => {

    window.location.href = `https://event-carlo.rscarolus.or.id/carlo`; // 🔀 Redirect langsung ke login RBAC
  }, []);
 return null;
}
