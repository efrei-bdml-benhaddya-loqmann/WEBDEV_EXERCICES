import React, { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"

// ─── Context ──────────────────────────────────────────────────────────────────
// Internal context shared between all Dialog sub‑components.

interface DialogContextValue {
    open: boolean
    setOpen: (open: boolean) => void
    titleId: string
    descriptionId: string
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext(componentName: string): DialogContextValue {
    const ctx = useContext(DialogContext)
    if (!ctx) throw new Error(`<${componentName}> must be used inside a <Dialog>`)
    return ctx
}

// ─── Dialog ───────────────────────────────────────────────────────────────────
// Root component. Manages open state and provides context.
// Accepts optional `open` / `onOpenChange` for controlled usage;
// falls back to its own internal state for uncontrolled usage.

interface DialogProps {
    /** Controlled open state. Omit to use uncontrolled mode. */
    open?: boolean
    /** Called when the dialog requests an open‑state change. */
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
}

export function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const titleId = useId()
    const descriptionId = useId()

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : internalOpen

    const setOpen = useCallback(
        (value: boolean) => {
            if (!isControlled) setInternalOpen(value)
            onOpenChange?.(value)
        },
        [isControlled, onOpenChange],
    )

    return (
        <DialogContext.Provider value={{ open, setOpen, titleId, descriptionId }}>
            {children}
        </DialogContext.Provider>
    )
}

// ─── DialogTrigger ────────────────────────────────────────────────────────────
// Wraps any child element and opens the dialog on click.
// Passes onClick to a single child element (clone strategy) or wraps it
// in an invisible button when the child is a plain string / fragment.

interface DialogTriggerProps {
    children: React.ReactNode
    /** Extra className applied to the fallback wrapper `<button>`. */
    className?: string
}

export function DialogTrigger({ children, className }: DialogTriggerProps) {
    const { setOpen } = useDialogContext("DialogTrigger")

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpen(true)
    }

    // If child is a valid React element, forward the onClick to it.
    if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            onClick: (e: React.MouseEvent<HTMLElement>) => {
                (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onClick?.(e)
                handleClick(e)
            },
        })
    }

    // Otherwise, wrap in a plain button.
    return (
        <button type="button" onClick={handleClick} className={className}>
            {children}
        </button>
    )
}

// ─── DialogClose ──────────────────────────────────────────────────────────────
// Wraps any child element and closes the dialog on click.

interface DialogCloseProps {
    children: React.ReactNode
    className?: string
}

export function DialogClose({ children, className }: DialogCloseProps) {
    const { setOpen } = useDialogContext("DialogClose")

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpen(false)
    }

    if (React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            onClick: (e: React.MouseEvent<HTMLElement>) => {
                (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onClick?.(e)
                handleClick(e)
            },
        })
    }

    return (
        <button type="button" onClick={handleClick} className={className}>
            {children}
        </button>
    )
}

// ─── DialogContent ────────────────────────────────────────────────────────────
// The modal panel itself. Rendered into a portal on <body>.
// Clicking the backdrop closes the dialog.

interface DialogContentProps {
    children: React.ReactNode
    className?: string
    /** Extra inline styles for the dialog panel. */
    style?: React.CSSProperties
    /** Extra inline styles for the backdrop. */
    backdropStyle?: React.CSSProperties
}

export function DialogContent({ children, className = "", style, backdropStyle }: DialogContentProps) {
    const { open, setOpen, titleId, descriptionId } = useDialogContext("DialogContent")
    const panelRef = useRef<HTMLDivElement>(null)

    // Escape key closes the dialog.
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) },
        [setOpen],
    )

    useEffect(() => {
        if (!open) return
        document.addEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ""
        }
    }, [open, handleKeyDown])

    if (!open) return null

    const panel = (
        <div
            className="fixed inset-0 z-[50] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", ...backdropStyle }}
            onClick={() => setOpen(false)}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className={[
                    "relative shadow-2xl w-full focus:outline-none",
                    className,
                ].join(" ")}
                style={{
                    background: "var(--color-surface)",
                    ...style,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )

    return createPortal(panel, document.body)
}

// ─── DialogHeader ─────────────────────────────────────────────────────────────
// Convenience wrapper for the top section of the dialog (title + description).

interface DialogHeaderProps {
    children: React.ReactNode
    className?: string
    divider?: boolean
}

export function DialogHeader({ children, className = "", divider = true }: DialogHeaderProps) {
    return (
        <>
            <div className={`flex flex-col gap-1 p-6 pb-4 ${className}`}>
                {children}
            </div>
            {divider && <div className="border-t border-[var(--color-border)] mx-6"></div>}
        </>
    )
}

// ─── DialogTitle ──────────────────────────────────────────────────────────────

interface DialogTitleProps {
    children: React.ReactNode
    className?: string
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
    const { titleId } = useDialogContext("DialogTitle")
    return (
        <h2 id={titleId} className={`text-lg text-[var(--color-text)] ${className}`}>
            {children}
        </h2>
    )
}

// ─── DialogDescription ────────────────────────────────────────────────────────

interface DialogDescriptionProps {
    children: React.ReactNode
    className?: string
}

export function DialogDescription({ children, className = "" }: DialogDescriptionProps) {
    const { descriptionId } = useDialogContext("DialogDescription")
    return (
        <p id={descriptionId} className={`text-sm text-[var(--color-text-secondary)] ${className}`}>
            {children}
        </p>
    )
}

// ─── DialogSidebar ────────────────────────────────────────────────────────────
// A layout helper for dialogs that have a sidebar navigation panel.
// On mobile  (< sm): renders children inside a horizontal top bar.
// On desktop (≥ sm): renders children as a vertical left sidebar.
//
// Usage:
//   <DialogContent className="flex flex-col sm:flex-row ...">
//     <DialogSidebar>
//       <nav>…nav items…</nav>
//     </DialogSidebar>
//     <main>…content…</main>
//   </DialogContent>

interface DialogSidebarProps {
    children: React.ReactNode
    className?: string
    /** Width of the sidebar on desktop (default: 191). */
    desktopWidth?: number
}

export function DialogSidebar({ children, className = "", desktopWidth = 191 }: DialogSidebarProps) {
    return (
        <>
            {/* Desktop Sidebar (sm+) */}
            <aside
                className={`hidden sm:flex flex-col shrink-0 bg-surface-secondary border-r border-default ${className}`}
                style={{
                    width: desktopWidth,
                }}
            >
                {children}
            </aside>

            {/* Mobile Top Bar */}
            <div
                className={`flex sm:hidden flex-col bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] shrink-0 ${className}`}
            >
                {children}
            </div>
        </>
    )
}
