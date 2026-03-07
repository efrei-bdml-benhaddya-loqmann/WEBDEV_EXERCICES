import { Button } from "@openai/apps-sdk-ui/components/Button"
import { X } from "@openai/apps-sdk-ui/components/Icon"
import type { SettingsSection } from "../types/settings.types"
import { settingsSections } from "../types/settings.types"

interface SettingsSidebarProps {
    activeSection: SettingsSection
    setActiveSection: (section: SettingsSection) => void
    onClose: () => void
}

export function SettingsSidebar({ activeSection, setActiveSection, onClose }: SettingsSidebarProps) {
    return (
        <aside
            className="hidden sm:flex flex-col shrink-0 border-r"
            style={{
                width: 191,
                background: "var(--surface-secondary, #f9f9f9)",
                borderColor: "var(--border-default, #e5e5e5)",
            }}
        >
            {/* Close button row */}
            <div className="flex items-center px-5 py-4">
                <Button
                    variant="ghost"
                    color="secondary"
                    size="md"
                    onClick={onClose}
                    aria-label="Close settings"
                    pill={false}
                    uniform
                >
                    <X />
                </Button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-3 pb-3">
                <div className="flex flex-col gap-0.5">
                    {settingsSections.map(({ id, label, Icon }) => {
                        const isActive = activeSection === id
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveSection(id)}
                                className={[
                                    "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors text-left",
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
                </div>
            </nav>
        </aside>
    )
}
