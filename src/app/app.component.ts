import { Component } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errMessage: "Title and Text both are required fields";
  note: Note = new Note();
  notes: Array<Note> = [];
  title: string;
  text: string;
  flag:boolean = false;
  index:number;
  uindex:number;
  constructor(private notelist: NotesService) {
  }
  addNote1() {
    if (this.note.text === '' || this.note.title === '') {
      this.errMessage = "Title and Text both are required fields";
    }
    console.log("In addNote()" + this.note);
    this.notes.push(this.note);
    this.notelist.addNote(this.note).subscribe((data) => {
    },
      error => {
        this.errMessage = error.message;
        console.log(this.errMessage);
        this.notes.pop();
      });
      this.note.title = '';
      this.note.text = '';
    // console.log(this.note.text);
  }
  deleteNote1(id){
    let index = this.notes.findIndex( n => n.id === id);
    console.log("Delete ID: " + id);
    this.notes.splice(index, 1);
    this.notelist.deleteNote(id).subscribe(data=>{});
  }
  editNote1(eid){
    this.index = this.notes.findIndex( n => n.id === eid);
    console.log("Edit ID: " + eid);
    console.log("Index: " + this.index);
    // console.log("note.text: " + this.notes[this.index].text);
    // console.log("note.title: " + this.notes[this.index].title);
    
    this.note.text = this.notes[this.index].text;
    this.note.title = this.notes[this.index].title;

    this.notelist.editNote(this.index).subscribe(data => {});
    this.flag = true;

  }
  updateNote1(index){
    console.log("Note, result id: " + index);
    console.log("Update ID: " + this.uindex);
    
    this.notes[index]['text'] = this.note.text;
    this.notes[index]['title'] = this.note.title;

    this.notelist.updateNote(this.notes[index]['id'], this.note).subscribe(data => {});
    this.flag = false;

    this.note.text = '';
    this.note.title = '';

  }


  ngOnInit() {
    this.note = new Note();
    this.notelist.getNotes().subscribe(
      data => {
        console.log(data);
        this.notes = data;
      },
      error => {
        this.errMessage = error.message;
      }
    );
  }
}
