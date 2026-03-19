"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../login/login.module.css";

async function syncUser() {
  const token = await auth.currentUser?.getIdToken();
  if (!token) return;
  await fetch("/api/auth/sync", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await syncUser();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.note}>
        <div className={styles.tape}></div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Create Account
          </button>
          <p className={styles.signupText}>
            Already have an account?{" "}
            <Link href="/login" className={styles.signupLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}