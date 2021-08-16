import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService, UserModel } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { fade } from '../services/animations'

@Component({
    selector: 'app-notes-page',
    templateUrl: './notes-page.component.html',
    styleUrls: ['./notes-page.component.scss'],
    animations: [fade]
})
export class NotesPageComponent implements OnInit {
    currentUser: any;
    createNoteForm: FormGroup;
    createItemForm: FormGroup;
    myNotes: any;

    constructor(
        private _authService: AuthService,
        private _noteService: NotesService,
        private router: Router,
        private fb: FormBuilder,
    ) {
        this.createNoteForm = this.fb.group({
            title: ['', [Validators.required]],
        });
        this.createItemForm = this.fb.group({
            item: ['', [Validators.required]],
        });

        this._authService._currentUser$.pipe(take(1)).subscribe((userData: UserModel) => {
            this.currentUser = userData;
            console.log("Logged In User Details", this.currentUser);
            this.getUserNotes(this.currentUser.uid);
        });
    }

    ngOnInit(): void { }


    signOut() {
        console.log("signOut triggered");
        this._authService.signOut().then(() => {
            this.router.navigateByUrl('/', { replaceUrl: true });
        })
    }

    getUserNotes(uid) {
        this._noteService.getUserNotes(uid).subscribe(notes => {
            this.myNotes = notes;
            console.log("My Notes", this.myNotes);
        })
    }

    createNote() {
        const newNote = {
            title: this.createNoteForm.value.title,
            createdAt: new Date(),
            updatedAt: new Date(),
            uid: this.currentUser.uid
        }

        this._noteService.addNewNote(newNote);
        this.createNoteForm.reset();
    }

    deleteNote(note) {
        this._noteService.deleteNote(note.id);
    }

    addNoteItem(noteId) {
        const item = this.createItemForm.value.item;

        if (item) {
            const addItem = {
                noteID: noteId,
                item: item,
                timeStamp: new Date()
            }

            this._noteService.addItemToNote(addItem);
            this.createItemForm.reset();
        } else {
            console.log("No Item to add");
        }
    }
}