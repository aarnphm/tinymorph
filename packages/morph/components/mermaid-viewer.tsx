import { useEffect, useRef, useState } from "react"
import { removeAllChildren } from "@/components/parser/utils"

interface MermaidViewerProps {
  codeBlock: HTMLDivElement
  onClose: () => void
}

export function MermaidViewer({ codeBlock, onClose }: MermaidViewerProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startPan = useRef({ x: 0, y: 0 })
  const MIN_SCALE = 0.5
  const MAX_SCALE = 3
  const ZOOM_SENSITIVITY = 0.001

  const svg = codeBlock.getElementsByTagName("svg")[0]

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = -e.deltaY * ZOOM_SENSITIVITY
    const newScale = Math.min(Math.max(scale + delta, MIN_SCALE), MAX_SCALE)

    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const scaleDiff = newScale - scale

      setPosition((prev) => ({
        x: prev.x - mouseX * scaleDiff,
        y: prev.y - mouseY * scaleDiff,
      }))
      setScale(newScale)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    isDragging.current = true
    startPan.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing"
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return

    setPosition({
      x: e.clientX - startPan.current.x,
      y: e.clientY - startPan.current.y,
    })
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab"
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  useEffect(() => {
    if (contentRef.current && svg) {
      removeAllChildren(contentRef.current)
      const cloned = svg.cloneNode(true) as SVGElement
      cloned.style.transform = ""
      contentRef.current.appendChild(cloned)
    }
  }, [svg])

  return (
    <div className="mermaid-viewer">
      <div className="mermaid-backdrop" onClick={onClose} />
      <div
        ref={containerRef}
        className="mermaid-space"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <div className="mermaid-header">
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" strokeWidth="2">
              <use href="#close-button" />
            </svg>
          </button>
        </div>
        <div
          ref={contentRef}
          className="mermaid-content"
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
        />
      </div>
    </div>
  )
}
