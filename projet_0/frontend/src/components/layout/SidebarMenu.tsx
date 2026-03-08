import { useState } from "react"
import { Button } from "@openai/apps-sdk-ui/components/Button"
import { Menu } from "@openai/apps-sdk-ui/components/Menu"
import { Avatar } from "@openai/apps-sdk-ui/components/Avatar";
import { SettingsDialog } from "../../features/settings/components/SettingsDialog"
import { useAuth } from "../../contexts/AuthContext"
import { Logout, Settings } from "@openai/apps-sdk-ui/components/Icon";
import type { SettingsSection } from "../../features/settings/types/settings.types"

export function SidebarMenu() {
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [settingsSection, setSettingsSection] = useState<SettingsSection>("profile")
    const { user, signOut } = useAuth()

    const openSettings = (section: SettingsSection) => {
        setSettingsSection(section)
        setSettingsOpen(true)
    }

    return (
        <>
            <Menu>
                <Menu.Trigger>
                    <Button
                        color="primary"
                        size="xl"
                        variant="ghost"
                        block
                        gutterSize="lg"
                        pill={false}
                    >
                        <div className="flex items-center justify-start gap-3 w-full">

                            <Avatar
                                color="discovery"
                                name={user?.user_metadata.display_name || user?.email?.split('@')[0] || 'User'}
                                size={32}
                            />
                            <span>{user?.user_metadata.display_name || user?.email || 'User'}</span>
                        </div>
                    </Button>
                </Menu.Trigger>
                <Menu.Content side="top">
                    <div id="sidebar-popover-marker" className="hidden" />
                    <Menu.Item onSelect={() => openSettings("profile")} className="py-2 px-3">
                        <div className="flex items-center justify-start gap-3 w-full">
                            <Avatar
                                color="discovery"
                                name={user?.user_metadata.display_name || user?.email?.split('@')[0] || 'User'}
                                size={26}
                            />
                            <div className="text-left w-full overflow-hidden">
                                <p className="truncate text-sm font-medium">{user?.user_metadata.display_name || user?.email?.split('@')[0] || 'User'}</p>
                                <p className="text-secondary text-xs truncate">{user?.email}</p>
                            </div>
                        </div>
                    </Menu.Item>

                    <Menu.Separator className="mx-2" />
                    <Menu.Item onSelect={() => openSettings("general")}>
                        <Settings height={16} width={16} /> Settings
                    </Menu.Item>
                    {/* <Menu.Link href="https://openai.com/policies/">Terms &amp; policies</Menu.Link> */}
                    <Menu.Separator className="mx-2" />
                    <Menu.Item onSelect={signOut}>
                        <Logout height={16} width={16} /> Logout
                    </Menu.Item>
                </Menu.Content>
            </Menu >

            <SettingsDialog
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
                initialSection={settingsSection}
            />

        </>
    )
}