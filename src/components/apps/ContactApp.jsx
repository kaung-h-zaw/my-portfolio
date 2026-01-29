import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
} from "lucide-react";

export default function ContactApp({ theme }) {
  const formRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  // Theme Logic
  const isDark = theme === "dark";

  // Colors
  const bgMain = isDark
    ? "bg-zinc-950 text-cyan-400"
    : "bg-slate-100 text-slate-800";
  const bgPanel = isDark ? "bg-zinc-900" : "bg-slate-50";
  const borderColor = isDark ? "border-cyan-900/50" : "border-slate-300";
  const inputBg = isDark
    ? "bg-black border-cyan-900 text-cyan-200 focus:border-cyan-500"
    : "bg-white border-slate-300 focus:border-slate-500";
  const textMuted = isDark ? "text-cyan-700" : "text-slate-500";
  const textPrimary = isDark ? "text-cyan-400" : "text-slate-800";
  const buttonPrimary = isDark
    ? "bg-cyan-900/50 hover:bg-cyan-800 text-cyan-300 border-cyan-800"
    : "bg-slate-800 hover:bg-slate-700 text-white border-slate-800";
  const socialBtn = isDark
    ? "bg-black border-cyan-900/50 hover:border-cyan-500 hover:bg-cyan-900/20 text-cyan-600 hover:text-cyan-400"
    : "bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-600 hover:text-slate-900";

  const email = "kaunghtetzaw.inbox@gmail.com";

  const socials = [
    { name: "GitHub", href: "https://github.com/kaung-h-zaw", icon: Github },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/kaung-h-zaw/",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/kaunghtetzaw_18/",
      icon: Instagram,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/kaung.htet.zaw.180202",
      icon: Facebook,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/66639473379",
      icon: MessageCircle,
    },
    {
      name: "LINE",
      href: "https://line.me/ti/p/4gHcvR5Mo4#~",
      icon: MessageCircle,
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setSending(false);
      setStatus("sent");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setSending(false);
      setStatus("error");
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      className={`h-full w-full ${bgMain} font-mono overflow-y-auto custom-scrollbar flex flex-col md:flex-row selection:bg-cyan-500 selection:text-black transition-colors duration-300`}
    >
      {/* 1. LEFT / TOP PANEL (FORM) */}
      <div className="flex-1 p-4 md:p-8 flex flex-col">
        <div
          className={`flex items-center gap-3 mb-6 border-b pb-2 shrink-0 ${borderColor}`}
        >
          <Mail
            size={24}
            className={`shrink-0 ${isDark ? "text-cyan-600" : "text-slate-600"}`}
          />
          <h2
            className={`text-lg md:text-2xl font-black uppercase tracking-tight ${textPrimary}`}
          >
            Compose Message
          </h2>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 flex-1"
        >
          {/* FROM */}
          <div className="flex flex-col gap-1">
            <label
              className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${textMuted}`}
            >
              From:
            </label>
            <input
              name="name"
              required
              placeholder="YOUR NAME"
              className={`w-full border px-3 py-3 text-sm focus:outline-none focus:ring-1 rounded-sm ${inputBg} placeholder:${isDark ? "text-cyan-900" : "text-slate-400"}`}
            />
          </div>

          {/* REPLY-TO */}
          <div className="flex flex-col gap-1">
            <label
              className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${textMuted}`}
            >
              Reply-To:
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="YOUR.EMAIL@EXAMPLE.COM"
              className={`w-full border px-3 py-3 text-sm focus:outline-none focus:ring-1 rounded-sm ${inputBg} placeholder:${isDark ? "text-cyan-900" : "text-slate-400"}`}
            />
          </div>

          {/* PHONE (OPTIONAL) */}
          <div className="flex flex-col gap-1">
            <label
              className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${textMuted}`}
            >
              Phone (Optional):
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+1 234 567 890"
              className={`w-full border px-3 py-3 text-sm focus:outline-none focus:ring-1 rounded-sm ${inputBg} placeholder:${isDark ? "text-cyan-900" : "text-slate-400"}`}
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-1 flex-1 min-h-[120px]">
            <label
              className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${textMuted}`}
            >
              Message:
            </label>
            <textarea
              name="message"
              required
              placeholder="ENTER TRANSMISSION CONTENT..."
              className={`w-full h-full border px-3 py-3 text-sm focus:outline-none focus:ring-1 resize-none rounded-sm ${inputBg} placeholder:${isDark ? "text-cyan-900" : "text-slate-400"}`}
            />
          </div>

          {/* STATUS & BUTTON GROUP */}
          <div className="mt-2 flex flex-col gap-2 shrink-0">
            {status === "sent" && (
              <div
                className={`text-xs px-3 py-2 font-bold flex items-center gap-2 rounded-sm ${isDark ? "bg-cyan-900 text-cyan-300" : "bg-emerald-600 text-white"}`}
              >
                <Check size={14} /> SENT SUCCESSFULLY.
              </div>
            )}
            {status === "error" && (
              <div className="text-xs bg-red-600 text-white px-3 py-2 font-bold rounded-sm">
                ERROR: FAILED.
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className={`w-full py-3 md:py-4 font-bold uppercase border transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base rounded-sm ${buttonPrimary}`}
            >
              {sending ? (
                "SENDING..."
              ) : (
                <>
                  <Send size={16} /> SEND MESSAGE
                </>
              )}
            </button>

            <div
              className={`text-[10px] text-center uppercase tracking-wide ${textMuted}`}
            >
              Typically responds within 24 hours. Secure Transmission.
            </div>
          </div>
        </form>
      </div>

      {/* 2. RIGHT / BOTTOM PANEL (INFO) */}
      <div
        className={`md:w-80 w-full border-t md:border-t-0 md:border-l p-6 md:p-8 flex flex-col gap-6 md:h-full md:overflow-y-auto shrink-0 ${bgPanel} ${borderColor}`}
      >
        {/* EMAIL BOX */}
        <div>
          <h3
            className={`text-[10px] font-bold uppercase mb-2 inline-block px-2 py-0.5 rounded-sm ${isDark ? "bg-cyan-900 text-cyan-400" : "bg-slate-200 text-slate-700"}`}
          >
            Direct Line
          </h3>
          <div
            onClick={handleCopyEmail}
            className={`border p-3 md:p-4 cursor-pointer transition-colors relative rounded-sm shadow-sm group 
               ${
                 isDark
                   ? "bg-black border-cyan-900 hover:border-cyan-500 hover:bg-cyan-900/10"
                   : "bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400"
               }`}
          >
            <div
              className={`text-xs font-bold truncate pr-6 ${isDark ? "text-cyan-500 group-hover:text-cyan-300" : "text-slate-700 group-hover:text-slate-900"}`}
            >
              {email}
            </div>
            <div
              className={`absolute top-2 right-2 ${isDark ? "text-cyan-800 group-hover:text-cyan-500" : "text-slate-400 group-hover:text-slate-600"}`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </div>
          </div>
        </div>

        {/* WORK STATUS */}
        <div
          className={`font-mono text-[10px] uppercase flex items-center gap-2 border-b pb-2 mb-1 ${textMuted} ${isDark ? "border-cyan-900" : "border-slate-200"}`}
        >
          <span
            className={`${isDark ? "text-cyan-500" : "text-emerald-600"} font-bold flex items-center gap-1`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-emerald-500"}`}
            ></span>{" "}
            ONLINE:
          </span>
          <span>Freelance & Full-time</span>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex-1">
          <h3
            className={`text-[10px] font-bold uppercase mb-3 flex items-center gap-2 ${textMuted}`}
          >
            SOCIAL NETWORKS
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 p-3 border transition-all text-left group rounded-sm shadow-sm ${socialBtn}`}
              >
                <s.icon
                  size={18}
                  strokeWidth={2}
                  className={`shrink-0 transition-colors ${isDark ? "text-cyan-700 group-hover:text-cyan-400" : "text-slate-400 group-hover:text-slate-800"}`}
                />
                <span
                  className={`text-[10px] font-bold uppercase truncate ${isDark ? "text-cyan-600 group-hover:text-cyan-300" : "text-slate-600 group-hover:text-slate-900"}`}
                >
                  {s.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
