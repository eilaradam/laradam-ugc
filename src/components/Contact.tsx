"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
import { SITE } from "@/data/content";
import { useT } from "@/lib/i18n";

export default function Contact() {
  const t = useT();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contato"
      className="px-6 md:px-12 py-6 md:py-10 bg-foreground text-background relative overflow-hidden"
    >
      {/* Big background type */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
        <div className="font-display font-black text-[24vw] leading-none text-primary tracking-tighter">
          HELLO
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            {t.contact.tag}
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.9] tracking-tighter mb-8">
            {t.contact.title1}{" "}
            <span className="font-serif-accent italic text-primary">
              {t.contact.titleAccent}
            </span>
            {t.contact.titleEnd}
          </h2>
          <p className="text-background/60 text-lg leading-relaxed mb-10 max-w-md">
            {t.contact.body}
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-background/80 group-hover:text-background transition-colors">
                {SITE.email}
              </span>
            </a>
            <a
              href={`https://instagram.com/${SITE.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <span className="text-background/80 group-hover:text-background transition-colors">
                {SITE.instagram}
              </span>
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <span className="text-background/80 group-hover:text-background transition-colors">
                {SITE.whatsappLabel}
              </span>
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-7 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field name="name" label={t.contact.name} placeholder={t.contact.namePh} required />
            <Field
              name="email"
              type="email"
              label={t.contact.email}
              placeholder={t.contact.emailPh}
              required
            />
          </div>
          <Field name="brand" label={t.contact.brand} placeholder={t.contact.brandPh} />
          <Field
            name="budget"
            label={t.contact.budget}
            placeholder={t.contact.budgetPh}
          />
          <div>
            <label className="block text-xs uppercase tracking-wider text-background/60 mb-2">
              {t.contact.message}
            </label>
            <textarea
              name="message"
              rows={5}
              required
              placeholder={t.contact.messagePh}
              className="w-full bg-background/5 border border-background/10 rounded-2xl px-4 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-primary focus:bg-background/10 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || sent}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-light rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {sent ? t.contact.sent : loading ? t.contact.sending : t.contact.send}
            {!sent && !loading && <ArrowUpRight className="w-4 h-4" />}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-background/60 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-background/5 border border-background/10 rounded-2xl px-4 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-primary focus:bg-background/10 transition-colors"
      />
    </div>
  );
}
