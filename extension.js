/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Stefan Goessner - 2016-17. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

const vscode = require('vscode'),
      clipTmpl = (html,usrcss) => `<!doctype html><html><head><meta charset='utf-8'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.4.1/github-markdown.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/default.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">
<link rel="stylesheet" href="https://gitcdn.xyz/repo/goessner/mdmath/master/css/texmath.css">
<link rel="stylesheet" href="https://gitcdn.xyz/repo/goessner/mdmath/master/css/vscode-texmath.css">
${usrcss ? `<link rel="stylesheet" href="${usrcss}">` : ''}
</head><body class="markdown-body">
${html}
</body></html>`.replace('vscode-resource:','');

// this method is called when extension is activated ..
exports.activate = function activate(context) {
    const kt = require('katex'),
          tm = require('markdown-it-texmath').use(kt),
          cfg = (key) => vscode.workspace.getConfiguration('mdmath')[key],
          delimiters = cfg('delimiters') || 'dollars',
          globalMacros = cfg('globalMacros'),
          clip = () => {
               const doc = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document;
               if (!doc || doc.languageId !== 'markdown')
                   return vscode.window.showInformationMessage('Active document is no markdown source document!');
               if (!mdit)
                   return vscode.window.showInformationMessage('Corresponding markdown preview document needs to be opened at least once!');
               if (!cb) cb = require('clipboardy');
               cb.write(clipTmpl(mdit.render(doc.getText())))
                 .then(()=>vscode.window.showInformationMessage('Html copied to clipboard!'),
                       (err)=>vscode.window.showInformationMessage('Html copying to clipboard failed: '+err.message));
          };
    let   mdit = null,
          cb = null;

    context.subscriptions.push(vscode.commands.registerCommand('extension.clipToHtml', clip));

    return {
        extendMarkdownIt: function(md) {
            return (mdit = md).use(tm, {delimiters:delimiters, globalMacros: globalMacros});
        }
    }
}
// this method is called when extension is deactivated ..
exports.deactivate = function deactivate() {};
