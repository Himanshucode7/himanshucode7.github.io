export const THEME_STORAGE_KEY = "theme";
export const INTRO_STORAGE_KEY = "intro-played";

/**
 * Runs during HTML parsing, before first paint (see "Preventing flash before
 * hydration" in the Next.js docs):
 * - applies a stored theme choice (no choice = follow the OS via CSS),
 * - marks the intro to play once per browser session on screens ≥ 768px, unless
 *   reduced motion is on. Phones skip it so the headline paints immediately.
 */
export const documentScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}try{if(matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches&&!sessionStorage.getItem("${INTRO_STORAGE_KEY}")){sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");d.setAttribute("data-intro","")}}catch(e){}})()`;
