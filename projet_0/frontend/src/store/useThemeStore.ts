import { applyDocumentTheme } from "@openai/apps-sdk-ui/theme"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type Theme = "light" | "dark" | "system"
type ThemeState = {
    theme: Theme
}

const INITIAL_STATE: ThemeState = {
    theme: "system",
}

const store = create<ThemeState>()(
    persist(() => INITIAL_STATE, {
        name: "oai:user:theme",
        storage: createJSONStorage(() => localStorage),
    }),
)

// Apply when store is created / updated
store.subscribe((state) => applyDocumentTheme(resolveTheme(state.theme)))

// Apply when system theme changes
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => applyDocumentTheme(resolveTheme(store.getState().theme)))

function getSystemTheme(): "light" | "dark" {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTheme(theme?: Theme): "light" | "dark" {
    if (theme == null || theme === "system") {
        return getSystemTheme()
    }

    return theme
}

export function setTheme(theme: Theme) {
    store.setState({ theme })
}

export function useSelectedTheme() {
    return store((state) => state.theme)
}

export function useCurrentTheme() {
    return store((state) => resolveTheme(state.theme))
}

// Ensure theme is applied on initial load
applyDocumentTheme(resolveTheme(store.getState().theme))
