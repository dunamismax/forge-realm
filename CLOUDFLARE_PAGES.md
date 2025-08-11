# Cloudflare Pages Deployment

This site is deployed to Cloudflare Pages at [forge-realm.com](https://forge-realm.com).

## Automatic Deployment

The site automatically deploys when changes are pushed to the `main` branch via Cloudflare Pages' Git integration.

## Build Settings

**Framework preset:** Hugo
**Build command:** `hugo --minify --environment production`
**Build output directory:** `public`
**Root directory:** (leave blank)
**Node.js version:** 18 or later

## Environment Variables

Set these in the Cloudflare Pages dashboard:

```
HUGO_VERSION=0.148.2
NODE_VERSION=18
NPX_FLAGS=--yes
```

## Custom Domain Setup

1. In Cloudflare Pages dashboard, go to Custom domains
2. Add `forge-realm.com` and `www.forge-realm.com`
3. Ensure your domain nameservers are set to Cloudflare
4. SSL/TLS will be automatically configured

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (same as Cloudflare Pages)
npm run build
```

## Deployment Process

1. **Push to main branch** → Triggers automatic build
2. **Cloudflare Pages builds** using Hugo extended with Node.js
3. **Site deploys** to forge-realm.com automatically
4. **Preview deployments** available for pull requests

## Benefits of Cloudflare Pages

- **Global CDN** for fast worldwide access
- **Automatic SSL** certificates
- **Branch previews** for testing changes
- **Analytics** and performance monitoring
- **DDoS protection** included
- **Custom headers** and redirects support
- **Form handling** for contact forms
- **Serverless functions** if needed later

## Monitoring

- **Build logs** available in Cloudflare Pages dashboard
- **Analytics** show page views and performance
- **Real User Monitoring** tracks Core Web Vitals
- **Security insights** for threat monitoring

## Custom Headers and Redirects

Create `_headers` file in `static/` directory for custom headers:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'
```

Create `_redirects` file in `static/` directory for URL redirects:

```
# Redirect old URLs
/old-path/* /new-path/:splat 301

# Redirect www to non-www (if desired)
https://www.forge-realm.com/* https://forge-realm.com/:splat 301!
```

## Troubleshooting

- **Build failures**: Check Hugo version and Node.js dependencies
- **CSS/JS issues**: Verify PostCSS configuration and npm packages
- **Domain issues**: Ensure nameservers are set to Cloudflare
- **SSL errors**: Allow up to 24 hours for certificate provisioning

## Performance Tips

- **Image optimization**: Use Hugo's image processing features
- **Minification**: Already enabled with `hugo --minify`
- **Caching**: Cloudflare automatically caches static assets
- **Compression**: Gzip/Brotli automatically enabled
