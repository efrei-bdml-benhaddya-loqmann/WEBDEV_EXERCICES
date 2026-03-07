import { Item, ItemContent } from "../../../components/ui/Item"

interface SettingsHeaderProps {
    title: string
}

export const SettingsHeader = (props: SettingsHeaderProps) => {
    const title = props.title
    return (
        <Item>
            <ItemContent>
                <p className="text-lg">
                    {title}
                </p>
            </ItemContent>
        </Item>
    )
}