import { Routes } from '@angular/router';
import { SongListComponent } from './song/song-list/song-list.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';
import { SongFormComponent } from './song/song-form/song-form.component';

export const routes: Routes = [
  { path: 'song-detail/:id', component: SongDetailComponent },
  { path: 'song-form', component: SongFormComponent },
  { path: 'song-form/:id', component: SongFormComponent },
  { path: '', component: SongListComponent },
];
