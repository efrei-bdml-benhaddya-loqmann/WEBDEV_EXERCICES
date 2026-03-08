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
        <>
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

            {/* Nav items — vertical list on desktop, horizontal scroll on mobile */}
            <nav className="flex-1 overflow-y-auto sm:flex-col px-3 pb-3 flex overflow-x-auto gap-0.5 sm:gap-0.5 no-scrollbar">
                {settingsSections.map(({ id, label, Icon }) => {
                    const isActive = activeSection === id
                    return (
                        <>
                            <Button
                                key={id}
                                onClick={() => setActiveSection(id)}
                                color="secondary"
                                variant={isActive ? "soft" : "ghost"}
                                pill={false}
                            >
                                <div className="flex items-center justify-start gap-3 w-full">
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span>{label}</span>
                                </div>
                            </Button>
                        </>
                    )
                })}
            </nav>
        </>
    )
}
