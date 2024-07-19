import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [],
  imports: [ListComponent, DetailComponent, CommonModule],
})
export class SongModule {}
