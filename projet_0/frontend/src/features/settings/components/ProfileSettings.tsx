import { Button } from "@openai/apps-sdk-ui/components/Button"
import { Item, ItemContent, ItemTitle, ItemActions, ItemGroup } from "../../../components/ui/Item"
import { useAuth } from "../../../contexts/AuthContext"
import { DialogHeader, DialogTitle } from "@/components/ui/Dialog"

export function ProfileSettings() {
    const { user, signOut } = useAuth()
    const email = user?.email

    return (
        <>
            <DialogHeader>
                <DialogTitle>Profile</DialogTitle>
            </DialogHeader>
            <ItemGroup>
                <Item>
                    <ItemContent>
                        <ItemTitle>Email</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <div className="text-sm text-[var(--text-secondary)] max-w-[200px] truncate">
                            {email}
                        </div>
                    </ItemActions>
                </Item>
                <Item variant="destructive" separator={false}>
                    <ItemContent>
                        <ItemTitle>Logout from this device</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant="outline"
                            color="secondary"
                            size="sm"
                            pill
                            onClick={signOut}
                        >
                            Logout
                        </Button>
                    </ItemActions>
                </Item>
            </ItemGroup>
        </>
    )
}
