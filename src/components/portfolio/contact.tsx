import { useState, type FormEvent } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { SITE } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WritingLink } from "@/components/portfolio/writing-link";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="section-pad scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-[72rem] gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-fg-muted">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-fg">
            Say hello.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
            Open to conversations about teaching, study, creative work, and
            technical projects. Live notes are in Writing; longer pieces are
            𝕏 Articles.

          </p>

          <div className="mt-8 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
                Email
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 inline-flex text-[15px] font-medium text-accent transition-opacity hover:opacity-80"
              >
                {SITE.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
                Writing
              </p>
              <WritingLink className="mt-1 text-[15px] text-fg" />
              <p className="mt-1 text-sm text-fg-muted">
                Articles on 𝕏, plus the live feed in{" "}
                <a href="/#writing" className="text-fg hover:opacity-70">
                  Writing
                </a>
                .
              </p>

            </div>
          </div>
        </div>

        <div className="reveal lg:col-span-7" style={{ transitionDelay: "80ms" }}>
          <form
            onSubmit={onSubmit}
            className="rounded-lg border border-border bg-bg-elevated p-6 md:p-8"
            noValidate
          >
            {status === "sent" ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
                  <Check className="size-6" strokeWidth={2.5} />
                </span>
                <h3 className="text-xl font-semibold text-fg">Message sent</h3>
                <p className="max-w-sm text-sm text-fg-secondary">
                  Thanks for writing. I'll get back to you when I can.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-4"
                  onClick={() => setStatus("idle")}
                >
                  Send another
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "sending"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "sending"}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="A note about work, study, or collaboration…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "sending"}
                  />
                </div>

                {error && (
                  <p className="text-sm text-danger" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-fg-subtle">
                    No spam. Details stay private.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className={cn("min-w-[10rem]")}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send message
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
