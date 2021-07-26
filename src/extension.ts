import { extname, sep } from 'path';
import * as vscode from 'vscode';

import { fileIs, getFileNameWithoutExtension } from './common';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

export const config = <T>(scope: string) => {
	return vscode.workspace.getConfiguration("angular-zen-mode").get<T>(scope);
};

let styleFormats = config<string[]>("StyleFormats") || [
	".css",
	".scss",
	".sass",
];
let templateFormats = config<string[]>("TemplateFormats") || [".html"];
let watchMode = config<boolean>("WatchMode");
let zoomCount = config<number>("ZoomOutCount") || 0;
let useBuiltInZen = config<boolean>("UseBuiltInZen");
let thirdFileBelow = config<boolean>("ThirdFileBelow");

export const ZEN_MODE_CONTEXT = "angularZenMode.inZenMode";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	context.environmentVariableCollection.replace("setZenWatcher", "false");

	const editors = vscode.window.visibleTextEditors;

	vscode.window.onDidChangeVisibleTextEditors(async (ed) => {
		const vsEDitors = vscode.window.visibleTextEditors;

		const vsFN = vsEDitors.map((ed2) => fileName(ed2.document.fileName));

		const edFN = ed.map((ed2) => fileName(ed2.document.fileName));

		await checkIfZenMode(ed);
	});

	await checkIfZenMode(editors);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let zenCommand = vscode.commands.registerCommand(
		"angular-zen-mode.activateAngularZen",
		async (...args) => {
			if (args.length > 1) {
				const { path } = args[0];

				const doc = await vscode.workspace.openTextDocument(path);

				await vscode.window.showTextDocument(doc);
			}

			const editors = vscode.window.visibleTextEditors;

			if (editors.length > 1) {
				await vscode.commands.executeCommand(
					"workbench.action.closeEditorsInOtherGroups"
				);
			}

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showWarningMessage("No file opened");
			} else {
				const file = editor.document.fileName;

				await zen(file, true);

				if (useBuiltInZen) {
					await vscode.commands.executeCommand(
						"workbench.action.toggleZenMode"
					);
				} else {
					await vscode.commands.executeCommand("workbench.action.closeSidebar");
				}

				for (let i = 0; i < zoomCount; i++) {
					await vscode.commands.executeCommand("editor.action.fontZoomOut");
				}

				await vscode.commands.executeCommand(
					"setContext",
					ZEN_MODE_CONTEXT,
					true
				);

				const checkZenWatcher =
					context.environmentVariableCollection.get("setZenWatcher")?.value;

				if (watchMode && checkZenWatcher !== "true") {
					context.environmentVariableCollection.replace(
						"setZenWatcher",
						"true"
					);

					vscode.workspace.onDidOpenTextDocument(async (doc) => {
						if (checkIfOpenedFileShouldBeZenned(doc)) {
							let fn = doc.fileName;
							if (extname(fn).endsWith("git")) {
								fn = fn.replace(".git", "");
							}

							await zen(fn);
						}
					});
				}
			}
		}
	);

	context.subscriptions.push(zenCommand);

	let next = vscode.commands.registerCommand(
		"angular-zen-mode.nextEditor",
		async () => {
			const editors = vscode.window.visibleTextEditors;
			const firstDoc = editors[0].document;
			const secDoc = editors[1].document;
			const thirdDoc = editors[2].document;

			await vscode.window.showTextDocument(
				secDoc,
				vscode.ViewColumn.One,
				false
			);
			await vscode.window.showTextDocument(
				thirdDoc,
				vscode.ViewColumn.Two,
				true
			);
			await vscode.window.showTextDocument(
				firstDoc,
				vscode.ViewColumn.Three,
				true
			);
		}
	);

	context.subscriptions.push(next);

	let previous = vscode.commands.registerCommand(
		"angular-zen-mode.previousEditor",
		async () => {
			const editors = vscode.window.visibleTextEditors;
			if (editors.length == 3) {
				const firstDoc = editors[0].document;
				const secDoc = editors[1].document;
				const thirdDoc = editors[2].document;

				await vscode.window.showTextDocument(
					thirdDoc,
					vscode.ViewColumn.One,
					false
				);
				await vscode.window.showTextDocument(
					firstDoc,
					vscode.ViewColumn.Two,
					true
				);
				await vscode.window.showTextDocument(
					secDoc,
					vscode.ViewColumn.Three,
					true
				);
			} else {
				vscode.window.showWarningMessage("Not in Angular Zen Mode");
			}
		}
	);

	context.subscriptions.push(previous);

	let switchToTs = vscode.commands.registerCommand(
		"angular-zen-mode.switchToComponent",
		async () => {
			const editors = vscode.window.visibleTextEditors;
			const docs = editors.map((e) => e.document);
			const fileNames = docs.map((d) => d.fileName);
			const i = fileNames.findIndex((fn) => fileIsTs(fn));
			if (editors.length == 3 && i > 0) {
				// let { j, k } = i == 1 ? { j: 2, k: 0 } : { j: 0, k: 2 };

				await vscode.window.showTextDocument(
					docs[i],
					vscode.ViewColumn.One,
					false
				);
				await zen(fileNames[i], false);
				// await vscode.window.showTextDocument(
				// 	docs[j],
				// 	vscode.ViewColumn.Two,
				// 	true
				// );
				// await vscode.window.showTextDocument(
				// 	docs[k],
				// 	vscode.ViewColumn.Three,
				// 	true
				// );
			}
		}
	);

	context.subscriptions.push(switchToTs);

	let switchToTemplate = vscode.commands.registerCommand(
		"angular-zen-mode.switchToTemplate",
		async () => {
			const editors = vscode.window.visibleTextEditors;
			const docs = editors.map((e) => e.document);
			const fileNames = docs.map((d) => d.fileName);
			const i = fileNames.findIndex((fn) => fileIsTemplate(fn));
			if (editors.length == 3 && i > 0) {
				// let { j, k } = i == 1 ? { j: 2, k: 0 } : { j: 0, k: 2 };

				await vscode.window.showTextDocument(
					docs[i],
					vscode.ViewColumn.One,
					false
				);
				await zen(fileNames[i], false);
				// await vscode.window.showTextDocument(
				// 	docs[j],
				// 	vscode.ViewColumn.Two,
				// 	true
				// );
				// await vscode.window.showTextDocument(
				// 	docs[k],
				// 	vscode.ViewColumn.Three,
				// 	true
				// );
			}
		}
	);

	context.subscriptions.push(switchToTemplate);

	let switchToStyle = vscode.commands.registerCommand(
		"angular-zen-mode.switchToStyle",
		async () => {
			const editors = vscode.window.visibleTextEditors;
			const docs = editors.map((e) => e.document);
			const fileNames = docs.map((d) => d.fileName);
			const i = fileNames.findIndex((fn) => fileIsStyle(fn));
			if (editors.length == 3 && i > 0) {
				// let { j, k } = i == 1 ? { j: 2, k: 0 } : { j: 0, k: 2 };

				await vscode.window.showTextDocument(
					docs[i],
					vscode.ViewColumn.One,
					false
				);
				await zen(fileNames[i], false);
				// await vscode.window.showTextDocument(
				// 	docs[j],
				// 	vscode.ViewColumn.Two,
				// 	true
				// );
				// await vscode.window.showTextDocument(
				// 	docs[k],
				// 	vscode.ViewColumn.Three,
				// 	true
				// );
			}
		}
	);

	context.subscriptions.push(switchToStyle);
}

export function checkIfOpenedFileShouldBeZenned(doc: vscode.TextDocument) {
	const editors = vscode.window.visibleTextEditors;

	if (editors.length != 3) return false;

	let name = doc.fileName;
	if (extname(name).endsWith("git")) {
		name = name.replace(".git", "");
	}

	const firstEditor = editors.find(
		(ed) => ed.viewColumn == vscode.ViewColumn.One
	);

	if (!firstEditor) return false;

	const checkName = firstEditor.document.fileName;

	if (checkName != name) return false;

	return name.includes(".component.");
}

export function fileName(path: string) {
	const bits = path.split(sep);
	return bits[bits.length - 1];
}

export async function checkIfZenMode(ed: vscode.TextEditor[]) {
	if (ed.length != 3) {
		await vscode.commands.executeCommand("setContext", ZEN_MODE_CONTEXT, false);
	}
	const fileNames = ed.map((e) => e.document.fileName);
	const hasTs = fileNames.some((f) => fileIsTs(f));
	const hasTemplate = fileNames.some((f) => fileIsTemplate(f));
	const hasStyle = fileNames.some((f) => fileIsStyle(f));

	if (!(hasTs && hasTemplate && hasStyle)) {
		await vscode.commands.executeCommand("setContext", ZEN_MODE_CONTEXT, false);
	} else {
		await vscode.commands.executeCommand("setContext", ZEN_MODE_CONTEXT, true);
	}
}

export async function zen(filename: string, initial: boolean = false) {
	const fileWOEX = getFileNameWithoutExtension(filename);
	let topFormats: string[] = [];
	let bottomFormats: string[] = [];
	if (fileIsTs(filename)) {
		topFormats.push(...templateFormats);
		bottomFormats.push(...styleFormats);
	} else if (fileIsTemplate(filename)) {
		topFormats.push(...styleFormats);
		bottomFormats.push(".ts");
	} else if (fileIsStyle(filename)) {
		topFormats.push(".ts");
		bottomFormats.push(...templateFormats);
	} else {
		vscode.window.showErrorMessage("Must be executed on angular file");
	}
	await openCorrespondingFile(fileWOEX, vscode.ViewColumn.Two, ...topFormats);

	if (initial && thirdFileBelow) {
		await vscode.commands.executeCommand("workbench.action.newGroupBelow");
	}

	await openCorrespondingFile(
		fileWOEX,
		vscode.ViewColumn.Three,
		...bottomFormats
	);

	await vscode.commands.executeCommand(
		"workbench.action.focusFirstEditorGroup"
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}

// export function

async function openFile(
	fileName: string,
	col: vscode.ViewColumn = vscode.ViewColumn.Active
): Promise<boolean> {
	try {
		let doc = await vscode.workspace.openTextDocument(fileName);
		if (doc) {
			await vscode.window.showTextDocument(doc, col);
		}
		return true;
	} catch (error) {
		return false;
	}
}

async function openCorrespondingFile(
	fileNameWithoutExtension: string,
	col: vscode.ViewColumn,
	...formats: string[]
) {
	for (let index = 0; index < formats.length; index++) {
		const fileName = `${fileNameWithoutExtension}${formats[index]}`;
		var succ = await openFile(fileName, col);
		if (succ) {
			break;
		}
	}
}

function fileIsTemplate(path: string) {
	return fileIs(path, ...templateFormats);
}

function fileIsStyle(path: string) {
	return fileIs(path, ...styleFormats);
}

function fileIsTs(path: string) {
	if (fileIsSpec(path)) {
		return false;
	}
	return fileIs(path, ".ts");
}

function fileIsSpec(path: string) {
	return fileIs(path, ".spec.ts");
}
