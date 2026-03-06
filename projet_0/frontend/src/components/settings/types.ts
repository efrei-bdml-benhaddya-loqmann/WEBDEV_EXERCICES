import { User, Bell, ShieldCheck } from "@openai/apps-sdk-ui/components/Icon"

export type SettingsSection = "profile" | "notifications" | "security"

export const settingsSections: { id: SettingsSection; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "profile", label: "Profile", Icon: User },
    { id: "notifications", label: "Notifications", Icon: Bell },
    { id: "security", label: "Security", Icon: ShieldCheck },
]
