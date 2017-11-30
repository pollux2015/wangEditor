/*
    bold-menu
*/
import $ from '../../util/dom-core.js'

// 构造函数
function Source(editor) {
    this.editor = editor

    this.$elem = $(
        `<div class="w-e-menu">
            <i class="w-e-icon-terminal"><i/>
        </div>`
    )
    this.type = 'click'
    const height = editor.$textContainerElem[0].style.height
    const style_ = `display: none; width: 100%; line-height: 1.6; font-size: 14px; outline:none; resize: none; box-sizing: border-box; padding: 10px; border:1px solid #ccc; border-top:none; z-index:10000; height: ${ height }`
    this.editor.$sourceContainerElem = $(`<textarea class="w-e-source-container" style="${style_}"> </textarea>`)
    this.editor.$sourceContainerElem.insertAfter(editor.$textContainerElem)
    // 当前是否 active 状态
    this._active = false
}

// 原型
Source.prototype = {
    constructor: Source,
    // 点击事件
    onClick: function (e) {
        // 点击菜单将触发这里
        
        const editor = this.editor
        // 执行 bold 命令
        editor.cmd.do('source')
        this._active = !this._active
        if(this._active){
            editor.$sourceContainerElem[0].value = editor.txt.html()
        }else{
            editor.txt.html(editor.$sourceContainerElem[0].value)
        }
    },

    // 试图改变 active 状态
    tryChangeActive: function (e) {
        const editor = this.editor
        const $elem = this.$elem
        if (this._active) {
            editor.$textContainerElem.hide()
            editor.$sourceContainerElem.show()
            $elem.addClass('w-e-active')
        } else {
            editor.$textContainerElem.show()
            editor.$sourceContainerElem.hide()
            $elem.removeClass('w-e-active')
        }
    }
}

export default Source