import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f5f3ee",
          color: "#16150f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#6b685d" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#e8431a" }} />
          {profile.role} · {profile.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "serif", fontSize: 112, lineHeight: 1, letterSpacing: -3 }}>
          <div>{profile.name}</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 64, color: "#47453c", letterSpacing: -1 }}>
            builds web software&nbsp;<span style={{ color: "#e8431a", fontStyle: "italic" }}>end to end.</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#47453c" }}>
          <div>React · TypeScript · Node.js</div>
          <div>MS Computer Science, USC</div>
        </div>
      </div>
    ),
    size,
  );
}
