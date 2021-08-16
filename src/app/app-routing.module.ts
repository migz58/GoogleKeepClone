import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { NotesPageComponent } from './notes-page/notes-page.component';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
    redirectUnauthorizedTo(['/']);

// Automatically log in users
const redirectLoggedInToNotes = () => redirectLoggedInTo(['/notes']);


const routes: Routes = [
    {
        path: '', component: LoginPageComponent,
        ...canActivate(redirectLoggedInToNotes),
    },
    {
        path: 'notes', component: NotesPageComponent,
        ...canActivate(redirectUnauthorizedToLogin),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
