import { ContactIcon } from "../os/AppIcons";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Copy, Check, Github, Linkedin, Instagram, Facebook, MessageCircle, Send, LoaderCircle, ArrowUpRight } from "lucide-react";
import LinkConfirmationModal from "../os/LinkConfirmationModal";
import { AppHeader, AppFooter, PanelTitle } from "./AppLayout";

export default function ContactApp() {
  const formRef = useRef(null);
  const copyTimer = useRef(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [activeLinkData, setActiveLinkData] = useState(null);
  const email = "kaunghtetzaw.inbox@gmail.com";
  useEffect(() => () => clearTimeout(copyTimer.current), []);

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
    if (sending || !formRef.current) return;
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <>
      <LinkConfirmationModal linkData={activeLinkData} onClose={() => setActiveLinkData(null)} />
      <div className="app-page">
        <AppHeader icon={ContactIcon} file="contact.msg" title="Get In Touch" badge="Open to opportunities" />
        <p className="app-body max-w-2xl">For frontend or full-stack opportunities, or a conversation about my projects, send a message below.</p>
        <div className="app-split">
          <section className="app-panel">
            <PanelTitle icon={Send}>Send a message</PanelTitle>
            <p className="font-sans text-sm text-zinc-300 mb-5">Required fields are marked *.</p>
            <form ref={formRef} onSubmit={handleSubmit} aria-busy={sending} className="space-y-4">
              <div className="app-form-grid grid gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wide mb-2">Name *</label>
                  <input id="contact-name" name="name" autoComplete="name" required placeholder="Your name" className="app-field" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wide mb-2">Email *</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="Your email address" className="app-field" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wide mb-2">Phone (optional)</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Include your country code" className="app-field" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wide mb-2">Message *</label>
                <textarea id="contact-message" name="message" required rows={4} placeholder="Tell me about the opportunity or your question" className="app-field resize-y min-h-[112px]" />
              </div>
              {status === "sent" && <p role="status" className="app-tile flex items-center gap-2 font-sans text-sm"><Check size={17} aria-hidden="true" /> Message sent successfully!</p>}
              {status === "error" && <p role="alert" className="app-tile font-sans text-sm leading-relaxed">Message could not be sent. Please try again or <a className="underline" href={`mailto:${email}`}>email me directly</a>.</p>}
              <button type="submit" disabled={sending} className="app-action">
                {sending ? <LoaderCircle size={17} className="animate-spin" aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </section>
          <div className="space-y-4 sm:space-y-5">
            <section className="app-panel">
              <PanelTitle icon={Mail}>Direct email</PanelTitle>
              <a href={`mailto:${email}`} className="block w-fit font-sans text-sm break-all underline underline-offset-4">{email}</a>
              <button type="button" onClick={handleCopyEmail} aria-label={copied ? "Email copied" : "Copy email address"} className="app-action-secondary mt-4">
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copied ? "Copied" : "Copy email"}
              </button>
              <p role="status" className="font-sans text-sm text-zinc-300 mt-2">{copyError ? "Copy unavailable. You can use the email link above." : copied ? "Email address copied." : ""}</p>
            </section>
            <section className="app-panel">
              <PanelTitle icon={MessageCircle}>Elsewhere</PanelTitle>
              <div className="app-social-grid grid gap-2">
                {socials.map((social) => (
                  <button key={social.name} type="button" onClick={(event) => setActiveLinkData({ title: social.name, href: social.href, icon: social.icon, returnFocus: event.currentTarget })}
                    className="app-tile flex min-h-11 items-center gap-3 text-left text-sm hover:bg-white/10 transition-colors">
                    <social.icon size={17} className="shrink-0" aria-hidden="true" /><span className="flex-1">{social.name}</span><ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
        <AppFooter file="contact.msg">Let’s connect</AppFooter>
      </div>
    </>
  );
}
