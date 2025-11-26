"use client";

import { useRef,useEffect } from "react";

export default function Home() {
    useEffect(() => {

<<<<<<< HEAD
    window.location.href = `http://172.16.158.22:3000/carlo`; // 🔀 Redirect langsung ke login RBAC
=======
    window.location.href = `http://192.168.6.87:4000/carlo`; // 🔀 Redirect langsung ke login RBAC
>>>>>>> e9bfcaf59cf1a214fd4085e062271cc728f22f52
  }, []);
 return null;
}
