import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen w-full flex flex-col">
      <SiteHeader />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  ),
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-3xl font-bold font-serif text-slate-800">Không tìm thấy trang</h1>
      <p className="mt-2 text-sm text-slate-600">Đường dẫn không thuộc chương trình 20/10.</p>
      <Link
        to="/"
        className="mt-4 inline-block px-5 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm transition-colors shadow-md"
      >
        Về trang chủ
      </Link>
    </main>
  );
}
