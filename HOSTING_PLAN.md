# 🚀 Migration & Hosting Plan (Remaining Tasks)

## ⏳ Pending Tasks (To do)

### 1. Add Custom Domains to Render & Configure DNS
- [ ] In Render Dashboard -> **Settings -> Custom Domains**, add all 5 domain names (e.g., `srilankaviajeseden.es`, etc.).
- [ ] Log in to your domain provider (e.g., Hostinger, Namecheap).
- [ ] Add the `A record` and `CNAME record` provided by Render to the DNS settings of all 5 domains.

### 2. Configure Domain-Based Language Routing (React Code)
- [ ] Update `App.jsx` (and potentially `src/i18n.js`) to detect the incoming domain URL (`window.location.hostname`).
- [ ] Add logic to automatically route `.es` to Spanish, `.fr` to French, etc., so each domain opens the correct language version instantly.

### 3. SEO Migration (Critical to preserve Google Rankings)
- [ ] **301 Redirects:** Map and set up redirects from old WordPress URLs (e.g., `site.es/sobre-nosotros`) to the new React URLs (e.g., `site.es/es/about`). This prevents 404 errors and SEO drops.
- [ ] **Google Analytics:** Copy the existing GA Measurement ID (`G-XXXXX`) and add it to `index.html` to continue tracking visitor data without interruption.
- [ ] **Dynamic Meta Tags:** Install and configure `react-helmet` to set unique `<title>` and `<meta name="description">` tags for each page (replacing Yoast SEO functionality).
- [ ] **Sitemap:** Generate a new `sitemap.xml` for the React application and submit it to Google Search Console.

### 4. Email Verification (Resend & Supabase)
- [ ] Add your main domain (e.g., `srilankaviajeseden.es`) to the **Resend** dashboard and add the required TXT/MX records to your DNS settings to verify it.
- [ ] Once verified, update `supabase/functions/send-email/index.ts` to remove the temporary hardcoded email (`dewnipathirana1@gmail.com`) and enable the dynamic agent emails again.
- [ ] Redeploy the Supabase Edge Function to apply changes.
