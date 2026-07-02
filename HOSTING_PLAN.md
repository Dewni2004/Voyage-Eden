# Hosting Plan & Progress for Voyage Eden

## What we achieved so far:
1. **Multi-language email template:** Configured `emailTemplate.js` to dynamically show the correct Brand Name based on the form's language (e.g., Sri Lanka Viajes Eden, Sri Lanka Eden Reisen).
2. **Resend Edge Function Setup:** We modified the `send-email` Supabase Edge Function to temporarily force the `to` address to `dewnipathirana1@gmail.com` because the domain is not yet verified in Resend. This prevents errors during testing.

## Next Steps (To do tomorrow):
The user has promised the boss to host the 5 language sites. Since this is ONE React app with `react-i18next`, we will host it once and point 5 domains to it.

### Step 1: GitHub Push
- Create a GitHub repo and push the `Voyage Eden` codebase.

### Step 2: Custom Domain Language Router in `src/i18n.js`
- Modify `i18n.js` to detect `window.location.hostname`.
- If `srilankaviajeseden.es` -> set language to `es`.
- If `voyageeden.fr` -> set language to `fr`.
- Add this logic before i18n initializes so the site loads in the correct language instantly.

### Step 3: Hosting on Render (or Vercel)
- Create a Static Site on Render connected to the GitHub repo.
- Build command: `npm run build`
- Publish directory: `dist`
- Add Environment Variables (Supabase URL, Anon Key).

### Step 4: Domain Connection & Email Verification
- Point all 5 old WordPress domains to the new Render site via DNS (CNAME/A records).
- Add the main domain (e.g., `srilankaviajeseden.es` or `voyageeden.com`) to **Resend** and add the TXT/MX records to verify it.
- Once verified, update `supabase/functions/send-email/index.ts` to remove the temporary hardcoded `to: ['dewnipathirana1@gmail.com']` email and use the frontend's requested email again. Redeploy the edge function.
