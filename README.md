# Enable Sleep Marketing Website

A production-ready marketing website for Enable Sleep - a HIPAA-compliant healthcare platform connecting dental practices with sleep medicine specialists.

## 🚀 Features

- **Angular 17+** with standalone components
- **Tailwind CSS** for modern, responsive styling
- **Angular Material** for form components
- **Vercel Serverless Functions** for email capture
- **Google Analytics 4** integration
- **SEO optimized** with meta tags, sitemap, and robots.txt
- **HIPAA-compliant** design and infrastructure
- **Mobile-responsive** and fast loading

## 📋 Prerequisites

- Node.js 18+ (currently using v23.6.0)
- npm 8+
- Vercel account (for deployment)

## 🛠 Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Navigate to http://localhost:4200
```

## 📦 Build

```bash
# Build for production
npm run build

# Build output will be in dist/enable-sleep-marketing/browser
```

## 🚀 Deployment

### Vercel (Recommended)

1. **GitHub Integration:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. Import project in Vercel dashboard
3. Vercel will auto-detect Angular and deploy

### Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## 🌐 Custom Domain Setup

### Route 53 → Vercel

1. In Vercel: Settings → Domains → Add `enablesleep.com`
2. In AWS Route 53:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
   - **TXT**: `_vercel` → (value from Vercel)

## 📊 Google Analytics

Replace placeholder GA4 ID in `src/index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA4-ID"></script>
```

## 🔧 Configuration

### Environment Variables (Vercel)

For GitHub Actions deployment, add these secrets to your GitHub repository:
- `VERCEL_TOKEN` - From Vercel Account Settings → Tokens
- `VERCEL_ORG_ID` - Run `vercel link` locally
- `VERCEL_PROJECT_ID` - Run `vercel link` locally

## 📁 Project Structure

```
enable-sleep-marketing/
├── api/                          # Vercel serverless functions
│   └── waitlist.ts              # Email capture API
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── email-capture/   # Email form component
│   │   ├── pages/
│   │   │   ├── landing/         # Main landing page
│   │   │   ├── privacy/         # Privacy policy
│   │   │   └── terms/           # Terms of service
│   │   ├── services/
│   │   │   └── email-capture.service.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── environments/
│   ├── index.html
│   └── styles.scss              # Global styles + Tailwind
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── tailwind.config.js
├── vercel.json
└── package.json
```

## 🎨 Brand Colors

```scss
--color-primary: #5ba5a5         // Teal
--color-primary-dark: #2c4964    // Navy
--color-primary-darker: #1e3a5f  // Darker Navy
--color-primary-light: #70c4c4   // Light Teal
```

## ✅ Pre-Launch Checklist

- [ ] Replace GA4 ID in `src/index.html`
- [ ] Add logo to `public/` directory
- [ ] Test email capture form
- [ ] Test all navigation links
- [ ] Mobile responsiveness check
- [ ] Run Lighthouse audit (target 90+)
- [ ] Verify custom domain DNS
- [ ] Test HTTPS

## 📈 Post-Launch Tasks

- [ ] Submit sitemap to Google Search Console
- [ ] Set up GA4 conversion events
- [ ] Monitor Vercel analytics
- [ ] Set up email notifications for form submissions
- [ ] Create social media OG image (1200x630px)

## 🔒 HIPAA Compliance

- All patient data handled through HIPAA-compliant infrastructure
- Email waitlist stored temporarily in Vercel serverless environment
- SSL/TLS encryption for all data in transit
- No PHI stored on client side

## 🆘 Troubleshooting

### Build Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Vercel Deployment Issues

1. Check deployment logs in Vercel dashboard
2. Verify `vercel.json` configuration
3. Ensure `dist` path matches in `vercel.json`
4. Check that all environment variables are set

### Tailwind Not Working

1. Ensure `tailwind.config.js` content paths are correct
2. Check that `@tailwind` directives are in `styles.scss`
3. Restart dev server after config changes

## 📝 License

© 2025 Enable Sleep. All rights reserved.

## 📧 Contact

- Email: info@enablesleep.com
- Privacy: privacy@enablesleep.com

---

**Built with ❤️ for dental sleep medicine**
