import { useState } from "react"
import { Button } from "@openai/apps-sdk-ui/components/Button"
import { Input } from "@openai/apps-sdk-ui/components/Input"
import { Popover, usePopoverController } from "@openai/apps-sdk-ui/components/Popover"
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemGroup } from "../ui/Item"

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
    // Fallback values — replace with a real user hook if available
    const displayName = "Sam Smith"
    const email = "sam.smith@gmail.com"

    const [fullName, setFullName] = useState(displayName)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async (closePopover: () => void) => {
        if (!fullName.trim()) return
        setIsSaving(true)
        try {
            await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ displayName: fullName }),
            })
            closePopover()
        } catch (err) {
            console.error("Failed to update profile:", err)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <ItemGroup>
            {/* Full Name Row */}
            <Item>
                <ItemContent>
                    <ItemTitle>Full Name</ItemTitle>
                </ItemContent>
                <ItemActions>
                    <ItemDescription className="max-w-[180px] truncate">
                        {displayName}
                    </ItemDescription>
                    <Popover>
                        <Popover.Trigger>
                            <Button variant="outline" color="secondary" size="sm" pill>
                                Edit
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content side="bottom" align="end" width={320} translucent={false}>
                            <EditNamePopoverContent
                                displayName={displayName}
                                fullName={fullName}
                                setFullName={setFullName}
                                isSaving={isSaving}
                                onSave={handleSave}
                            />
                        </Popover.Content>
                    </Popover>
                </ItemActions>
            </Item>

            {/* Email Row — no border on last item */}
            <Item className="!border-b-0">
                <ItemContent>
                    <ItemTitle>Email</ItemTitle>
                </ItemContent>
                <ItemActions>
                    <ItemDescription className="max-w-[200px] truncate">
                        {email}
                    </ItemDescription>
                </ItemActions>
            </Item>
        </ItemGroup>
    )
}
