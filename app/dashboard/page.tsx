"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login"); // 🚨 redirect if not logged in
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🚧 WIP 🚧</h1>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};