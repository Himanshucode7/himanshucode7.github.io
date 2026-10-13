import type { CSSProperties, ElementType } from "react";

type TextMaskProps = {
  as?: ElementType;
  /** Authored line breaks. Each line rises out of its own mask. */
  lines: readonly string[];
  className?: string;
  /** Offset in lines, to continue a stagger started elsewhere. */
  startAt?: number;
};

/**
 * Line-by-line masked reveal, pure CSS (see `.mask-line` in globals.css).
 * Lines are authored rather than measured, so there is no layout read, no JS and
 * no hydration risk. The full text stays in the accessibility tree as one string.
 * Reduced motion: lines are simply present.
 */
export function TextMask({ as: Tag = "p", lines, className, startAt = 0 }: TextMaskProps) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={line} className="mask-line" style={{ "--line": startAt + index } as CSSProperties}>
          <span>
            {line}
            {index < lines.length - 1 ? " " : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}
