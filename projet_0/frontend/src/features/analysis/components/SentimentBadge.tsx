import type { ReactNode } from 'react'

type SentimentColor = 'success' | 'danger' | 'secondary'

export function SentimentBadge({
  children,
  color
}: {
  children: ReactNode,
  color: SentimentColor
}) {
  // Map our color prop to the data-color attributes the SDK variables expect
  const colorMap = {
    success: 'success',
    danger: 'danger',
    secondary: 'secondary'
  }

  const selectedColor = colorMap[color]

  return (
    <div
      className="inline-flex items-center w-full px-2 py-1 rounded-[0.375rem] text-sm font-semibold leading-relaxed whitespace-normal break-words"
      style={{
        backgroundColor: `var(--color-background-${selectedColor}-soft-alpha)`,
        color: `var(--color-text-${selectedColor}-soft)`,
        minHeight: '1.5rem', // --control-size-2xs
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
