import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, ToolbarComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent {}
