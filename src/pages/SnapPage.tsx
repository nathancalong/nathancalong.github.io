import { Link } from "react-router-dom";
import AwSnap from "@/assets/images/awsnap.png";

export default function SnapPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <img
          src={AwSnap}
          alt="Aw Snap"
          style={{ width: "4em", height: "4em" }}
        />
        <h1
          style={{
            fontSize: "1.5rem",
            color: "var(--color-primary)",
          }}
        >
          ERROR: Website deleted...
        </h1>
      </div>
      <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
        Just kidding! Click{" "}
        <Link
          to="/"
          style={{
            color: "var(--color-primary)",
          }}
        >
          here
        </Link>{" "}
        to return home.
      </p>
    </div>
  );
}
