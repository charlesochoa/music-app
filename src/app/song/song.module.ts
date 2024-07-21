import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song-list/song-list.component';
import { SongDetailComponent } from './song-detail/song-detail.component';

@NgModule({
  declarations: [],
  imports: [SongListComponent, SongDetailComponent, CommonModule],
})
export class SongModule {}
