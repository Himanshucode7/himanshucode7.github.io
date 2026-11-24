export const INTRO_STORAGE_KEY = "intro-played";

/**
 * Runs during HTML parsing, before first paint (see "Preventing flash before
 * hydration" in the Next.js docs): marks the intro to play once per browser
 * session on screens ≥ 768px, unless reduced motion is on. Phones skip it so the
 * hero paints immediately.
 */
export const documentScript = `(function(){var d=document.documentElement;try{if(matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches&&!sessionStorage.getItem("${INTRO_STORAGE_KEY}")){sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");d.setAttribute("data-intro","")}}catch(e){}})()`;
