import type { ProcessAsset } from "@/data/portfolio";

export function ProcessGallery({ assets }: { assets: ProcessAsset[] }) {
  if (assets.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-fg-muted">
        Process gallery
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <li
            key={`${asset.src}-${asset.caption ?? asset.alt}`}
            className="overflow-hidden rounded-xl border border-border bg-bg-elevated"
          >
            <div className="aspect-[4/3] bg-bg-subtle">
              <img
                src={asset.src}
                alt={asset.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              {asset.kind ? (
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-fg-muted">
                  {asset.kind.replace("-", " ")}
                </p>
              ) : null}
              {asset.caption ? (
                <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
                  {asset.caption}
                </p>
              ) : (
                <p className="mt-1 text-sm text-fg-secondary">{asset.alt}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
