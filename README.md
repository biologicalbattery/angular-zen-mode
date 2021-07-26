# Angular Zen Mode

Angular Zen Mode is an extension that allows angular developers to streamline their developer experience when programming in angular-specific files (component code/template/style).

## Features

- ### Angular Zen Mode

Use the command `angular-zen-mode.activateAngularZen` (default shortcut `alt+z alt+z`) to activate the Angular Zen Mode.

When this command is run and an angular component file (code/template/style) is currently active in an editor, then the extension will open up two more editor groups with the other two associated component files in them, it will also close all other editor groups except the active group.

The default configuration for the editor groups is one group is created to the right of the active editor group, and then another is created beneath the first newly created group. This is the ideal configuration for one screen with limited space.

However the extension can be configured to open the third editor group in a column to the right of the second group, which is ideal for larger screens.

By default it will also close the sidebar but can be configured to toggle VS Code's built zen mode instead.

Can be configured to also zoom out when entering zen mode.

- ### Quickly Switch Component Files

When in zen mode, it is very easy to switch between files by simply using the mouse to place the cursor in the file you want to edit, however you can also use commands that the extension provides to streamline this switching process to automatically move the required file into the main editor.

Use the following commands to quickly switch the main editor, one with most space in default configuration, to a specific type of angular component file. These commands only work when the workspace is in Angular Zen Mode, which is three editor groups open with the active editor in each group displaying one of the angular component files.

| Angular Component File                 | Command                              | Shortcut      |
| -------------------------------------- | ------------------------------------ | ------------- |
| Code (`.ts`)                           | `angular-zen-mode.switchToComponent` | `alt+z alt+m` |
| Template(`.html`)                      | `angular-zen-mode.switchToTemplate`  | `alt+z alt+k` |
| Style (`.css`/`.scss`/`.sass`/`.less`) | `angular-zen-mode.switchToStyle`     | `alt+z alt+o` |

You can also use the `angular-zen-mode.nextEditor` and `angular-zen-mode.previousEditor` commands to cycle through the editors, with shortcuts `alt+z alt+l` and `alt+z alt+p` respectively.

- ### Automatically Open All Component Files

This feature is disabled by default. Set `angular-zen-mode.WatchMode` to `true` to enable it.

When the workspace is in Angular Zen Mode, which is three editor groups open with the active editor in each group displaying one of the angular component files, this feature will automatically detect whenever an Angular component file (code/template/style) is opened in the first editor group, and will then open and display the other associated component files in the other editor groups.

This feature is useful when programming in all component files of many components in one session.

## Extension Settings

This extension contributes the following settings:

- `angular-zen-mode.StyleFormats`: An array of file extensions which angular-zen-mode should search to find a style file for the specific component. Defaults to `['.css','.scss','.sass','.less']`.
- `angular-zen-mode.TemplateFormats`: An array of file extensions which angular-zen-mode should search to find a template file for the specific component. Defaults to `['.html']`.
- `angular-zen-mode.ThirdFileBelow`: A boolean that determines whether to open the third file (code/template/style) in an editor group below the second file. If false, then the third file will be opened in a column to the side instead of underneath. Defaults to `true`
- `angular-zen-mode.UseBuiltInZen`: A boolean that determines whether to use the built-in zen mode for VS code when entering Angular Zen Mode, if true, then instead of simply hiding the sidebar, the extension will toggle VS Code's built in zen mode. Defaults to `false`
- `angular-zen-mode.ZoomOutCount`: An integer which is the amount of times the extension will zoom out by 20% when entering zen mode. Defaults to `0`
- `angular-zen-mode.WatchMode`: A boolean that determines whether the extension will watch for angular component file openings. If true, then the extension will detect when a new compontent ts/template/style file is open and automatically open the other two files in the zen mode. Defaults to `false`

## Known Issues

- #### Bug with Built-In Zen Mode

If `angular-zen-mode.UseBuiltInZen` is `true` and you trigger the `angular-zen-mode.activateAngularZen` when you are already in the built-in zen mode, then the zen mode will be toggeled off. This is an shortcoming of the VS Code extension API which has very little support for the workbench's zen mode. I have submitted a feature request to the VS Code Team ([Track Issue Here](https://github.com/microsoft/vscode/issues/129408))

## Release Notes

### 1.0.0

Initial release of Angular Zen Mode
