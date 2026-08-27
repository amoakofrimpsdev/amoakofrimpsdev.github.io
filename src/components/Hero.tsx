"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/content";
import RoleCycler from "./RoleCycler";
import { ArrowUpRight, Github, Linkedin, Mail, Pin } from "./Icons";

const NAME_LINES = ["Daniel", "Amoako Frimpong"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax: content drifts up and fades as the hero leaves.
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* backdrop: grid plus one soft light, kept almost colourless */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg mask-fade-y absolute inset-0 opacity-50" />
        <div className="animate-float-slow absolute -top-40 left-1/4 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(250,250,249,0.05),transparent_66%)] blur-3xl" />
        <div
          className="animate-float-slow absolute -right-32 top-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(204,255,77,0.07),transparent_66%)] blur-3xl"
          style={{ animationDelay: "-7s" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            Open to software engineering roles
          </span>
        </motion.div>

        <h1 className="mt-7 text-[clamp(2.9rem,9.5vw,7.5rem)] leading-[0.9] font-semibold">
          {NAME_LINES.map((line, li) => (
            <span key={line} className="-mb-[0.24em] block overflow-hidden pb-[0.24em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.12 + li * 0.11,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-lg"
        >
          <RoleCycler roles={site.roles} />
          <span className="hidden h-4 w-px bg-line-2 sm:block" />
          <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted uppercase">
            <Pin /> {site.location}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-paper-dim"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/work/"
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            See my work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 font-display text-sm text-paper transition-colors duration-300 hover:border-lime hover:text-lime"
          >
            Email me
          </a>

          <div className="ml-1 flex items-center gap-2">
            {[
              { href: site.github, label: "GitHub", Icon: Github },
              { href: site.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-lime hover:text-lime"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-11 w-6 items-start justify-center rounded-full border border-line-2 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            className="block h-1.5 w-1.5 rounded-full bg-lime"
          />
        </div>
      </motion.div>
    </section>
  );
}
