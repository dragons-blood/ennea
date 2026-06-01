import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const CSP =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; " +
  "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"

// Inject the CSP <meta> only in production builds — the dev server needs Vite's inline refresh script.
const cspPlugin: Plugin = {
  name: 'inject-csp',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace('</title>', `</title>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`)
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serves a project site under /<repo>/ — the deploy workflow sets VITE_BASE.
  // Defaults to '/' so local dev and `vite preview` work at the root.
  base: process.env.VITE_BASE || '/',
  plugins: [react(), cspPlugin],
  server: { host: true, port: 5174 },
})
