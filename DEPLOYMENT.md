# Self-Hosted Deployment Guide

This guide covers deploying the Hugo site on Ubuntu with Caddy and systemd.

## Prerequisites

- Ubuntu server with sudo access
- Domain name pointed to your server
- Hugo Extended installed
- Node.js and npm installed
- Caddy web server

## Installation

### 1. Install Hugo Extended

```bash
# Download and install Hugo Extended
wget https://github.com/gohugoio/hugo/releases/download/v0.148.2/hugo_extended_0.148.2_linux-amd64.deb
sudo dpkg -i hugo_extended_0.148.2_linux-amd64.deb
```

### 2. Install Node.js

```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install Caddy

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

## Deployment Setup

### 1. Clone and Build

```bash
# Clone the repository
git clone https://github.com/dunamismax/forge-realm.git
cd forge-realm

# Install dependencies
npm install

# Build the site
npm run build
```

### 2. Configure Caddy

Create `/etc/caddy/Caddyfile`:

```
your-domain.com {
    root * /var/www/forge-realm
    file_server
    
    # Enable gzip compression
    encode gzip
    
    # Cache static assets
    @static {
        path *.css *.js *.png *.jpg *.jpeg *.gif *.ico *.svg *.woff *.woff2
    }
    header @static Cache-Control "public, max-age=31536000"
    
    # Security headers
    header {
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        Referrer-Policy strict-origin-when-cross-origin
    }
}
```

### 3. Set up Web Directory

```bash
# Create web directory
sudo mkdir -p /var/www/forge-realm

# Copy built site
sudo cp -r public/* /var/www/forge-realm/

# Set permissions
sudo chown -R caddy:caddy /var/www/forge-realm
```

### 4. Create Systemd Service for Auto-deployment

Create `/etc/systemd/system/forge-realm-deploy.service`:

```ini
[Unit]
Description=Forge Realm Site Deployment
After=network.target

[Service]
Type=oneshot
User=www-data
WorkingDirectory=/opt/forge-realm
ExecStart=/usr/local/bin/deploy-forge-realm.sh
```

Create deployment script `/usr/local/bin/deploy-forge-realm.sh`:

```bash
#!/bin/bash
set -e

REPO_DIR="/opt/forge-realm"
WEB_DIR="/var/www/forge-realm"

# Pull latest changes
cd $REPO_DIR
git pull origin main

# Install dependencies and build
npm install
npm run build

# Update web directory
rm -rf $WEB_DIR/*
cp -r public/* $WEB_DIR/

# Set permissions
chown -R caddy:caddy $WEB_DIR

# Reload Caddy
systemctl reload caddy

echo "Deployment completed at $(date)"
```

Make it executable:

```bash
sudo chmod +x /usr/local/bin/deploy-forge-realm.sh
```

### 5. Start Services

```bash
# Start and enable Caddy
sudo systemctl enable caddy
sudo systemctl start caddy

# Test the deployment service
sudo systemctl start forge-realm-deploy
```

## Configuration

### Update Base URL

Before building, update `hugo.toml`:

```toml
baseURL = 'https://your-actual-domain.com'
```

### Environment Variables

For production builds, you can set:

```bash
export HUGO_ENVIRONMENT=production
export HUGO_CACHEDIR=/tmp/hugo_cache
```

## Maintenance

### Manual Deployment

```bash
cd /opt/forge-realm
git pull
npm run build
sudo cp -r public/* /var/www/forge-realm/
sudo chown -R caddy:caddy /var/www/forge-realm
sudo systemctl reload caddy
```

### Automated Updates

Set up a webhook or cron job to run the deployment service:

```bash
# Add to crontab for daily updates
0 2 * * * /bin/systemctl start forge-realm-deploy
```

## Monitoring

Check logs:

```bash
# Caddy logs
sudo journalctl -u caddy -f

# Deployment logs
sudo journalctl -u forge-realm-deploy -f
```

## Troubleshooting

1. **Hugo build fails**: Check Node.js dependencies with `npm install`
2. **Caddy permission errors**: Verify ownership with `sudo chown -R caddy:caddy /var/www/forge-realm`
3. **Domain not resolving**: Check DNS settings and Caddy configuration
4. **CSS/JS not loading**: Verify static file paths and check browser console
