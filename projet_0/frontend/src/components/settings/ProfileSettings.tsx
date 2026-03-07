import { useState } from "react"
import { Button } from "@openai/apps-sdk-ui/components/Button"
import { Input } from "@openai/apps-sdk-ui/components/Input"
import { Popover, usePopoverController } from "@openai/apps-sdk-ui/components/Popover"
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup } from "../ui/Item"
import { useAuth } from "@/contexts/AuthContext"
import { SettingsHeader } from "./SettingsHeader"

// ─── Edit Name Popover Inner (uses usePopoverController) ────────────────────

function EditNamePopoverContent({
    displayName,
    fullName,
    setFullName,
    isSaving,
    onSave,
}: {
    displayName: string
    fullName: string
    setFullName: (v: string) => void
    isSaving: boolean
    onSave: (close: () => void) => void
}) {
    const { close } = usePopoverController()

    return (
        <div className="p-4 space-y-4">
            <div className="space-y-2">
                <label htmlFor="fullname" className="text-sm font-medium block">
                    Full Name
                </label>
                <Input
                    id="fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    size="md"
                />
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    variant="ghost"
                    color="secondary"
                    size="sm"
                    onClick={() => {
                        setFullName(displayName)
                        close()
                    }}
                    disabled={isSaving}
                >
                    Cancel
                </Button>
                <Button
                    variant="solid"
                    color="primary"
                    size="sm"
                    pill
                    loading={isSaving}
                    onClick={() => onSave(close)}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

// ─── Profile Settings ─────────────────────────────────────────────────────────

export function ProfileSettings() {
    const { user, signOut } = useAuth()
    const email = user?.email


    return (
        <>
            <SettingsHeader title={"Profile"} />
            <ItemGroup>
                <Item>
                    <ItemContent>
                        <ItemTitle>Email</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <ItemDescription className="max-w-[200px] truncate">
                            {email}
                        </ItemDescription>
                    </ItemActions>
                </Item>
                <Item variant="destructive" separator={false} >
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
