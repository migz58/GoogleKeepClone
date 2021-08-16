import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export class NoteModel {
    id?: string;
    uid: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    constructor(
        private afs: AngularFirestore,
    ) { }


    getUserNotes(userId) {
        return this.afs.collection('notes', (ref) => 
        ref.where('uid', "==", userId)
        .orderBy('updatedAt', 'desc'))
            .snapshotChanges()
            .pipe(
                map((users) => {
                    return users.map((user) => {
                        return <NoteModel>{
                            id: user.payload.doc.id,
                            ...(user.payload.doc.data() as any),
                        };
                    });
                })
            )
    }

    addNewNote(newNote) {
        return this.afs.collection('notes').doc().set({
            uid: newNote.uid,
            title: newNote.title,
            createdAt: newNote.createdAt,
            updatedAt: newNote.updatedAt
        })
    }

    deleteNote(noteId){
        this.afs.collection('notes').doc(noteId).delete();
    }

    deleteItem(noteId, itemId){
        this.afs.collection('notes').doc(noteId).collection('items').doc(itemId).delete();
    }

    addItemToNote(addItem){
        console.log("Add Item service", addItem);

        this.afs.collection('notes').doc(addItem.noteID).update({
            updatedAt: addItem.timeStamp
        })

        this.afs.collection('notes').doc(addItem.noteID).collection('items').doc().set({
            title: addItem.item,
            status: false
        })
    }
}
