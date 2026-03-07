import { Button } from '@openai/apps-sdk-ui/components/Button'
import { LightMode, DarkMode } from "@openai/apps-sdk-ui/components/Icon"
import { useDocumentTheme, applyDocumentTheme } from '@openai/apps-sdk-ui/theme'

export function ThemeToggle() {
    const theme = useDocumentTheme()

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        applyDocumentTheme(newTheme)
    }

    return (
        <Button
            color="secondary"
            size="lg"
            uniform
            variant="ghost"
            onClick={toggleTheme}
            className="text-secondary hover:bg-surface-tertiary"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <LightMode /> : <DarkMode />}
        </Button>
    )
}
