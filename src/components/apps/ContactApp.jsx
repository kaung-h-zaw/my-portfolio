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
  Briefcase, // Import Briefcase icon for job status
} from "lucide-react";

export default function ContactApp() {
  const formRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

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
    <div className="h-full w-full bg-white font-mono overflow-y-auto custom-scrollbar flex flex-col md:flex-row text-black">
      {/* 1. LEFT / TOP PANEL (FORM) */}
      <div className="flex-1 p-4 md:p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-2 shrink-0">
          <Mail size={24} className="shrink-0" />
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight">
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
            <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
              From:
            </label>
            <input
              name="name"
              required
              placeholder="YOUR NAME"
              className="w-full border-2 border-black px-3 py-3 text-sm focus:outline-none focus:bg-gray-100 placeholder:text-gray-400"
            />
          </div>

          {/* REPLY-TO */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
              Reply-To:
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="YOUR.EMAIL@EXAMPLE.COM"
              className="w-full border-2 border-black px-3 py-3 text-sm focus:outline-none focus:bg-gray-100 placeholder:text-gray-400"
            />
          </div>

          {/* PHONE (OPTIONAL) */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
              Phone (Optional):
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+1 234 567 890"
              className="w-full border-2 border-black px-3 py-3 text-sm focus:outline-none focus:bg-gray-100 placeholder:text-gray-400"
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-1 flex-1 min-h-[120px]">
            <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider">
              Message:
            </label>
            <textarea
              name="message"
              required
              placeholder="ENTER TRANSMISSION CONTENT..."
              className="w-full h-full border-2 border-black px-3 py-3 text-sm focus:outline-none focus:bg-gray-100 placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* STATUS & BUTTON GROUP */}
          <div className="mt-2 flex flex-col gap-2 shrink-0">
            {status === "sent" && (
              <div className="text-xs bg-black text-white px-3 py-2 font-bold flex items-center gap-2">
                <Check size={14} /> SENT SUCCESSFULLY.
              </div>
            )}
            {status === "error" && (
              <div className="text-xs bg-red-600 text-white px-3 py-2 font-bold">
                ERROR: FAILED.
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-black text-white py-3 md:py-4 font-bold uppercase border-2 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_black] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_black] disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              {sending ? (
                "SENDING..."
              ) : (
                <>
                  <Send size={16} /> SEND MESSAGE
                </>
              )}
            </button>

            <div className="text-[10px] text-gray-500 text-center uppercase tracking-wide">
              Typically responds within 24 hours. Secure Transmission.
            </div>
          </div>
        </form>
      </div>

      {/* 2. RIGHT / BOTTOM PANEL (INFO) */}
      <div className="md:w-80 w-full border-t-2 md:border-t-0 md:border-l-2 border-black bg-gray-50 p-6 md:p-8 flex flex-col gap-6 md:h-full md:overflow-y-auto shrink-0">
        {/* EMAIL BOX */}
        <div>
          <h3 className="text-[10px] font-bold uppercase mb-2 bg-black text-white inline-block px-1">
            Direct Line
          </h3>
          <div
            onClick={handleCopyEmail}
            className="border-2 border-black bg-white p-3 md:p-4 cursor-pointer active:bg-black active:text-white transition-colors relative"
          >
            <div className="text-xs font-bold truncate pr-6">{email}</div>
            <div className="absolute top-2 right-2">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </div>
          </div>
        </div>

        {/* WORK STATUS */}
        <div className="font-mono text-[10px] uppercase text-gray-500 flex items-center gap-2 border-b border-black/10 pb-2 mb-1">
          <span className="text-green-600 font-bold">● ONLINE:</span>
          <span>Freelance & Full-time</span>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex-1">
          <h3 className="text-[10px] font-bold uppercase mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-black"></div> SOCIAL NETWORKS
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors text-left group"
              >
                <s.icon
                  size={20}
                  strokeWidth={2}
                  className="shrink-0 group-hover:scale-110 transition-transform"
                />
                <span className="text-[10px] font-bold uppercase truncate">
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
