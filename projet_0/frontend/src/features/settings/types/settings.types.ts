import { User, DataControls } from "@openai/apps-sdk-ui/components/Icon"

export type SettingsSection = "profile" | "notifications" | "data" | "security"

export const settingsSections: { id: SettingsSection; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "profile", label: "Profile", Icon: User },
    // { id: "notifications", label: "Notifications", Icon: Bell },
    { id: "data", label: "Data management", Icon: DataControls },
    // { id: "security", label: "Security", Icon: ShieldCheck },
]
