enum BUTTON_TYPE{
    ADD,
    DELETE,
}

class Manager{
    btn_style_rmv: string;
    btn_style_add: string;
    note_style: string;
    section_style: string;

    main_id: string;
    sections_counter: number;

    constructor(btn_style_add: string, btn_style_rmv: string, note_style: string, sect_style: string, main_id: string){
        this.btn_style_add = btn_style_add;
        this.btn_style_rmv = btn_style_rmv;
        this.note_style = note_style;
        this.section_style = sect_style;

        this.main_id = main_id;
        this.sections_counter = 0;
    }

    addNoteSection(): void{
        let new_section = this.createNoteSection();
        this.sections_counter++;

        document.getElementById(this.main_id)?.insertBefore(new_section, document.getElementById(this.main_id)?.firstChild?.nextSibling as Node);
    }
    removeNoteSection(button: HTMLButtonElement): void{
        let _div = button.parentElement;
        _div?.remove();
    }

    createNoteSection(): HTMLDivElement{
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
    createNewNote(): HTMLTextAreaElement{
        let note = document.createElement("textarea");
        note.setAttribute("maxlength", "5000");
        note.className = this.note_style;
        
        return note;
    }
    createNewButton(btn_type: BUTTON_TYPE): HTMLButtonElement{
        let button = document.createElement("button");

        if(btn_type == BUTTON_TYPE.ADD){
            button.innerHTML = "+";
            button.className = this.btn_style_add;
            button.addEventListener("click", () => {this.addNoteSection()});
        }else{
            button.innerHTML = "-";
            button.className = this.btn_style_rmv;
            button.addEventListener("click", () => {this.removeNoteSection(button)});;
        }
        return button;
    }
}

let _manager = new Manager("btn_add", "btn_rmv", "note", "sect", "notes_section");
let button_add = _manager.createNewButton(BUTTON_TYPE.ADD);
document.getElementById(_manager.main_id)?.insertBefore(
    _manager.createNewButton(BUTTON_TYPE.ADD), document.getElementById(_manager.main_id)?.firstChild as Node);
//_manager.addNoteSection();