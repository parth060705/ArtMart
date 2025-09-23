# Progressive Web App (PWA) Setup

This guide provides information about the PWA features implemented in ArtMart and how to use them.

## Features

- **Offline Support**: The app works offline using service workers to cache assets and API responses.
- **Installable**: Users can install the app on their device's home screen.
- **Automatic Updates**: The app automatically updates when a new version is available.
- **App-like Experience**: Full-screen mode, standalone display, and smooth transitions.

## Development

### Testing PWA Features

1. **Local Development**:
   - Run the development server with `npm run dev`
   - The service worker runs in development mode but has limited functionality

2. **Production Build**:
   - Create a production build with `npm run build`
   - Preview the production build with `npm run preview`
   - The service worker will be fully functional in production mode

### Service Worker

The service worker is automatically registered when the app loads. It handles:

- Caching of static assets (JS, CSS, images, fonts)
- Caching of API responses (with network-first strategy)
- Background sync for failed requests
- Push notifications (if configured)

### Updating the App

When you deploy a new version of the app:

1. The service worker detects the update
2. It downloads the new assets in the background
3. Users see an update notification
4. The app updates when all tabs are closed

## Customization

### PWA Configuration

Edit `vite.config.js` to customize PWA settings:

- `manifest`: Configure app name, icons, theme colors, etc.
- `workbox`: Configure caching strategies and runtime caching
- `devOptions`: Configure development mode behavior

### Icons and Splash Screens

Icons and splash screens are generated based on the files in the `public` directory:

- `pwa-192x192.png`: App icon (192x192)
- `pwa-512x512.png`: App icon (512x512)
- `apple-touch-icon.png`: iOS home screen icon
- `favicon.ico`: Browser tab icon

## Troubleshooting

### Clearing Service Worker Cache

If you're experiencing issues with the service worker:

1. Open Chrome DevTools (F12)
2. Go to the "Application" tab
3. Click on "Service Workers" in the left sidebar
4. Check "Update on reload" and click "Unregister"
5. Refresh the page

### Testing Offline Mode

To test offline functionality:

1. Open Chrome DevTools (F12)
2. Go to the "Network" tab
3. Check the "Offline" checkbox
4. Refresh the page

## Deployment

When deploying to production:

1. Ensure your server serves all routes to `index.html` (SPA fallback)
2. Configure proper HTTPS (required for service workers)
3. Set appropriate cache headers for static assets

## Resources

- [Vite PWA Plugin Documentation](https://vite-pwa-org.netlify.app/)
- [Web App Manifest Reference](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
