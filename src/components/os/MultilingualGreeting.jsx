import React, { useEffect, useMemo, useState } from "react";

const GREETINGS = [
  { text: "HELLO", language: "en" },
  { text: "สวัสดี", language: "th" },
  { text: "မင်္ဂလာပါ", language: "my" },
  { text: "HOLA", language: "es" },
  { text: "BONJOUR", language: "fr" },
  { text: "こんにちは", language: "ja" },
];

function characters(text) {
  if (typeof Intl.Segmenter === "function") {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)].map((part) => part.segment);
  }
  return Array.from(text);
}

export default function MultilingualGreeting({ className = "", cursorClassName = "bg-current" }) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(5);
  const [deleting, setDeleting] = useState(false);
  const greeting = GREETINGS[index];
  const letters = useMemo(() => characters(greeting.text), [greeting.text]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const full = visible >= letters.length;
    const timer = setTimeout(() => {
      if (deleting && visible === 0) {
        setIndex((value) => (value + 1) % GREETINGS.length);
        setDeleting(false);
      } else if (deleting) {
        setVisible((value) => value - 1);
      } else if (full) {
        setDeleting(true);
      } else {
        setVisible((value) => value + 1);
      }
    }, deleting ? 60 : full ? 2100 : 120);
    return () => clearTimeout(timer);
  }, [reducedMotion, visible, deleting, letters.length]);

  const current = reducedMotion ? GREETINGS[0] : greeting;
  return <span className={`greeting-text inline-flex items-center whitespace-nowrap ${className}`} data-reduced-motion={reducedMotion ? "true" : "false"} data-language={current.language} data-full-greeting={current.text}>
    <span aria-hidden="true" lang={current.language} data-visible-greeting>{reducedMotion ? current.text : letters.slice(0, visible).join("")}</span>
    {!reducedMotion && <span aria-hidden="true" className={`ml-1.5 inline-block h-[0.7em] w-1 shrink-0 animate-pulse rounded-sm ${cursorClassName}`} />}
    <span className="sr-only">Hello — greetings in English, Thai, Burmese, Spanish, French, and Japanese.</span>
  </span>;
}
