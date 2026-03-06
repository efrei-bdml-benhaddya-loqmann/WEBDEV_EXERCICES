import React from "react"
import { Button } from "@openai/apps-sdk-ui/components/Button"

export function SecuritySettings() {
    const handleLogout = async () => {
        const response = await fetch("/api/auth/logout", { method: "POST" })
        if (response.ok) {
            window.location.href = "/login"
        }
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between py-4">
                <span className="text-sm font-medium">Logout</span>
                <Button
                    variant="outline"
                    color="secondary"
                    size="sm"
                    pill
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}
