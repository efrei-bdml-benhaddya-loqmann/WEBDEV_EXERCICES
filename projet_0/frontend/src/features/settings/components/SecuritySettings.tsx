import { Button } from "@openai/apps-sdk-ui/components/Button"
import { Item, ItemContent, ItemTitle, ItemActions, ItemGroup } from "../../../components/ui/Item"
import { SettingsHeader } from "./SettingsHeader"

export function SecuritySettings() {
    const handleLogout = async () => {
        const response = await fetch("/api/auth/logout", { method: "POST" })
        if (response.ok) {
            window.location.href = "/login"
        }
    }

    return (
        <>
            <SettingsHeader title="Security" />
            <ItemGroup>
                <Item variant="destructive" separator={false}>
                    <ItemContent>
                        <ItemTitle>Logout</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant="outline"
                            color="secondary"
                            size="sm"
                            pill
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </ItemActions>
                </Item>
            </ItemGroup>
        </>
    )
}

