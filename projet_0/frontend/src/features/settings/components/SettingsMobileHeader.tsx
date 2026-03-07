import { Button } from "@openai/apps-sdk-ui/components/Button"
import { X } from "@openai/apps-sdk-ui/components/Icon"
import type { SettingsSection } from "../types/settings.types"
import { settingsSections } from "../types/settings.types"

interface SettingsMobileHeaderProps {
    activeSection: SettingsSection
    setActiveSection: (section: SettingsSection) => void
    onClose: () => void
}

export function SettingsMobileHeader({ activeSection, setActiveSection, onClose }: SettingsMobileHeaderProps) {
    return (
        <div
            className="flex sm:hidden flex-col border-b shrink-0"
            style={{
                background: "var(--surface-secondary, #f9f9f9)",
                borderColor: "var(--border-default, #e5e5e5)"
            }}
        >
            <div className="flex items-center justify-between px-4 py-3">
                <p className="text-lg">Settings</p>
                <Button
                    variant="ghost"
                    color="secondary"
                    size="sm"
                    onClick={onClose}
                    aria-label="Close settings"
                >
                    <X />
                </Button>
            </div>
            <nav className="flex overflow-x-auto px-3 pb-3 gap-1 no-scrollbar">
                {settingsSections.map(({ id, label, Icon }) => {
                    const isActive = activeSection === id
                    return (
                        <button
                            key={id}
                            onClick={() => setActiveSection(id)}
                            className={[
                                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                                isActive
                                    ? "bg-[var(--surface-tertiary,#efefef)] text-[var(--text-primary,#111)]"
                                    : "text-[var(--text-secondary,#555)] hover:bg-[var(--surface-tertiary,#efefef)]/60",
                            ].join(" ")}
                        >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{label}</span>
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}
