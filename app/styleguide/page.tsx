import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ui } from "@/content/site";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { TextMask } from "@/components/motion/text-mask";
import { ProjectCard } from "@/components/sections/project-card";
import { Button, ButtonArrow, ButtonLink } from "@/components/ui/button";
import { Card, CardLabel } from "@/components/ui/card";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Field } from "@/components/ui/field";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { Pill, StatusDot } from "@/components/ui/pill";
import { TextLink } from "@/components/ui/text-link";
import { Replay } from "./_components/replay";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Design tokens, components and motion primitives for this site.",
  robots: { index: false, follow: false },
};

const colors = [
  { token: "--background", use: "Page canvas" },
  { token: "--surface", use: "Cards, popovers" },
  { token: "--surface-raised", use: "Media wells, image frames" },
  { token: "--foreground", use: "Primary text, primary button" },
  { token: "--muted", use: "Secondary text (≥ 7:1)" },
  { token: "--border", use: "Decorative hairlines" },
  { token: "--border-strong", use: "Form controls (≥ 3:1)" },
  { token: "--accent", use: "Focus ring, dots, fills" },
  { token: "--accent-text", use: "Links, small accent text (≥ 6:1)" },
  { token: "--accent-soft", use: "Hover and active tints" },
] as const;

const typeScale = [
  { name: "display", className: "text-display font-semibold", sample: "Calm interfaces", spec: "clamp(3rem, 8vw, 7.5rem) · 0.92 · −0.045em" },
  { name: "h2", className: "text-h2 font-semibold", sample: "Where I've worked.", spec: "clamp(2rem, 4vw, 3.5rem) · 1.04 · −0.035em" },
  { name: "statement", className: "text-statement font-medium", sample: "I build frontends for products that carry a lot of data.", spec: "clamp(1.375rem, 2.4vw, 2rem) · 1.38" },
  { name: "h3", className: "text-h3 font-semibold", sample: "Frontend Developer", spec: "1.375rem · 1.3 · −0.02em" },
  { name: "lead", className: "text-lead text-muted", sample: "Fast, accessible React and TypeScript interfaces.", spec: "clamp(1.125rem, 1.4vw, 1.3125rem) · 1.55" },
  { name: "body", className: "text-body", sample: "Predictable server state, components that work with a keyboard.", spec: "1.0625rem · 1.6" },
  { name: "small", className: "text-small text-muted", sample: "Supporting copy and metadata.", spec: "0.9375rem · 1.55" },
  { name: "label", className: "label", sample: "Selected work", spec: "Geist Mono · 0.75rem · +0.06em · uppercase" },
] as const;

const spacing = [8, 16, 24, 32, 48, 64, 96, 128];

const motion = [
  { token: "--duration-micro", value: "150ms", use: "Hover, press, colour" },
  { token: "--duration-ui", value: "300ms", use: "Toggles, menus, indicators" },
  { token: "--duration-reveal", value: "700ms", use: "Section entrances" },
  { token: "--duration-page", value: "900ms", use: "Headline masks, page transitions" },
  { token: "--stagger", value: "50ms", use: "Between sibling reveals" },
] as const;

const easings = [
  { name: "ease-out-expo", className: "ease-out-expo", use: "Entrances" },
  { name: "ease-in-out-quart", className: "ease-in-out-quart", use: "State transitions, curtain, theme reveal" },
  { name: "ease-spring", className: "ease-spring", use: "Magnetic return (damped, no overshoot)" },
] as const;

const sampleProject = {
  slug: "sample",
  title: "Sample project",
  year: "Styleguide only",
  problem: "One sentence describing the problem the project solved.",
  contribution: "One sentence describing exactly what I did.",
  stack: ["React", "TypeScript", "TanStack Query"],
  outcome: { label: "Outcome", value: null },
};

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-6">
        <h2 id={`${id}-title`} className="label md:col-span-3">
          {title}
        </h2>
        <div className="grid min-w-0 gap-10 md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div data-theme={theme} className="rounded-card border border-border bg-background p-6 text-foreground">
      <p className="label">{theme}</p>
      <p className="mt-4 text-h3 font-semibold">Calm interfaces</p>
      <p className="mt-2 text-small text-muted">Secondary text sits at ≥ 7:1 in both themes.</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <TextLink href="/styleguide#themes" className="text-small">
          Link
        </TextLink>
      </div>
      <div className="mt-6 grid grid-cols-5 gap-2" aria-hidden="true">
        {["--background", "--surface", "--muted", "--accent", "--accent-text"].map((token) => (
          <span key={token} className="h-8 rounded-md border border-border" style={{ background: `var(${token})` }} />
        ))}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="container-page pt-[calc(var(--header-height)+80px)] pb-24">
      <header className="pb-16 md:pb-24">
        <p className="label">Design system</p>
        <h1 className="mt-6 text-h2 font-semibold">Engineered calm.</h1>
        <p className="mt-6 max-w-[56ch] text-lead text-muted">
          The tokens, components and motion primitives the site is built from. Everything here is the production code,
          rendered with the live tokens in <code className="font-mono text-small">app/globals.css</code>.
        </p>
      </header>

      <Section id="themes" title="Themes">
        <p className="max-w-[60ch] text-muted">
          Both themes are authored together with <code className="font-mono text-small">light-dark()</code>. The toggle in
          the header switches the page; the panels below force each theme so they can be compared side by side.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <ThemePanel theme="light" />
          <ThemePanel theme="dark" />
        </div>
      </Section>

      <Section id="color" title="Colour">
        <ul className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
          {colors.map((color) => (
            <li key={color.token} className="flex items-center gap-4 bg-surface p-4">
              <span
                className="size-10 shrink-0 rounded-lg border border-border"
                style={{ background: `var(${color.token})` }}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <code className="block font-mono text-small">{color.token}</code>
                <span className="block text-small text-muted">{color.use}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" title="Typography">
        <ul className="grid gap-10">
          {typeScale.map((step) => (
            <li key={step.name} className="grid gap-3">
              <p className="label normal-case tracking-normal">
                {step.name} · {step.spec}
              </p>
              <p className={step.className}>{step.sample}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="layout" title="Spacing & layout">
        <ul className="grid gap-3">
          {spacing.map((size) => (
            <li key={size} className="flex items-center gap-4">
              <code className="w-12 font-mono text-small text-muted">{size}</code>
              <span className="h-3 rounded-full bg-accent" style={{ width: size }} aria-hidden="true" />
            </li>
          ))}
        </ul>
        <div>
          <p className="text-small text-muted">12 columns · 1200px max · 24px gutters (16px mobile)</p>
          <div className="mt-4 grid grid-cols-12 gap-x-4 md:gap-x-6" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} className="h-16 rounded-md bg-accent-soft" />
            ))}
          </div>
        </div>
      </Section>

      <Section id="actions" title="Buttons & links">
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/styleguide#actions">
            Primary
            <ButtonArrow>
              <ArrowRightIcon size={16} />
            </ButtonArrow>
          </ButtonLink>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
        <p className="max-w-[60ch]">
          Inline links use the accent with a permanent underline, like{" "}
          <TextLink href="/styleguide#actions">this one</TextLink>, so they are never identified by colour alone.
        </p>
        <div className="flex flex-wrap items-start gap-6">
          <CopyEmailButton email="hello@example.com" labels={{ copy: ui.copyEmail, copied: ui.copied, failed: ui.copyFailed }} />
          <Magnetic>
            <ButtonLink href="/styleguide#motion" variant="secondary">
              Magnetic (desktop pointer)
              <ArrowUpRightIcon size={16} />
            </ButtonLink>
          </Magnetic>
        </div>
      </Section>

      <Section id="forms" title="Inputs & focus">
        <p className="max-w-[60ch] text-muted">
          Press Tab to see the focus ring: a 2px accent outline, offset 3px, on every interactive element.
        </p>
        <form className="grid max-w-md gap-6" action="/styleguide#forms">
          <Field label="Name" name="name" autoComplete="name" placeholder="Ada Lovelace" />
          <Field label="Email" name="email" type="email" autoComplete="email" hint="I'll only use this to reply." />
          <Field label="Company" name="company" defaultValue="" error="This is how an error message reads." />
        </form>
      </Section>

      <Section id="surfaces" title="Cards & status">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardLabel>Card</CardLabel>
            <p className="mt-4 text-muted">Surface, 1px hairline, 16px radius. No shadow by default.</p>
          </Card>
          <Card className="shadow-soft">
            <CardLabel>Card · shadow-soft</CardLabel>
            <p className="mt-4 text-muted">The only shadow in the system, for floating layers.</p>
          </Card>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Pill>
            <StatusDot />
            Status with a live dot
          </Pill>
          <Pill>
            <LocalTime timeZone="Asia/Kolkata" suffix="IST" />
          </Pill>
        </div>
        <ProjectCard project={sampleProject} href="/styleguide#surfaces" labels={ui} />
      </Section>

      <Section id="motion" title="Motion">
        <ul className="grid gap-px overflow-hidden rounded-card border border-border bg-border">
          {motion.map((item) => (
            <li key={item.token} className="grid gap-1 bg-surface p-4 sm:grid-cols-3 sm:gap-4">
              <code className="font-mono text-small">{item.token}</code>
              <span className="text-small">{item.value}</span>
              <span className="text-small text-muted">{item.use}</span>
            </li>
          ))}
        </ul>

        <div className="grid gap-4">
          <p className="text-small text-muted">Hover a track to play its easing over 700ms.</p>
          {easings.map((easing) => (
            <div key={easing.name} className="group rounded-card border border-border bg-surface p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <code className="font-mono text-small">{easing.name}</code>
                <span className="text-small text-muted">{easing.use}</span>
              </div>
              <div className="relative mt-4 h-3 rounded-full bg-accent-soft" aria-hidden="true">
                <span
                  className={`absolute top-0 left-0 size-3 rounded-full bg-accent transition-[left] duration-700 group-hover:left-[calc(100%-0.75rem)] motion-reduce:transition-none ${easing.className}`}
                />
              </div>
            </div>
          ))}
        </div>

        <Card>
          <CardLabel>TextMask</CardLabel>
          <div className="mt-6">
            <Replay>
              <TextMask as="p" lines={["Lines rise out", "of their masks."]} className="text-h2 font-semibold" />
            </Replay>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {["Reveal", "fades up", "on scroll"].map((word, index) => (
            <Reveal key={word} delay={index}>
              <Card>
                <CardLabel>Reveal · delay {index}</CardLabel>
                <p className="mt-4 text-h3 font-semibold">{word}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Card>
          <CardLabel>Reduced motion</CardLabel>
          <ul className="mt-6 grid gap-3 text-muted">
            <li>Intro curtain and headline masks are skipped; text is simply present.</li>
            <li>Reveals become a 200ms opacity fade with no movement or blur.</li>
            <li>Hero mesh stops drifting and ignores the pointer; magnetic buttons stay still.</li>
            <li>Smooth anchor scrolling, header hide-on-scroll and the circular theme reveal are off.</li>
            <li>The bio scroll highlight is replaced by plain, full-contrast text.</li>
          </ul>
        </Card>
      </Section>
    </div>
  );
}
