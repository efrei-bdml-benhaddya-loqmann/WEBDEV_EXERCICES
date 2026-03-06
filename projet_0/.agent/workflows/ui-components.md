---
description: List available OpenAI UI SDK components and import patterns
---

1. View the list of allowed components in `.agent/rules/rules.md`.
2. Ensure any new UI development uses ONLY the components listed there.
3. Import components using the direct subpath pattern: `import { Component } from '@openai/apps-sdk-ui/components/Component'`.