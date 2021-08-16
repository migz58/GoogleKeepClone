import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

export class UserModel {
    uid?: string;
    name: string;
    surname: string;
    username: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    _currentUser$: Observable<UserModel>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        this._currentUser$ = this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.afs.doc<UserModel>(`users/${user.uid}`)
                        .snapshotChanges()
                        .pipe(
                            map(snap => {
                                return <UserModel>{
                                    uid: snap.payload.id,
                                    ...snap.payload.data()
                                }
                            })
                        );
                } else {
                    return of(null);
                }
            })
        )
    }

    async signUp({ name, surname, username, email, password }) {
        const credential = await this.afAuth.createUserWithEmailAndPassword(
            email,
            password
        );

        console.log('result: ', credential);
        const uid = credential.user.uid;

        return this.afs.doc(
            `users/${uid}`
        ).set({
            uid,
            email: credential.user.email,
            firstName: name,
            LastName: surname,
            username: username
        })
    }

    signIn({ email, password }) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    signOut() {
        return this.afAuth.signOut();
    }
}