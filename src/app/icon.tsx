import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16150f",
          color: "#f5f3ee",
          borderRadius: 14,
          fontSize: 46,
          fontFamily: "serif",
          fontStyle: "italic",
          paddingBottom: 6,
        }}
      >
        d
      </div>
    ),
    size,
  );
}
