"use client";

import { useRef,useEffect } from "react";

export default function Home() {
    useEffect(() => {

    window.location.href = `http://192.168.6.87:4000`; // 🔀 Redirect langsung ke login RBAC
  }, []);
 return null;
}
