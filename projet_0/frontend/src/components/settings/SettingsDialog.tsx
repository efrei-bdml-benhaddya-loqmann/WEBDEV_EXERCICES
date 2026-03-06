"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { ProfileSettings } from "./ProfileSettings"
import { NotificationSettings } from "./NotificationSettings"
import { SecuritySettings } from "./SecuritySettings"
import { SettingsSidebar } from "./SettingsSidebar"
import { SettingsMobileHeader } from "./SettingsMobileHeader"
import type { SettingsSection } from "./types"

// ─── Types ────────────────────────────────────────────────────────────────────

interface SettingsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

// ─── Dialog Shell ─────────────────────────────────────────────────────────────

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
    const [activeSection, setActiveSection] = useState<SettingsSection>("profile")

    // Stable <div> mounted once to document.body — lives for the component lifetime.
    const portalRootRef = useRef<HTMLDivElement | null>(null)
    if (!portalRootRef.current && typeof document !== "undefined") {
        portalRootRef.current = document.createElement("div")
        portalRootRef.current.setAttribute("data-settings-portal", "")
    }
    useEffect(() => {
        const el = portalRootRef.current
        if (!el) return
        document.body.appendChild(el)
        return () => { document.body.removeChild(el) }
    }, [])

    // Close on Escape key & lock body scroll
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false) },
        [onOpenChange]
    )
    useEffect(() => {
        if (open) {
            document.addEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ""
        }
    }, [open, handleKeyDown])

    if (!open || !portalRootRef.current) return null

    const dialog = (
        <div
            className="fixed inset-0 z-[50] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)" }}
            onClick={() => onOpenChange(false)}
        >
            {/* Dialog panel */}
            <div
                className="relative flex flex-col sm:flex-row rounded-2xl shadow-2xl w-full h-full sm:w-[680px] sm:h-[600px] max-w-full max-h-[90vh] sm:max-h-[600px]"
                style={{
                    background: "var(--surface-primary, #fff)",
                    overflow: "clip",
                }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Settings"
            >
                {/* ── Desktop Sidebar ── */}
                <SettingsSidebar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    onClose={() => onOpenChange(false)}
                />

                {/* ── Mobile Header ── */}
                <SettingsMobileHeader
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    onClose={() => onOpenChange(false)}
                />

                {/* ── Content ── */}
                <main className="flex-1 overflow-y-auto min-w-0">
                    {activeSection === "profile" && <ProfileSettings />}
                    {activeSection === "notifications" && <NotificationSettings />}
                    {activeSection === "security" && <SecuritySettings />}
                </main>
            </div>
        </div>
    )

    return createPortal(dialog, portalRootRef.current)
}
