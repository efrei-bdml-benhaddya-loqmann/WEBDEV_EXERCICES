import { Button } from "@openai/apps-sdk-ui/components/Button"
import {
    ItemGroup,
    Item,
    ItemContent,
    ItemTitle,
    ItemActions
} from "@/components/ui/Item"
import { DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { useAppContext } from "@/contexts/AppContext"
import { exportHistoryToJSON } from "@/features/settings/actions/exportHistory"
import { getHistory } from "@/services/api"

export function DataManagementSettings() {
    const { handleClearHistory } = useAppContext()

    const handleExport = async () => {
        console.log("Exporting history...")
        const history = await getHistory()
        const fn = exportHistoryToJSON(history)
        console.log("History exported successfully to ", fn)
    }

    const handleDeleteAll = () => {
        console.log("Deleting all analyzes...")
        handleClearHistory()
        console.log("All analyzes deleted successfully")
    }

    return (
        <div className="space-y-0">
            <DialogHeader>
                <DialogTitle>Data Management</DialogTitle>
            </DialogHeader>
            <ItemGroup label="Chat History">
                <Item>
                    <ItemContent>
                        <ItemTitle>Export Analyzes</ItemTitle>
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

                <Item separator={false}>
                    <ItemContent>
                        <ItemTitle>Delete All Chats</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant="outline"
                            color="danger"
                            size="sm"
                            pill
                            onClick={() => handleDeleteAll()}
                        >
                            Delete All
                        </Button>
                    </ItemActions>
                </Item>
            </ItemGroup>
        </div>
    )
}
