import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SongInterface } from '../../shared/interfaces/song.interface';
import { SongStateService } from '../../shared/services/states/song-state.service';
import { Observable } from 'rxjs';
import { ArtistInterface } from '../../shared/interfaces/artist.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    ToolbarComponent,
    MatGridListModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    NgFor,
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent {
  songs$: Observable<SongInterface[]>;

  constructor(
    private router: Router,
    private songStateService: SongStateService
  ) {
    this.songs$ = this.songStateService.songs$;
  }

  goToDetail(id: number) {
    this.router.navigate(['/song-detail', id]);
  }

  getArtistName(artist?: number | ArtistInterface) {
    return !artist || typeof artist === 'number' ? '' : `(${artist.name})`;
  }
}
