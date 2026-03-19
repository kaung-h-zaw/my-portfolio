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
  Radio,
} from "lucide-react";
import LinkConfirmationModal from "../os/LinkConfirmationModal";

export default function ContactApp() {
  const formRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [activeLinkData, setActiveLinkData] = useState(null);

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
        "service_ph76too",
        "template_7vf40oe",
        formRef.current,
        "XJIjjnPJ0vuApI2QB",
      );

      setSending(false);
      setStatus("sent");
      formRef.current.reset();
    } catch (err) {
      console.error("Error sending email:", err);
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
    <>
      <LinkConfirmationModal
        linkData={activeLinkData}
        onClose={() => setActiveLinkData(null)}
      />

      <div className="font-mono text-black min-h-full flex flex-col gap-5 xl:gap-6 p-3 lg:p-4 xl:p-6 overflow-y-auto overflow-x-hidden">
        {/* HEADER */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-black/5 rounded-md">
              <Mail size={16} strokeWidth={2} className="text-black/70" />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] lg:text-[11px] xl:text-xs uppercase tracking-widest text-black/60">
                › contact.msg
              </p>
              <h1 className="text-lg lg:text-xl xl:text-2xl font-black uppercase tracking-tight leading-none text-black/90 mt-1">
                Get In Touch
              </h1>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10" />

        {/* MAIN GRID */}
        <div className="flex flex-wrap gap-5 lg:gap-6 xl:gap-8 flex-1">
          {/* LEFT */}
          <div className="flex flex-col flex-[2_1_360px] xl:flex-[2_1_400px]">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 lg:gap-5"
            >
                <div className="flex flex-wrap gap-4 lg:gap-5">
                {/* Name */}
                <div className="flex flex-col gap-2 flex-[1_1_200px]">
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] lg:text-[11px] xl:text-xs font-bold uppercase tracking-widest text-black/60"
                  >
                    From: [Name]
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full border-2 border-black/10 bg-black/5 px-3 py-3 text-sm lg:text-[15px] xl:text-sm font-medium focus:outline-none focus:border-black/40 focus:bg-white rounded-lg placeholder:text-black/30 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 flex-[1_1_200px]">
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] lg:text-[11px] xl:text-xs font-bold uppercase tracking-widest text-black/60"
                  >
                    Reply-To: [Email]
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full border-2 border-black/10 bg-black/5 px-3 py-3 text-sm lg:text-[15px] xl:text-sm font-medium focus:outline-none focus:border-black/40 focus:bg-white rounded-lg placeholder:text-black/30 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-phone"
                  className="text-[10px] lg:text-[11px] xl:text-xs font-bold uppercase tracking-widest text-black/60"
                >
                  Phone: [Optional]
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="+66 123 456 789"
                  className="w-full border-2 border-black/10 bg-black/5 px-3 py-3 text-sm lg:text-[15px] xl:text-sm font-medium focus:outline-none focus:border-black/40 focus:bg-white rounded-lg placeholder:text-black/30 transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] lg:text-[11px] xl:text-xs font-bold uppercase tracking-widest text-black/60"
                >
                  Message Body:
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your message..."
                  className="w-full border-2 border-black/10 bg-black/5 px-3 py-3 text-sm lg:text-[15px] xl:text-sm font-medium focus:outline-none focus:border-black/40 focus:bg-white resize-none rounded-lg placeholder:text-black/30 min-h-[120px] transition-all"
                />
              </div>

              {/* Status Messages */}
              {status === "sent" && (
                <div className="text-xs lg:text-[13px] xl:text-sm px-4 py-3 font-bold flex items-center gap-2 bg-green-500 text-white rounded-lg border border-green-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                  <Check size={16} strokeWidth={2.5} /> Message sent
                  successfully!
                </div>
              )}
              {status === "error" && (
                <div className="text-xs lg:text-[13px] xl:text-sm px-4 py-3 font-bold flex items-center gap-2 bg-red-500 text-white rounded-lg border border-red-600 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                  Failed to send message. Please try again.
                </div>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 font-black uppercase text-xs lg:text-[13px] xl:text-sm tracking-widest flex items-center justify-center gap-2 bg-black text-white rounded-lg hover:bg-black/80 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 mt-2"
              >
                {sending ? (
                  <>
                    <Radio
                      size={16}
                      strokeWidth={2.5}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} strokeWidth={2.5} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6 lg:gap-7 xl:gap-8 flex-[1_1_230px] xl:flex-[1_1_250px]">
            {/* Work Status */}
            <div>
              <Label>Status</Label>
              <div className="flex items-center gap-3 p-3 lg:p-3.5 bg-black/5 rounded-lg border border-black/10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-green-700"></span>
                </span>
                <span className="text-xs lg:text-[13px] xl:text-sm font-bold uppercase tracking-wider text-black/90">
                  Open to junior roles
                </span>
              </div>
            </div>

            {/* Email */}
            <div>
              <Label>Direct Email</Label>
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-3 lg:p-3.5 bg-black/5 rounded-lg border border-black/10 hover:border-black/30 hover:bg-black/10 transition-all group"
              >
                <span className="text-xs lg:text-[13px] xl:text-sm font-bold text-black/80 truncate">
                  {email}
                </span>
                <div className="p-1.5 bg-black/5 group-hover:bg-white rounded transition-colors shrink-0">
                  {copied ? (
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="text-green-600"
                    />
                  ) : (
                    <Copy
                      size={14}
                      strokeWidth={2}
                      className="text-black/60 group-hover:text-black/90 transition-colors"
                    />
                  )}
                </div>
              </button>
            </div>

            {/* Social Networks */}
            <div>
              <Label>Socials</Label>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((social) => (
                  <button
                    key={social.name}
                    type="button"
                    onClick={() =>
                      setActiveLinkData({
                        title: social.name,
                        href: social.href,
                        icon: social.icon,
                      })
                    }
                    className="flex flex-[1_1_120px] items-center gap-3 p-3 bg-black/5 rounded-lg border border-black/10 hover:border-black/30 hover:bg-black/10 transition-all group min-w-0"
                  >
                    <div className="p-1.5 bg-black/5 group-hover:bg-white rounded transition-colors shrink-0">
                      <social.icon
                        size={14}
                        strokeWidth={2}
                        className="text-black/60 group-hover:text-black/90 transition-colors"
                      />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase text-black/80 truncate tracking-wider">
                      {social.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-black/10 pt-4 mt-auto text-[10px] md:text-xs uppercase tracking-widest text-black/40 flex justify-between items-center">
          <span>contact.msg</span>
          <span>EOF</span>
        </div>
      </div>
    </>
  );
}

function Label({ children }) {
  return (
    <p className="text-xs md:text-sm uppercase tracking-widest text-black/50 mb-3 md:mb-4 border-b border-black/10 pb-2 font-medium">
      {children}
    </p>
  );
}
