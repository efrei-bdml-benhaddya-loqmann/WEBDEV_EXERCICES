# Antigravity Agent Rules - OpenAI UI SDK

This document defines the allowed UI components and usage patterns for the OpenAI UI SDK used in this project.

## Allowed Components
The following components are available in `@openai/apps-sdk-ui`:

| Component | Description |
|-----------|-------------|
| `Alert` | Feedback messages |
| `AppsSDKUIProvider` | Root provider for the SDK |
| `Avatar` | User profile images |
| `Badge` | Status indicators and labels |
| `Button` | Standard and link buttons |
| `Checkbox` | Boolean input |
| `CodeBlock` | Syntax highlighted code |
| `DatePicker` | Single date selection |
| `DateRangePicker` | Date range selection |
| `EmptyMessage` | Placeholder for empty states |
| `Icon` | SVG icons |
| `Image` | Optimized images |
| `Indicator` | Small status dots |
| `Input` | Single-line text input |
| `Markdown` | Markdown rendering |
| `Menu` | Dropdown menus |
| `Popover` | Floating overlays |
| `RadioGroup` | Exclusive selection |
| `SegmentedControl` | Toggle between options |
| `Select` | Dropdown selection |
| `SelectControl` | Form-integrated selection |
| `ShimmerText` | Loading placeholder text |
| `Slider` | Range selection |
| `Switch` | Toggle switch |
| `TagInput` | Multiple tag selection |
| `TextLink` | Inline links |
| `Textarea` | Multi-line text input |
| `Tooltip` | Hover information |
| `Transition` | Animation wrapper |

## Import Guidelines
Always import components from their specific subpaths to ensure optimal bundle sizes:

```typescript
import { ComponentName } from '@openai/apps-sdk-ui/components/ComponentName'
```

## Styling Notes
- Use Tailwind CSS 4 for layout and additional styling.
- Rely on SDK props (`color`, `variant`, `size`) for core component styling.
- Standard color palettes: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `discovery`, `caution`.
- Standard variants: `solid`, `soft`, `outline`, `ghost`.
