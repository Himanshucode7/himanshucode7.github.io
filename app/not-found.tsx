import type { Metadata } from "next";
import { ui } from "@/content/site";
import { ButtonArrow, ButtonLink } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-end pt-[calc(var(--header-height)+64px)] pb-24">
      <p className="label">404</p>
      <h1 className="mt-6 max-w-[16ch] text-h2 font-semibold">{ui.notFoundTitle}</h1>
      <p className="mt-6 max-w-[48ch] text-lead text-muted">{ui.notFoundBody}</p>
      <div className="mt-10">
        <ButtonLink href="/">
          {ui.backHome}
          <ButtonArrow>
            <ArrowRightIcon size={16} />
          </ButtonArrow>
        </ButtonLink>
      </div>
    </section>
  );
}
