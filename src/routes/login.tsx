import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          ← Back to portfolio
        </Link>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-fg">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-fg-secondary">
          Continue with a connected account.
        </p>
        <div className="mt-8 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full justify-center rounded-md"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-fg-muted">Sign-in is disabled.</p>
          )}
        </div>
      </div>
    </main>
  );
}
