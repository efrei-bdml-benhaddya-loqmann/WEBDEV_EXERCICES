import { User, DataControls, Settings, Key } from "@openai/apps-sdk-ui/components/Icon"

export type SettingsSection = "general" | "profile" | "notifications" | "data" | "security" | "integrations"

export const settingsSections: { id: SettingsSection; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "general", label: "General", Icon: Settings },
    { id: "profile", label: "Profile", Icon: User },
    { id: "data", label: "Data management", Icon: DataControls },
    { id: "integrations", label: "Integrations", Icon: Key },
]

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SettingsDialogProps {

    open: boolean
    onOpenChange: (open: boolean) => void
    initialSection?: SettingsSection
}

