export function registerEscapeHandler(outsideContainer: HTMLElement | null, cb: () => void) {
  if (!outsideContainer) return
  function click(this: HTMLElement, e: HTMLElementEventMap["click"]) {
    if (e.target !== this) return
    e.preventDefault()
    e.stopPropagation()
    cb()
  }

  function esc(e: HTMLElementEventMap["keydown"]) {
    if (!e.key.startsWith("Esc")) return
    e.preventDefault()
    cb()
  }

  outsideContainer?.addEventListener("click", click)
  window.addCleanup(() => outsideContainer?.removeEventListener("click", click))
  document.addEventListener("keydown", esc)
  window.addCleanup(() => document.removeEventListener("keydown", esc))
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

export function isInViewport(element: HTMLElement, buffer: number = 100) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= -buffer &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + buffer
  )
}

// Computes an offset such that setting `top` on elemToAlign will put it
// in vertical alignment with targetAlignment.
function computeOffsetForAlignment(elemToAlign: HTMLElement, targetAlignment: HTMLElement) {
  const elemRect = elemToAlign.getBoundingClientRect()
  const targetRect = targetAlignment.getBoundingClientRect()
  const parentRect = elemToAlign.parentElement?.getBoundingClientRect() || elemRect
  return targetRect.top - parentRect.top
}

// Get bounds for the sidenote positioning
function getBounds(parent: HTMLElement, child: HTMLElement): { min: number; max: number } {
  const containerRect = parent.getBoundingClientRect()
  const sidenoteRect = child.getBoundingClientRect()

  return {
    min: 0,
    max: containerRect.height - sidenoteRect.height,
  }
}

export function updatePosition(ref: HTMLElement, child: HTMLElement, parent: HTMLElement) {
  // Calculate ideal position
  let referencePosition = computeOffsetForAlignment(child, ref)

  // Get bounds for this sidenote
  const bounds = getBounds(parent, child)

  // Clamp the position within bounds
  referencePosition = Math.max(referencePosition, Math.min(bounds.min, bounds.max))

  // Apply position
  child.style.top = `${referencePosition}px`
}

// AliasRedirect emits HTML redirects which also have the link[rel="canonical"]
// containing the URL it's redirecting to.
// Extracting it here with regex is _probably_ faster than parsing the entire HTML
// with a DOMParser effectively twice (here and later in the SPA code), even if
// way less robust - we only care about our own generated redirects after all.
const canonicalRegex = /<link rel="canonical" href="([^"]*)">/

export async function fetchCanonical(url: URL): Promise<Response> {
  const res = await fetch(`${url}`)
  if (!res.headers.get("content-type")?.startsWith("text/html")) {
    return res
  }
  // reading the body can only be done once, so we need to clone the response
  // to allow the caller to read it if it's was not a redirect
  const text = await res.clone().text()
  const [_, redirect] = text.match(canonicalRegex) ?? []
  return redirect ? fetch(`${new URL(redirect, url)}`) : res
}
