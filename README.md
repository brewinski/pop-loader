# Pop-Loader

the chrome extension custom built for my grandad due to a bug in software he's using at work. If you're not sure if you needs this extension, let me save you some time... You don't.

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm run dev
```

3. Open Chrome and navigate to `chrome://extensions/`, enable "Developer mode", and load the unpacked extension from the `dist` directory.

4. Build for production:

```bash
pnpm run build
```

## Project Structure

- `src/popup/` - Extension popup UI
- `src/content/` - Content scripts
- `src/background/` - Background worker code.
- `manifest.config.ts` - Chrome extension manifest configuration

## Chrome Extension Development Notes

- Use `manifest.config.ts` to configure your extension
- The CRXJS plugin automatically handles manifest generation
- Content scripts should be placed in `src/content/`
- Popup UI should be placed in `src/popup/`
- Background worker code should be placed in `src/background`
