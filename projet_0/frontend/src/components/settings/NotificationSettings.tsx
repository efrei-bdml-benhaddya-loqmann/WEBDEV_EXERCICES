import React from "react"
import { Alert } from "@openai/apps-sdk-ui/components/Alert"

export function NotificationSettings() {
    return (
        <div className="p-6">
            <Alert
                color="info"
                variant="soft"
                description="Notification settings are not currently implemented. This feature will be available in a future update."
            />
        </div>
    )
}
