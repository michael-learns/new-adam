import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ARCH_PATH, MARK_BOX, STONE_PATH, WORD_BOX, WORD_PATH } from "@/components/brand/logo-paths";

export const OG_SIZE = { width: 1200, height: 630 };

/** Branded 1200x630 social card: wordmark, a two-line headline and the symbol. */
export async function renderOg({ line1, line2, footer }: { line1: string; line2: string; footer: string }) {
  const outfit = await readFile(
    join(process.cwd(), "node_modules/@fontsource/outfit/files/outfit-latin-700-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f7f8f4",
          padding: "80px 96px",
          fontFamily: "Outfit",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <svg width={220} height={220 * (WORD_BOX.h / WORD_BOX.w)} viewBox={`${WORD_BOX.x} ${WORD_BOX.y} ${WORD_BOX.w} ${WORD_BOX.h}`}>
            <path fillRule="evenodd" fill="#2454d6" d={WORD_PATH} />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 40, width: 640 }}>
            <div style={{ fontSize: 68, lineHeight: 1.05, color: "#18243a", letterSpacing: -2 }}>{line1}</div>
            <div style={{ fontSize: 68, lineHeight: 1.05, color: "#2454d6", letterSpacing: -2, marginTop: 12 }}>{line2}</div>
          </div>
          <div style={{ fontSize: 30, color: "#4a5468", marginTop: 40 }}>{footer}</div>
        </div>
        <svg width={260} height={260 * (MARK_BOX.h / MARK_BOX.w)} viewBox={`${MARK_BOX.x} ${MARK_BOX.y} ${MARK_BOX.w} ${MARK_BOX.h}`}>
          <path fillRule="evenodd" fill="#2454d6" d={ARCH_PATH} />
          <path fillRule="evenodd" fill="#ff873e" d={STONE_PATH} />
        </svg>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Outfit", data: outfit, weight: 700, style: "normal" }] },
  );
}
