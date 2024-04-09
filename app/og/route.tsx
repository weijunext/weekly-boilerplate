/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { siteConfig } from "@/config/site";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || siteConfig.name;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "#f1f1f1",
          background: "#272934",
          width: "100%",
          height: "100%",
          paddingTop: 50,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",

            position: "absolute",
            top: 47,
            left: 104,
            height: 128,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {process.env.SITE_URL ? (
            <img
              src={`${process.env.SITE_URL}/logo.svg`}
              style={{
                borderRadius: "50%",
                width: 128,
                height: 128,
              }}
            />
          ) : (
            <></>
          )}
          <span>{siteConfig.name}</span>
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          《{title}》
        </h2>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
