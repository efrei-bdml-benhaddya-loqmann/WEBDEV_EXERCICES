import { Button } from "@openai/apps-sdk-ui/components/Button"
import { Item, ItemContent, ItemTitle, ItemActions, ItemGroup } from "@/components/ui/Item"
import { useAuth } from "@/contexts/AuthContext"
import { DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { updateUserName } from "@/services/supabase"
import { useState } from "react"
import { Input } from "@openai/apps-sdk-ui/components/Input"
import { Check, X } from "@openai/apps-sdk-ui/components/Icon"

export function ProfileSettings() {
    const { user, signOut } = useAuth()
    const email = user?.email
    const displayName = user?.user_metadata.display_name as string | undefined

    const handleUpdateUserName = async (name: string) => {
        try {
            await updateUserName(name)
        } catch (error) {
            console.error('Error updating user name:', error)
        }
    }

    const EditableTextField = ({ value = "" }: { value?: string }) => {
        const [isEditing, setIsEditing] = useState(false)
        const [text, setText] = useState(value)

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                onSave()
            } else if (e.key === 'Escape') {
                onCancel()
            }
        }

        const onSave = () => {
            handleUpdateUserName(text || '')
            setIsEditing(false)
        }

        const onCancel = () => {
            setIsEditing(false)
            setText(value)
        }

        const EmptyState = () => {
            return (
                <Button
                    color="primary"
                    variant="outline"
                    pill
                    onClick={() => setIsEditing(true)}
                >Set value</Button>
            )
        }

        return isEditing ? (
            <form>
                <div className="flex flex-row items-center gap-2 w-full max-w-2xl">

                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        variant="soft"
                        size="lg"
                        gutterSize="sm"
                        autoFocus
                        placeholder="Edit text..."
                        maxLength={18}
                        minLength={3}
                        style={{ maxWidth: "150px" }}
                    />

                    <Button
                        color="primary"
                        variant="solid"
                        pill
                        onClick={onSave}
                        disabled={text == value || text?.length < 3 || text?.length > 18}
                    >
                        <span className="sm:hidden"><Check /></span>
                        <span className="hidden sm:block">Save</span>
                    </Button>
                    <Button
                        color="primary" variant="soft" pill onClick={onCancel}>
                        <span className="sm:hidden"><X /></span>
                        <span className="hidden sm:block">Cancel</span>
                    </Button>
                </div>
            </form>
        ) : (
            value && value.length != 0 ? (

                <div
                    className="text-sm text-[var(--text-secondary)] max-w-[200px] truncate cursor-pointer"
                    onClick={() => setIsEditing(true)}
                >
                    {value}
                </div>
            )
                :
                <EmptyState />
        )

    }

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
                <Item>
                    <ItemContent>
                        <ItemTitle>Display Name</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <EditableTextField value={displayName} />
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
