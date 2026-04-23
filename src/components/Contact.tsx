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
import { SITE } from "@/data/content";

export default function Contact() {
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
      className="px-6 md:px-12 py-20 md:py-32 bg-foreground text-background relative overflow-hidden"
    >
      {/* Big background type */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
        <div className="font-display font-black text-[30vw] leading-none text-primary tracking-tighter">
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
            Contato
          </div>
          <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.9] tracking-tighter mb-8">
            Vamos criar algo{" "}
            <span className="font-serif-accent italic text-primary">
              memorável
            </span>
            ?
          </h2>
          <p className="text-background/60 text-lg leading-relaxed mb-10 max-w-md">
            Conta um pouco sobre sua marca e o que você quer alcançar. Respondo
            em até 48h.
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
            <Field name="name" label="Nome" placeholder="Seu nome" required />
            <Field
              name="email"
              type="email"
              label="E-mail"
              placeholder="voce@marca.com"
              required
            />
          </div>
          <Field name="brand" label="Marca / Empresa" placeholder="Nome da marca" />
          <Field
            name="budget"
            label="Orçamento estimado"
            placeholder="Ex: R$ 5.000 – R$ 15.000"
          />
          <div>
            <label className="block text-xs uppercase tracking-wider text-background/60 mb-2">
              Conta sobre o projeto
            </label>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Categoria, formato, prazo, objetivo da campanha..."
              className="w-full bg-background/5 border border-background/10 rounded-2xl px-4 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-primary focus:bg-background/10 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || sent}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-light rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {sent ? "Enviado! Respondo em breve." : loading ? "Enviando..." : "Enviar mensagem"}
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
