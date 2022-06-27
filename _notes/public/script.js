"use strict";
var _a, _b;
var BUTTON_TYPE;
(function (BUTTON_TYPE) {
    BUTTON_TYPE[BUTTON_TYPE["ADD"] = 0] = "ADD";
    BUTTON_TYPE[BUTTON_TYPE["DELETE"] = 1] = "DELETE";
})(BUTTON_TYPE || (BUTTON_TYPE = {}));
class Manager {
    constructor(btn_style_add, btn_style_rmv, note_style, sect_style, main_id) {
        this.btn_style_add = btn_style_add;
        this.btn_style_rmv = btn_style_rmv;
        this.note_style = note_style;
        this.section_style = sect_style;
        this.main_id = main_id;
        this.sections_counter = 0;
    }
    addNoteSection() {
        var _a, _b, _c;
        let new_section = this.createNoteSection();
        this.sections_counter++;
        (_a = document.getElementById(this.main_id)) === null || _a === void 0 ? void 0 : _a.insertBefore(new_section, (_c = (_b = document.getElementById(this.main_id)) === null || _b === void 0 ? void 0 : _b.firstChild) === null || _c === void 0 ? void 0 : _c.nextSibling);
    }
    removeNoteSection(button) {
        let _div = button.parentElement;
        _div === null || _div === void 0 ? void 0 : _div.remove();
    }
    createNoteSection() {
        let section = document.createElement("div");
        section.className = this.section_style;
        let note = this.createNewNote();
        let button_rmv = this.createNewButton(BUTTON_TYPE.DELETE);
        let date = document.createElement("p").appendChild(document.createTextNode(new Date().toUTCString()));
        section.appendChild(note);
        section.appendChild(button_rmv);
        section.appendChild(date);
        return section;
    }
    createNewNote() {
        let note = document.createElement("textarea");
        note.setAttribute("maxlength", "5000");
        note.className = this.note_style;
        return note;
    }
    createNewButton(btn_type) {
        let button = document.createElement("button");
        if (btn_type == BUTTON_TYPE.ADD) {
            button.innerHTML = "+";
            button.className = this.btn_style_add;
            button.addEventListener("click", () => { this.addNoteSection(); });
        }
        else {
            button.innerHTML = "-";
            button.className = this.btn_style_rmv;
            button.addEventListener("click", () => { this.removeNoteSection(button); });
            ;
        }
        return button;
    }
}
let _manager = new Manager("btn_add", "btn_rmv", "note", "sect", "notes_section");
let button_add = _manager.createNewButton(BUTTON_TYPE.ADD);
(_a = document.getElementById(_manager.main_id)) === null || _a === void 0 ? void 0 : _a.insertBefore(_manager.createNewButton(BUTTON_TYPE.ADD), (_b = document.getElementById(_manager.main_id)) === null || _b === void 0 ? void 0 : _b.firstChild);
//_manager.addNoteSection();
