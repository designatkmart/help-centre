# Hook Cursor up to the Kmart Design System

Use this checklist whenever you (or another agent) need to pull components and tokens from Figma for Kmart work.

## 1. Figma MCP

- **Remote Figma plugin** (`plugin-figma-figma`): authenticate in Cursor if prompted. Works with file URLs + `fileKey` / `nodeId`.
- **Figma Desktop MCP**: keep the Help Centre (or DS library) file open as the **active tab** in Figma Desktop when using selection-based tools.

## 2. Enable libraries in the file

In Figma → Assets → Libraries, enable:

- **1 - Kmart Library** (primary)
- **0 - Base Colours** (if colours resolve from there)

The Help Centre file already instances DS components (`Breadcrumb`, `Button Unique`, `Joy`, icons).

Library key used by `search_design_system`:

```
lk-e745bc06077e065a685ed0f448c905c10e8fb3e0e8fceefa4fff239fec0b702daf2426b12a18a73388264995626b626d5aabbc8aff3d86f2b86ad65f6c1043c7
```

## 3. Point the agent at the right assets

- Paste **node-specific** Figma URLs (`?node-id=…`).
- Say “use **1 - Kmart Library**” so searches stay scoped.
- Share the DS library file URL if work should start from components/tokens rather than a product screen.

## 4. Code Connect (optional, stronger binding)

This Help Centre file currently has **no Code Connect mappings**. When Kosmos components stabilize:

1. Publish components to the team library.
2. Map Figma nodes → Kosmos code paths (Code Connect / `.figma.ts`).
3. Re-run `get_design_context` — it will return real component snippets instead of raw layout code.

## 5. Kosmos Storybook vs Figma

- Storybook: https://kmartau.github.io/kosmos-ds
- When Storybook and Figma disagree for this prototype, **follow Figma**.
- If you later grant npm access to the private Kosmos package, swap local primitives for real imports.

## 6. Session hygiene

- Open the correct page/frame in Desktop before asking for design context.
- Tell the agent when libraries update so tokens can be re-pulled.
- Asset URLs from MCP expire (~7 days); downloaded files in `src/assets/` are the lasting copies.
