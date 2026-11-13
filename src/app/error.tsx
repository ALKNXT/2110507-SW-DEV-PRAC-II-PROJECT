"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="rounded-xl border border-line bg-white p-[clamp(1.25rem,3vw,2rem)] [overflow-wrap:anywhere]"><h1 className="mb-4 font-bold text-[clamp(1.85rem,4vw,3.15rem)] leading-[1.25]">Unable to load data</h1><p className="mb-4">Please check your connection and try again.</p><button className="inline-block cursor-pointer rounded-[7px] px-4 py-[.52rem] font-[650] no-underline disabled:cursor-wait disabled:opacity-60 border-0 bg-teal text-white" onClick={reset}>Try again</button></section>;
}
