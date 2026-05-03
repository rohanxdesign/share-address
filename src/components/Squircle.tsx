import { forwardRef, useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { getSvgPath } from 'figma-squircle'

type SquircleProps = {
  cornerRadius?: number
  cornerSmoothing?: number
  borderColor?: string
  borderWidth?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onClick?: (event: React.MouseEvent) => void
}

export const Squircle = forwardRef<HTMLDivElement, SquircleProps>(function Squircle(
  {
    cornerRadius = 16,
    cornerSmoothing = 0.6,
    borderColor,
    borderWidth = 1,
    className,
    style,
    children,
    onClick,
  },
  forwardedRef,
) {
  const sizingRef = useRef<HTMLDivElement | null>(null)
  const [size, setSize] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const el = sizingRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width === 0 || height === 0) return
      setSize({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const path = size
    ? getSvgPath({ cornerRadius, cornerSmoothing, width: size.width, height: size.height })
    : null

  const setRefs = (node: HTMLDivElement | null) => {
    sizingRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef)
      (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
  }

  return (
    <div
      ref={setRefs}
      onClick={onClick}
      className={className}
      style={{
        ...style,
        position: 'relative',
        clipPath: path ? `path('${path}')` : undefined,
      }}
    >
      {children}
      {path && borderColor ? (
        <svg
          width={size!.width}
          height={size!.height}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          <path d={path} fill="none" stroke={borderColor} strokeWidth={borderWidth} />
        </svg>
      ) : null}
    </div>
  )
})
