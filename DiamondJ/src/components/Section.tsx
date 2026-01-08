import React from "react";

export default function Section({
  title,
  subtitle,
  children,
  variant = "default",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "soft";
}) {
  const isSoft = variant === "soft";

  const headerStyle = { "--reveal-delay": "0ms" } as React.CSSProperties;
  const contentStyle = { "--reveal-delay": "120ms" } as React.CSSProperties;

  return (
    <section className={isSoft ? "py-12" : "py-16"}>
      <div className="container">
        <div
          className={isSoft ? "mb-6 max-w-3xl" : "relative mb-10 max-w-3xl"}
          data-reveal
          style={headerStyle}
        >
          {!isSoft ? (
            <div className="absolute -left-4 top-1 h-10 w-1 rounded-full bg-gradient-to-b from-[#d2a35a] to-[#b1482a]" />
          ) : null}

          <h2
            className={
              (isSoft
                ? "text-xl font-extrabold tracking-tight text-neutral-900 md:text-2xl"
                : "text-3xl font-black tracking-tight text-neutral-900 md:text-4xl") +
              " section-title"
            }
          >
            {title}
          </h2>

          {subtitle ? (
            <p
              className={
                isSoft
                  ? "mt-2 max-w-2xl text-sm text-neutral-600"
                  : "mt-3 max-w-2xl text-base text-neutral-600"
              }
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="relative" data-reveal style={contentStyle}>
          <div
            className={
              "pointer-events-none absolute inset-0 -z-10 rounded-3xl " +
              (isSoft ? "section-panel-soft" : "section-panel")
            }
          />
          {children}
        </div>
      </div>
    </section>
  );
}
