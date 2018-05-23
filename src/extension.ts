'use strict';
import * as vscode from 'vscode';
import {workspace, window, commands, ExtensionContext} from 'vscode';

export function activate(context: ExtensionContext) {
    let alreadyOpenedFirstMarkdown = false;
    const markdown_preview_command_id = "markdown.showPreview";
    const close_other_editor_command_id = "workbench.action.closeEditorsInOtherGroups";
    
    function previewFirstMarkdown() {
        if (alreadyOpenedFirstMarkdown) {
	    return;
	}
        let editor = window.activeTextEditor;
        if (editor) {
            let doc = editor.document;
            if (doc && doc.languageId === "markdown") {
                openMarkdownPreviewSideBySide();
                alreadyOpenedFirstMarkdown = true;
            }
            if (doc && doc.languageId === "dot") {
                openGraphvizPreviewSideBySide();
                alreadyOpenedFirstMarkdown = true;
            }
        }
    }
    function openMarkdownPreviewSideBySide() {
        var temp = commands.getCommands()
        temp.then(console.log)

        commands.executeCommand(close_other_editor_command_id)
        .then(() => commands.executeCommand(markdown_preview_command_id))
        .then(() => {}, (e) => console.error(e));
    }
    function openGraphvizPreviewSideBySide() {
        var temp = commands.getCommands()
        temp.then(console.log)
        commands.executeCommand(close_other_editor_command_id)
        .then(() => commands.executeCommand("graphviz.showPreview"))
        .then(() => {}, (e) => console.error(e));
    }

    if (window.activeTextEditor) {
        previewFirstMarkdown();
    } else {
        vscode.window.onDidChangeActiveTextEditor(()=>{
            previewFirstMarkdown();
        });
    }

    vscode.workspace.onDidOpenTextDocument((doc)=>{
        if (doc && doc.languageId === "markdown") {
            openMarkdownPreviewSideBySide();
        }
        if (doc && doc.languageId === "dot") {
            openGraphvizPreviewSideBySide();
        }
    });
}

export function deactivate() {
}
