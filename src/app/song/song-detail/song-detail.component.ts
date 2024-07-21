import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongModel } from '../../shared/models/song.model';
import { SongStateService } from '../../shared/services/states/song-state.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    ToolbarComponent,
  ],
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss',
})
export class SongDetailComponent {
  song?: SongModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private songStateService: SongStateService
  ) {}

  ngOnInit(): void {
    const songId = +this.route.snapshot.paramMap.get('id')!;
    const foundSong = this.songStateService.getSongById(songId);
    if (!foundSong) {
      this.router.navigate(['']);
      return;
    }
    this.song = foundSong;
  }

  removeGenre(genre: string) {
    //TODO missing action
    console.log('🚀 ~ SongDetailComponent ~ genre:', genre);
  }

  removeCompany(company: string) {
    //TODO missing action
    console.log('🚀 ~ SongDetailComponent ~ company:', company);
  }
}
