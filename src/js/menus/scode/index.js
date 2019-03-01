/*
    bold-menu
*/
import $ from '../../util/dom-core.js'

// 构造函数
function Scode(editor) {
    this.editor = editor
    this.$elem = $(
        `<div class="w-e-menu"> <i class="w-e-icon-scode">源码</i></div>`
    )
    this.type = 'click'

    // 当前是否 active 状态
    this._active = false

    const style_ = 'width: 100%; height: 100%; border: none; padding: 10px; line-height: 1.5; font-size: 16px; display: none;'
    this.editor.$scodeElement = $(`<textarea class="w-e-scode-container" style="${style_}"> </textarea>`)
    this.editor.$textContainerElem.append(editor.$scodeElement)

    this.setToSource()

    const that = this
    editor.$scodeElement[0].onkeyup = function () {
        that.setToEditor(this.value)
    }
}

// 原型
Scode.prototype = {
    constructor: Scode,

    // 点击事件
    onClick: function (e) {
        // 点击菜单将触发这里

        const editor = this.editor
        const $elem = this.$elem

        // 执行 scode 命令
        editor.cmd.do('scode')

        if (!this._active) {
            this._active = true
            $elem.addClass('w-e-active')
            editor.$textElem.hide()
            editor.$scodeElement.show()
            this.setToSource()
        } else {
            this._active = false
            $elem.removeClass('w-e-active')
            editor.$textElem.show()
            editor.$scodeElement.hide()
        }
    },
    setToSource: function () {
        const editor = this.editor
        const editorHtml = editor.txt.html()
        this.editor.$scodeElement[0].value = editorHtml
    },
    setToEditor(html) {
        const editor = this.editor
        const onchange = editor.config.onchange
        if (onchange && typeof onchange === 'function') {
            // 触发配置的 onchange 函数
            editor.txt.html(html, true)
            onchange(html)
        }
    }
}

export default Scode