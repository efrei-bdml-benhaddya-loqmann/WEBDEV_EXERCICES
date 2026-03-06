import { useState } from "react"
import { Button } from "@openai/apps-sdk-ui/components/Button"
import { Menu } from "@openai/apps-sdk-ui/components/Menu"
import { SettingsDialog } from "../settings/SettingsDialog"

export function SidebarMenu() {
    const [settingsOpen, setSettingsOpen] = useState(false)

    return (
        <>
            <Menu>
                <Menu.Trigger>
                    <Button color="primary" size="lg" variant="ghost" block gutterSize="2xs" pill={false}>
                        Open settings
                    </Button>
                </Menu.Trigger>
                <Menu.Content side="top" width={210}>
                    <div id="sidebar-popover-marker" className="hidden" />
                    <Menu.Item>
                        <p className="font-semibold">Sam Smith</p>
                        <p className="text-secondary">sam.smith@gmail.com</p>
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item onSelect={() => setSettingsOpen(true)}>
                        Settings
                    </Menu.Item>
                    {/* <Menu.Link href="https://openai.com/policies/">Terms &amp; policies</Menu.Link> */}
                    <Menu.Separator />
                    <Menu.Item onSelect={() => { }}>Logout</Menu.Item>
                </Menu.Content>
            </Menu >

            <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
        </>
    )
}