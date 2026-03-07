import { Alert } from "@openai/apps-sdk-ui/components/Alert"
import { SettingsHeader } from "./SettingsHeader"

export function NotificationSettings() {
    return (
        <>
            <SettingsHeader title="Notification" />
            <Alert
                color="info"
                variant="soft"
                description="Notification settings are not currently implemented. This feature will be available in a future update."
                className="m-6"
            />
        </>
    )
}
