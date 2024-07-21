import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SongStateService } from '../../shared/services/states/song-state.service';
import { Observable } from 'rxjs';
import { SongModel } from '../../shared/models/song.model';

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
  ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent implements OnInit {
  songs$: Observable<SongModel[]>;
  songs: SongModel[] = [];

  constructor(
    private router: Router,
    private songStateService: SongStateService
  ) {
    this.songs$ = this.songStateService.songs$;
  }
  ngOnInit(): void {
    this.songs$.subscribe((songs) => {
      this.songs = songs;
    });
  }

  goToDetail(id?: number) {
    this.router.navigate(['/song-detail', id]);
  }

  goToCreate() {
    this.router.navigate(['/song-form']);
  }
}
