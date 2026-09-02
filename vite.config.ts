// @lovable.dev/vite-tanstack-config already includes the following. Do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Route TanStack Start's server entry through src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  vite: {
    server: {
      // Lets the preview be reached through a tunnel or sandbox address.
      // Dev server only. The built site is a worker and ignores this.
      allowedHosts: true,
    },
  },
});
