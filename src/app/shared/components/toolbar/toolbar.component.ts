import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Input() title: string = '';
  @Input() icon: string = 'arrow_back';
  @Input() redirect: string = '';
  constructor(private router: Router) {}

  goBack() {
    if (this.icon === 'arrow_back') this.router.navigate([this.redirect]);
  }
}
