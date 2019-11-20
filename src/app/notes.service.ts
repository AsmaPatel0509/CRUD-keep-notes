import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from './note';
import { HttpClient } from '@angular/common/http';

let notelist = [];
@Injectable()
export class NotesService {
  constructor(private httpClient: HttpClient) { }
  getNotes(): Observable<Array<Note>> {
    return this.httpClient.get<Array<Note>>('http://localhost:3000/notes');
  }
  addNote(note: Note): Observable<Note> {
    console.log("In addNote in service");
    return this.httpClient.post<Note>('http://localhost:3000/notes', note);
  }
  deleteNote(id): Observable<Note>{
    console.log("In deleteNote");
    return this.httpClient.delete<Note>('http://localhost:3000/notes/' + id);
  }
  editNote(id): Observable<Note>{
    console.log("In editNote ");
    return this.httpClient.get<Note>('http://localhost:3000/notes/' + id);
  }
  updateNote(id, note: Note): Observable<Note>{
    console.log("In updateNote, id= " + id);
    return this.httpClient.put<Note>('http://localhost:3000/notes/' + id, note);
  }
}
