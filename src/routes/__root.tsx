import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/layout/SiteHeader";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bloom With Us · GDGoC-HUST 20/10" },
      { name: "theme-color", content: "#f6f0e6" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: () => (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteHeader />
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-4xl">Không thấy trang này</h1>
      <p className="mt-2 text-muted">Đường dẫn không thuộc vòng chơi 20/10.</p>
      <Link to="/" className="mt-4 inline-block text-plum">
        Về trang chủ
      </Link>
    </main>
  );
}
