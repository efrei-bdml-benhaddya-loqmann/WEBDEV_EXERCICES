"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogSidebar,
} from "@/components/ui/Dialog"
import { ProfileSettings } from "./views/ProfileSettings"
import { NotificationSettings } from "./views/NotificationSettings"
import { SecuritySettings } from "./views/SecuritySettings"
import { DataManagementSettings } from "./views/DataManagementSettings"
import { SettingsSidebar } from "./SettingsSidebar"
import type { SettingsSection } from "@/features/settings/types/settings.types"
import { GeneralSettings } from "./views/GeneralSettings"

// ─── Types ────────────────────────────────────────────────────────────────────

interface SettingsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialSection?: SettingsSection
}

// ─── Dialog Shell ─────────────────────────────────────────────────────────────

export function SettingsDialog({ open, onOpenChange, initialSection = "profile" }: SettingsDialogProps) {
    const [activeSection, setActiveSection] = useState<SettingsSection>(initialSection)

    useEffect(() => {
        if (open) {
            setActiveSection(initialSection)
        }
    }, [open, initialSection])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="flex flex-col sm:flex-row w-full h-full sm:w-[680px] sm:h-[600px] sm:max-w-[680px] sm:max-h-[600px] max-h-[100dvh] p-0 rounded-2xl"
                style={{ overflow: "clip" }}
            >
                {/* ── Sidebar (desktop: vertical aside, mobile: horizontal top bar) ── */}
                <DialogSidebar desktopWidth={191}>
                    <SettingsSidebar
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        onClose={() => onOpenChange(false)}
                    />
                </DialogSidebar>

                {/* ── Content ── */}
                <main className="flex-1 overflow-y-auto min-w-0">
                    {activeSection === "profile" && <ProfileSettings />}
                    {activeSection === "notifications" && <NotificationSettings />}
                    {activeSection === "data" && <DataManagementSettings />}
                    {activeSection === "security" && <SecuritySettings />}
                    {activeSection === "general" && <GeneralSettings />}
                </main>
            </DialogContent>
        </Dialog>
    )
}
