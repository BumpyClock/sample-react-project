---
mode: agent
description: Use Figma to generate code for a component that mimics the design selected in Figma.
---

Generate code for the component requested by the user in {user_request}.

# Task: Use Figma MCP to generate code


**IMPORTANT** AVOID using the `get_code` tool. YOU MUST write all the code yourself.
**IMPORTANT** Use the `get_image` and `get_variable_defs` tool to get the image and design tokens from Figma.

- Get the image and Design tokens from Figma. 
- Look for existing design tokens and components that you can re-use before creating new ones. Always use existing design tokens and components whenever possible.
  - If you add some specific designs, or build a one off component include it in the summary of changes you provide to the user.
  - DO NOT CHANGE ANY EXISTING COMPONENTS OR STYLES without explicit permission and confirmation from the user. IF you need to make changes, stop and confirm with the user before proceeding.
  - components are typically saved in `src/components/`
  - Reusable component primitives are saved in `src/components/ui/` or other variations like that.
  - Design tokens are saved in `src/styles/tokens/` or `src/design-system` or other variations like that.
- Always let the user know and summarize the changes you make.
- Always verify your implementation using the Playwright MCP and refine and iterate.

# Workflow

## 1. Design Analysis & Data Extraction

- Use the Figma MCP to get design details of the selected node
- Extract relevant information such as layout, colors, typography, and spacing to understand the component's structure and styles
- Use the `get_variable_defs` tool to get the design tokens and variables used in the component
- Use the `get_image` tool to get the image of the component

## 2. Style System Integration

- Check if the relevant styles are already defined in the component's styles file. If they are, use those styles directly in the component code
- Check if the relevant styles are already defined in the shared styles file or the design-system. If they are, use those styles directly in the component code
- Avoid creating new styles if they already exist in the component's styles file or the shared styles file
- Avoid hardcoding values that should be derived from design tokens or variables
- Use the existing design tokens and variables for colors, typography, and spacing to ensure consistency across the application

## 3. Code Generation

- Use the extracted design tokens, variables, and image to generate the component code
- Generated code should match the structure and styles of the component in the Figma design. DO NOT deviate from the design
- Ensure that the generated code is clean, well-structured, and follows the coding guidelines detailed in writing-code.instructions.md & typescript.instructions.md
- IF using the get_code tool from Figma MCP, pass the typescript and writing-code instructions in the prompt along with other relevant project context
- Use the code generated from the get_code as a reference. Always write the end result code yourself

## 4. Component Updates (if applicable)

- If it's an existing component that needs updates, use the Playwright-MCP to first take an image to get a visual reference of the current state of the component
- Compare it with the Figma design to identify discrepancies

## 5. Testing & Validation

- Use the Playwright MCP to test the component in the browser
- Ensure that the component behaves as expected and matches the design in Figma
- If the component does not behave as expected, use the Playwright MCP to debug the issues and fix them in the code
- Unless asked otherwise test the designs at 1080p resolution
- Close the browser when you're done testing the component

## 6. Environment & Setup

- Assume that the user is already running the project locally and has the necessary environment set up for testing the component
- If the user is not running the project locally, then ask them for permission to run it and run it yourself
- Ask the user to provide the URL of the local development environment where the component can be tested, if you can't figure it out yourself from the project context

## 7. Review & Feedback

- Ask the user to review the component and provide feedback
- If the user requests changes, use the changes tool to make the necessary modifications

## Figma Dev Mode MCP Rules
Use the Figma Dev mode MCP server to get accurate designs and assets for your components. This server provides a way to access design tokens, components, and assets directly from Figma, ensuring that your implementations are consistent with the design system. When the user asks you to implement a component, ask them if they have the design in Figma and if they can provide the Figma Dev Mode MCP server URL. If they do, use that server to get the design tokens, components, and assets for the implementation.

- IMPORTANT: Always use components from `src/components/ui` when possible
- Prioritize Figma fidelity to match designs exactly
- Avoid hardcoded values, use design tokens from Figma where available
- Follow WCAG requirements for accessibility
- Add component documentation
- Place UI components in `src/components/`; avoid inline styles unless truly necessary

- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- IMPORTANT: If the Figma Dev Mode MCP Server returns a localhost source for an image or an SVG, use that image or SVG source directly
- IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
- IMPORTANT: do NOT use or create placeholders if a localhost source is provided

## Playwright MCP Rules
  - The Playwright MCP Server provides a `playwright-mcp` server which can be used to check your implementation.
  - IMPORTANT: Ask the user if the the server is running before using it
  - IMPORTANT: Use the `playwright-mcp` server for all Playwright related tasks
  - IMPORTANT: Do not use the `playwright` package directly, use the `playwright-mcp` server instead
  

