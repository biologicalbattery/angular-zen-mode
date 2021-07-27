# Angular Zen Mode

Angular Zen Mode is an extension that allows angular developers to streamline their developer experience when programming in angular-specific files (component code/template/style).

## Support

If you like the extenstion and it's improved your life feel free to donate using the link below. It's going towards the caffeine-fuel ☕ for my dev projects 😉

[![Donation Badge](https://img.shields.io/badge/Donate-PayPal-red "Donate via Paypal")](https://www.paypal.com/paypalme/ADollie)

## Features

- ### Angular Zen Mode

Use the command `angular-zen-mode.activateAngularZen` (default shortcut `alt+z alt+z`) to activate the Angular Zen Mode. This feature is also available in the context menu of the explorer when right-clicking any angular component file.

When this command is run and an angular component file (code/template/style) is currently active in an editor, then the extension will open up two more editor groups with the other two associated component files in them, it will also close all other editor groups except the active group.

The default configuration for the editor groups is one group is created to the right of the active editor group, and then another is created beneath the first newly created group. This is the ideal configuration for one screen with limited space.

However the extension can be configured to open the third editor group in a column to the right of the second group, which is ideal for larger screens.

By default it will also close the sidebar but can be configured to toggle VS Code's built zen mode instead.

Can be configured to also zoom out when entering zen mode.

##### Usage (Click GIFs to view larger versions)

###### Angular Zen Mode using Command Palette

[![Zen Mode using Command Palette](https://res.cloudinary.com/ansaardollie/image/upload/v1627339638/angular-zen-mode/screencap/CommandPalette.gif "Zen Mode using Command Palette")](https://res.cloudinary.com/ansaardollie/image/upload/v1627339638/angular-zen-mode/screencap/CommandPalette.gif)

###### Angular Zen Mode in Full Screen (via Built-in Zen Mode)

[![Zen Mode in Full Screen](https://res.cloudinary.com/ansaardollie/image/upload/v1627339626/angular-zen-mode/screencap/BuiltIn.gif "Zen Mode with Built-In Zen Mode")](https://res.cloudinary.com/ansaardollie/image/upload/v1627339626/angular-zen-mode/screencap/BuiltIn.gif)

###### Angular Zen Mode using Keyboard Shortcut

[![Zen Mode using Keyboard Shortcut](https://res.cloudinary.com/ansaardollie/image/upload/v1627339626/angular-zen-mode/screencap/KB.gif "Zen Mode using Keyboard Shortcut")](https://res.cloudinary.com/ansaardollie/image/upload/v1627339626/angular-zen-mode/screencap/KB.gif)

###### Angular Zen Mode using Context Menu

[![Zen Mode using Context Menu](https://res.cloudinary.com/ansaardollie/image/upload/v1627339630/angular-zen-mode/screencap/Context.gif "Zen Mode using Keyboard Shortcut")](https://res.cloudinary.com/ansaardollie/image/upload/v1627339630/angular-zen-mode/screencap/Context.gif)

- ### Quickly Switch Component Files

When in zen mode, it is very easy to switch between files by simply using the mouse to place the cursor in the file you want to edit, however you can also use commands that the extension provides to streamline this switching process to automatically move the required file into the main editor.

Use the following commands to quickly switch the main editor, one with most space in default configuration, to a specific type of angular component file. These commands only work when the workspace is in Angular Zen Mode, which is three editor groups open with the active editor in each group displaying one of the angular component files.

| Angular Component File                 | Command                              | Shortcut      |
| -------------------------------------- | ------------------------------------ | ------------- |
| Code (`.ts`)                           | `angular-zen-mode.switchToComponent` | `alt+z alt+m` |
| Template(`.html`)                      | `angular-zen-mode.switchToTemplate`  | `alt+z alt+k` |
| Style (`.css`/`.scss`/`.sass`/`.less`) | `angular-zen-mode.switchToStyle`     | `alt+z alt+o` |

##### Usage (Click GIF to view larger version)

###### Switching Between Component Files

[![Switching Between Component Files](https://res.cloudinary.com/ansaardollie/image/upload/v1627339636/angular-zen-mode/screencap/Switching.gif "Switching Between Component Files")](https://res.cloudinary.com/ansaardollie/image/upload/v1627339636/angular-zen-mode/screencap/Switching.gif)

You can also use the `angular-zen-mode.nextEditor` and `angular-zen-mode.previousEditor` commands to cycle through the editors, with shortcuts `alt+z alt+l` and `alt+z alt+p` respectively.

- ### Automatically Open All Component Files

This feature is disabled by default. Set `angular-zen-mode.WatchMode` to `true` to enable it.

When the workspace is in Angular Zen Mode, which is three editor groups open with the active editor in each group displaying one of the angular component files, this feature will automatically detect whenever an Angular component file (code/template/style) is opened in the first editor group, and will then open and display the other associated component files in the other editor groups.

This feature is useful when programming in all component files of many components in one session.

##### Usage (Click GIF to view larger version)

###### Watch Mode in action

[![Watch Mode with Angular Zen Mode](https://res.cloudinary.com/ansaardollie/image/upload/v1627339639/angular-zen-mode/screencap/Watch.gif "Watch Mode with Angular Zen Mode")](https://res.cloudinary.com/ansaardollie/image/upload/v1627339639/angular-zen-mode/screencap/Watch.gif)

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

## License

MIT No Attribution

Copyright 2021 Ansaar Dollie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
