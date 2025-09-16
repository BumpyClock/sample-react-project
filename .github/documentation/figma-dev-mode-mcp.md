# Figma Dev Mode MCP Server

The Figma Dev Mode MCP server provides seamless integration between Figma designs and code implementation, enabling accurate design-to-code workflows with design tokens, components, and assets.

## Overview

The Figma Dev Mode MCP server allows developers to:
- Access design tokens directly from Figma
- Extract components and their specifications
- Download assets (images, SVGs, icons) automatically
- Maintain design system consistency
- Ensure pixel-perfect implementations

# Tools and Features

## `get_code`
Use this tool to generate code for your Figma selection using the MCP server. The default output is React + Tailwind, but you can customize this through your prompts:

- **Change the framework:**
  - "Generate my Figma selection in Vue."
  - "Generate my Figma selection in plain HTML + CSS."
  - "Generate my Figma selection in iOS."
- **Use your components:**
  - "Generate my Figma selection using components from src/components/ui"
  - "Generate my Figma selection using components from src/ui and style with Tailwind"

You can paste links or select the frame or component in Figma before prompting.


## `get_variable_defs`
Returns variables and styles used in your selection—like colors, spacing, and typography.

- **List all tokens used:**
  - "Get the variables used in my Figma selection."
- **Focus on a specific type:**
  - "What color and spacing variables are used in my Figma selection?"
- **Get both names and values:**
  - "List the variable names and their values used in my Figma selection."

---

## `get_code_connect_map`
Retrieves a mapping between Figma node IDs and their corresponding code components in your codebase. Each key is a Figma node ID, and the value contains:

- `codeConnectSrc`: The location of the component in your codebase (e.g., a file path or URL).
- `codeConnectName`: The name of the component in your codebase.

This mapping connects Figma design elements directly to their React (or other framework) implementations, enabling seamless design-to-code workflows and ensuring the correct components are used for each part of the design.

If a Figma node is connected to a code component, this function helps you identify and use the exact component in your project.

---

## `get_image`
To use this tool, go to **Preferences > Dev Mode MCP Server Settings > Enable tool get_image**.

This takes a screenshot of your selection to preserve layout fidelity. Keep this on unless you’re managing token limits.

## Resources

- [Figma Dev Mode Documentation](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)
- [Design Token Best Practices](https://designtokens.org/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Component Design Patterns](../prompts/docs/typescript.md)

---

For questions or issues with Figma Dev Mode MCP integration, refer to the main [TypeScript instructions](../typescript.instructions.md) or reach out to [Aditya Sharma](mailto:aditya.sharma@microsoft.com).
