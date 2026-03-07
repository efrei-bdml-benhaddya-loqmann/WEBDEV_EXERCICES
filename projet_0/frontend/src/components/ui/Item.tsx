import React from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type ItemVariant = "default" | "destructive" | "muted"

// ─── ItemGroup ────────────────────────────────────────────────────────────────
// Wraps a logical group of Items. Optionally shows a group label above.

interface ItemGroupProps {
    label?: string
    children: React.ReactNode
    className?: string
}

export function ItemGroup({ label, children, className = "" }: ItemGroupProps) {
    return (
        <div className={className}>
            {label && (
                <p className="px-6 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary,#888)]">
                    {label}
                </p>
            )}
            <div>{children}</div>
        </div>
    )
}

// ─── Item ─────────────────────────────────────────────────────────────────────
// A single row in a settings-like list. Supports hover state via Tailwind.

interface ItemProps {
    children: React.ReactNode
    variant?: ItemVariant
    className?: string
    onClick?: () => void
    separator?: boolean
}

export function Item({ children, variant = "default", onClick, className = "", separator = true }: ItemProps) {
    const variantClass =
        variant === "destructive"
            ? "text-[var(--text-error,#e53e3e)]"
            : variant === "muted"
                ? "opacity-50 pointer-events-none"
                : ""

    const interactiveClass = onClick
        ? "cursor-pointer hover:bg-[var(--surface-secondary,#f9f9f9)] transition-colors duration-100"
        : ""

    return (
        <>
            <div
                className={`flex items-center justify-between px-6 py-4 ${variantClass} ${interactiveClass} ${className}`}
                // style={separator ? { borderBottom: "1px solid var(--border-default, #e5e5e5)" } : {}}
                onClick={onClick}
            >
                {children}
            </div>
            {separator && <div className="border-t border-default mx-6"></div>}
        </>
    )
}

// ─── ItemContent ──────────────────────────────────────────────────────────────
// Left-side content area: holds ItemTitle + optional ItemDescription.

interface ItemContentProps {
    children: React.ReactNode
    className?: string
}

export function ItemContent({ children, className = "" }: ItemContentProps) {
    return <div className={`flex flex-col gap-0.5 ${className}`}>{children}</div>
}

// ─── ItemTitle ────────────────────────────────────────────────────────────────

interface ItemTitleProps {
    children: React.ReactNode
    className?: string
}

export function ItemTitle({ children, className = "" }: ItemTitleProps) {
    return <span className={`text-sm ${className}`}>{children}</span>
}

// ─── ItemDescription ──────────────────────────────────────────────────────────

interface ItemDescriptionProps {
    children: React.ReactNode
    className?: string
}

export function ItemDescription({ children, className = "" }: ItemDescriptionProps) {
    return (
        <span className={`text-sm text-[var(--text-secondary,#555)] ${className}`}>
            {children}
        </span>
    )
}

// ─── ItemActions ──────────────────────────────────────────────────────────────
// Right-side slot: place buttons, toggles, badges, or a current value here.

interface ItemActionsProps {
    children: React.ReactNode
    className?: string
}

export function ItemActions({ children, className = "" }: ItemActionsProps) {
    return (
        <div className={`flex items-center gap-3 shrink-0 ml-4 ${className}`}>
            {children}
        </div>
    )
}

// ─── ItemSeparator ────────────────────────────────────────────────────────────
// A visual divider that can be used between groups or inside a group.

interface ItemSeparatorProps {
    className?: string
}

export function ItemSeparator({ className = "" }: ItemSeparatorProps) {
    return (
        <div
            className={className}
            style={{ borderBottom: "1px solid var(--border-default, #e5e5e5)" }}
        />
    )
}
