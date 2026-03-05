"use client";

import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    try{

      await signInWithEmailAndPassword(auth,email,password);

      router.push("/dashboard");

    }catch(error){
      console.log(error);
      alert("Login failed");
    }
  };

  const loginWithGoogle = async () => {

    try{

      await signInWithPopup(auth,googleProvider);

      router.push("/dashboard");

    }catch(error){
      console.log(error);
      alert("Google login failed");
    }

  };

  return (
    <div className={styles.container}>

      <div className={styles.note}>

        <div className={styles.tape}></div>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className={styles.input}
          />

          <button
            type="submit"
            className={styles.button}
          >
            Login
          </button>

          <button
            type="button"
            onClick={loginWithGoogle}
            className={styles.googleButton}
          >
            <img
              src="/google-login.png"
              alt="Google logo"
              className={styles.googleLogo}
            />

            <span>Sign in with Google</span>
          </button>

          <p className={styles.signupText}>
            No account?{" "}
            <Link
              href="/signup"
              className={styles.signupLink}
            >
              Sign up
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}