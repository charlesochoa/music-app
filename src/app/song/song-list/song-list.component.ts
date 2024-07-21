import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SongInterface } from '../../shared/interfaces/song.interface';

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
  constructor(private router: Router) {}

  // TODO: extract data calling the json-server
  songs: SongInterface[] = [
    {
      id: 1,
      title: 'Who did you think i was',
      poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
      genre: ['Pop', 'Rock', 'Alternative'],
      year: 2007,
      duration: 424,
      rating: 9.27,
      artist: 1,
    },
    {
      id: 2,
      title: 'Penny Lane',
      poster: 'http://dummyimage.com/400x600.png/dddddd/000000',
      genre: ['Rock', 'Pop', 'Chill'],
      year: 1967,
      duration: 303,
      rating: 8.99,
      artist: 2,
    },
    {
      id: 3,
      title: 'Hey Jude',
      poster: 'http://dummyimage.com/400x600.png/5fa2dd/ffffff',
      genre: ['Pop', 'Rock', 'Alternative'],
      year: 1974,
      duration: 206,
      rating: 6.25,
      artist: 2,
    },
    {
      id: 4,
      title: "(I Can't Get No) Satisfaction",
      poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
      genre: ['Rock', 'Pop', 'Heavy'],
      year: 1965,
      duration: 290,
      rating: 6.66,
      artist: 4,
    },
  ];

  goToDetail(id: number) {
    this.router.navigate(['/song-detail', id]);
  }
}
