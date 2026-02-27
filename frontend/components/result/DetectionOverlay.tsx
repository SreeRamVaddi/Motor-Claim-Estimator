'use client'
import { useEffect, useRef } from 'react'

interface BBox { x1: number; y1: number; x2: number; y2: number }
interface Detection {
    part: string
    severity: 'low' | 'medium' | 'high'
    confidence: number
    bbox: BBox
}
interface DetectionOverlayProps {
    imageUrl: string
    detections: Detection[]
    imageWidth: number
    imageHeight: number
}

const SEVERITY_COLORS: Record<string, string> = {
    high: '#FF3B30',
    medium: '#FFD60A',
    low: '#30D158',
}

export function DetectionOverlay({ imageUrl, detections, imageWidth, imageHeight }: DetectionOverlayProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!canvas || !container) return

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = imageUrl
        imgRef.current = img

        function draw() {
            if (!canvas) return
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            const W = canvas.width
            const H = canvas.height
            const scaleX = W / imageWidth
            const scaleY = H / imageHeight

            ctx.clearRect(0, 0, W, H)

            // Draw base image if loaded
            if (img.complete && img.naturalWidth > 0) {
                ctx.drawImage(img, 0, 0, W, H)
            } else {
                ctx.fillStyle = '#111118'
                ctx.fillRect(0, 0, W, H)
            }

            // Draw bounding boxes
            detections.forEach((det) => {
                const x = det.bbox.x1 * scaleX
                const y = det.bbox.y1 * scaleY
                const w = (det.bbox.x2 - det.bbox.x1) * scaleX
                const h = (det.bbox.y2 - det.bbox.y1) * scaleY
                const c = SEVERITY_COLORS[det.severity]

                // Box fill
                ctx.fillStyle = c + '18'
                ctx.fillRect(x, y, w, h)

                // Box border
                ctx.strokeStyle = c
                ctx.lineWidth = 1.5
                ctx.setLineDash([6, 3])
                ctx.strokeRect(x, y, w, h)
                ctx.setLineDash([])

                // Corner marks
                const cs = 10
                ctx.strokeStyle = c
                ctx.lineWidth = 2.5
                ctx.lineJoin = 'round'
                    ;[[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]].forEach(([cx, cy, dx, dy]) => {
                        ctx.beginPath()
                        ctx.moveTo(+cx + (+dx) * cs, +cy)
                        ctx.lineTo(+cx, +cy)
                        ctx.lineTo(+cx, +cy + (+dy) * cs)
                        ctx.stroke()
                    })

                // Label chip
                const label = `${det.part} · ${det.confidence}%`
                ctx.font = 'bold 10px "JetBrains Mono", monospace'
                const tw = ctx.measureText(label).width + 12
                ctx.fillStyle = c
                ctx.fillRect(x, y - 18, tw, 16)
                ctx.fillStyle = det.severity === 'medium' ? '#000' : '#fff'
                ctx.fillText(label, x + 6, y - 5)
            })
        }

        img.onload = draw
        draw()

        const ro = new ResizeObserver(() => {
            if (canvas && container) {
                canvas.width = container.offsetWidth
                canvas.height = container.offsetHeight
                draw()
            }
        })
        ro.observe(container)
        return () => ro.disconnect()
    }, [imageUrl, detections, imageWidth, imageHeight])

    return (
        <div
            ref={containerRef}
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: `${imageWidth}/${imageHeight}`, background: '#111118' }}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ display: 'block' }}
            />
        </div>
    )
}
