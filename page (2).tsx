@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  background: #12070d;
  --font-display: Georgia, Cambria, "Times New Roman", serif;
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  min-height: 100vh;
  margin: 0;
  overflow-x: hidden;
  background:
    radial-gradient(circle at top left, rgba(74, 25, 46, 0.48), transparent 27rem),
    radial-gradient(circle at 80% 0%, rgba(209, 180, 100, 0.12), transparent 22rem),
    linear-gradient(180deg, #12070d 0%, #1a0d13 48%, #12070d 100%);
  color: #fafaf9;
}

a {
  color: inherit;
  text-decoration: none;
}

::selection {
  background: rgba(212, 175, 55, 0.32);
  color: #ffffff;
}

.premium-border {
  border: 1px solid rgba(209, 180, 100, 0.2);
}

.gold-text {
  background: linear-gradient(135deg, #e8d59a, #d1b464 58%, #fafaf9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-shell {
  margin-inline: auto;
  width: min(1120px, calc(100% - 32px));
}

.action-link,
.action-button,
.action-danger {
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border-radius: 9999px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
}

.action-link {
  border: 1px solid rgba(209, 180, 100, 0.3);
  color: #e8d59a;
}

.action-button {
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #d8d1ca;
}

.action-danger {
  border: 1px solid rgba(74, 25, 46, 0.8);
  color: #d8d1ca;
}

.reveal-soft {
  animation: reveal-soft 480ms ease-out both;
}

@keyframes reveal-soft {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
