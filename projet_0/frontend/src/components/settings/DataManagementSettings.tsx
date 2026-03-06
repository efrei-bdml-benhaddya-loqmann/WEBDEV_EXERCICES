import React from "react"
import { Button } from "@openai/apps-sdk-ui/components/Button"
import {
    ItemGroup,
    Item,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions
} from "../ui/Item"

export function DataManagementSettings() {
    const handleExport = () => {
        console.log("Exporting chats...")
        // Implementation for exporting chats
    }

    const handleDeleteAll = () => {
        if (confirm("Are you sure you want to delete all chats? This action cannot be undone.")) {
            console.log("Deleting all chats...")
            // Implementation for deleting all chats
        }
    }

    return (
        <div className="space-y-0">
            <ItemGroup label="Chat History">
                <Item>
                    <ItemContent>
                        <ItemTitle>Export Chats</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant="outline"
                            color="secondary"
                            size="sm"
                            pill
                            onClick={handleExport}
                        >
                            Export
                        </Button>
                    </ItemActions>
                </Item>

                <Item>
                    <ItemContent>
                        <ItemTitle>Delete All Chats</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant="outline"
                            color="danger"
                            size="sm"
                            pill
                            onClick={handleDeleteAll}
                        >
                            Delete All
                        </Button>
                    </ItemActions>
                </Item>
            </ItemGroup>

            <ItemGroup>
                <Item>
                    <ItemContent>
                        <ItemTitle>Clear Cache</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant="outline"
                            color="secondary"
                            size="sm"
                            pill
                        >
                            Clear
                        </Button>
                    </ItemActions>
                </Item>
            </ItemGroup>
        </div>
    )
}
