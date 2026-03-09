import { User, DataControls, Settings } from "@openai/apps-sdk-ui/components/Icon"

export type SettingsSection = "general" | "profile" | "notifications" | "data" | "security"

export const settingsSections: { id: SettingsSection; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "general", label: "General", Icon: Settings },
    { id: "profile", label: "Profile", Icon: User },
    { id: "data", label: "Data management", Icon: DataControls },

]// ─── Types ────────────────────────────────────────────────────────────────────
export interface SettingsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialSection?: SettingsSection
}

