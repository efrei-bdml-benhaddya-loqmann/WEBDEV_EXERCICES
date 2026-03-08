import { Select } from "@openai/apps-sdk-ui/components/Select"
import { useSelectedTheme, setTheme, type Theme } from "@/store/useThemeStore"

const THEME_OPTIONS = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" }
]

export function Theme() {
    const selectedTheme = useSelectedTheme()

    return (
        <Select
            variant="ghost"
            size="lg"
            pill={false}
            value={selectedTheme}
            onChange={(option) => setTheme(option.value as Theme)}
            options={THEME_OPTIONS}
            triggerClassName="max-w-[170px]"
            listMaxWidth={170}
            OptionView={(option) => (
                <>
                    {option.value === THEME_OPTIONS[0].value && <div id="dialog-popover-marker" className="hidden" />}
                    {option.label}
                </>
            )}
        />
    )
}
