import { Routes } from '@angular/router';
import { SongListComponent } from './song/song-list/song-list.component';
import { SongDetailComponent } from './song/song-detail/song-detail.component';

export const routes: Routes = [
  { path: 'song-detail/:id', component: SongDetailComponent },
  { path: '', component: SongListComponent },
];
