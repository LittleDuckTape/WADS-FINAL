import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>

      <div className={styles.note}>

        <div className={styles.tape}></div>

        <h1 className={styles.title}>
          Welcome to Student Planner
        </h1>

        <div className={styles.buttonRow}>

          <Link href="/login">
            <button className={styles.button}>
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className={styles.button}>
              Sign Up
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}