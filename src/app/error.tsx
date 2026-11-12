"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="panel"><h1>Unable to load data</h1><p>Please check your connection and try again.</p><button onClick={reset}>Try again</button></section>;
}
