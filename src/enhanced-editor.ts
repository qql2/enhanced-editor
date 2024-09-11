/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */

import { Editor, EditorPosition, Plugin } from 'obsidian';

interface USER_PLUGIN extends Plugin {
    saveSettings: () => Promise<void>
    loadSettings: () => Promise<void>
}


export class EnhancedEditor {
    static EOL = "(\r?\n|\r)"
    readonly editor: Editor;
    constructor(editor: Editor) {
        this.editor = editor
    }
    /** 获得多行输入*/
    GetMultiLineInSelection() {
        let Line1 = this.editor.getCursor('from');
        let Line2 = this.editor.getCursor('to');
        if (Line2.line < Line1.line) { const temp = Line2; Line2 = Line1; Line1 = temp; }
        Line1.ch = 0; Line2.ch = Infinity;
        this.editor.setSelection(Line2, Line1);
        return { txt: this.editor.getSelection(), startPos: Line1, endPos: Line2 }
    }
    /** 获取粘贴后的文本,执行后将把选中粘贴的文本
     * @param BeforePos 粘贴前的光标位置 或 选区靠前的位置
    */
    GetPasteTxt(BeforePos: EditorPosition) {
        const AfterPos = this.editor.getCursor();

        this.editor.setSelection(BeforePos, AfterPos);
        return { txt: this.editor.getSelection(), startPos: BeforePos, endPos: AfterPos }
    }
    getSelectedTag() {
        const raw = this.editor.getSelection();
        const txt = raw.replace(/#/, '');
        return txt;
    }
}