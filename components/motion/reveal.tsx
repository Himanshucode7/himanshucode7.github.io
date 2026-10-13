import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  /** Stagger position; multiplied by the --stagger token. */
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Fades content up into place the first time it scrolls into view.
 *
 * A server component: it only adds `data-reveal`. One observer in
 * <DocumentEffects> flips `data-revealed`, and CSS does the animation. Content is
 * only hidden once that observer is running, so it stays visible without JS.
 * Reduced motion: a plain 200ms fade.
 */
export function Reveal({ as: Tag = "div", delay = 0, className, children }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `calc(var(--stagger) * ${delay})` } as CSSProperties) : undefined;
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
