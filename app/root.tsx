import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import appStylesHref from "./app.css?url";
import { createEmptyContact, getContacts } from "./data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router + Drogon App" },
    { name: "description", content: "欢迎来到React Router + Drogon App!" },
  ];
}
export function HydrateFallback() {
  return (
    <div id="loading-splash">
      <div id="loading-splash-spinner" />
      <p>正在加载，请稍等...</p>
    </div>
  );
}
export function ErrorFallback() {
  return (
    <div id="error-page">
      <h1>糟糕！</h1>
      <p>发生意外错误。</p>
    </div>
  );
}

export async function loader({ request }: Route.ClientLoaderArgs) {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { contacts } = loaderData;
  return <Outlet />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={appStylesHref} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "哎呀！";
  let details = "发生意外错误.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "错误";
    details =
      error.status === 404 ? "找不到请求的页面。" : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto text-center">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
