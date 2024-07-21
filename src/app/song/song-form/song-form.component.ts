import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SongStateService } from '../../shared/services/states/song-state.service';
import { SongModel } from '../../shared/models/song.model';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DateAdapter } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { ArtistStateService } from '../../shared/services/states/artist-state.service';
import { CompanyStateService } from '../../shared/services/states/company-state.service';
import { MatSelectModule } from '@angular/material/select';
import { CompanyInterface } from '../../shared/interfaces/company.interface';
import { ArtistInterface } from '../../shared/interfaces/artist.interface';
import moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-song-form',
  standalone: true,
  imports: [
    ToolbarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatAutocompleteModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './song-form.component.html',
  styleUrl: './song-form.component.scss',

  providers: provideMomentDateAdapter(MY_FORMATS),
})
export class SongFormComponent {
  artists$;
  companies$;
  songs$;
  song?: SongModel;
  songForm: FormGroup;
  companies: CompanyInterface[] = [];
  artists: ArtistInterface[] = [];
  countries: string[] = [];
  genres: string[] = [];
  selectedGenres: string[] = [];
  filteredGenres: string[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private songStateService: SongStateService,
    private artistStateService: ArtistStateService,
    private companyStateService: CompanyStateService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>
  ) {
    this.songForm = this.fb.group({
      title: [''],
      poster: [''],
      genre: [[]],
      companies: [[]],
      artist: [''], //In the data the structure shows just one artist per song
      country: [''],
      year: [new Date()],
      duration: [''],
      rating: [''],
    });
    this.artists$ = this.artistStateService.artists$;
    this.companies$ = this.companyStateService.companys$;
    this.songs$ = this.songStateService.songs$;
    this.dateAdapter.setLocale('es-ES');
  }

  ngOnInit(): void {
    this.companies$.subscribe((companies) => {
      this.companies = companies;
      this.countries = this.companyStateService.getAllCountries();
    });
    this.artists$.subscribe((artists) => {
      this.artists = artists;
    });
    this.songs$.subscribe(() => {
      this.genres = this.songStateService.getAllGenres();
      const songId = +this.route.snapshot.paramMap.get('id')!;
      if (!songId) {
        this.song = SongModel.newSong();
        return;
      }
      const foundSong = this.songStateService.getSongById(songId);
      if (!foundSong) {
        this.router.navigate(['']);
        return;
      }
      this.song = foundSong;
    });

    this.songForm = this.fb.group({
      title: [this.song?.title || ''],
      poster: [this.song?.poster || ''],
      genre: [this.song?.genre || []],
      companies: [
        this.song?.companies?.map((company) =>
          typeof company === 'number' ? company : company.id
        ) || [],
      ],
      artist: [
        this.song?.artist && typeof this.song.artist === 'number'
          ? this.song.artist
          : (this.song?.artist as ArtistInterface)?.id || '',
      ], //In the data the structure shows just one artist per song
      country: [this.song?.country || ''],
      year: [moment(this.song?.year || new Date().getFullYear(), 'YYYY')],
      duration: [this.song?.duration],
      rating: [this.song?.rating],
    });
  }

  subscribeToForms(): void {
    this.songForm.get('genres')?.valueChanges.subscribe((values) => {
      this.filteredGenres = this.genres.filter(
        (genre) => !values.include(genre)
      );
    });
  }

  add(element: any, collection: any[], name: string): void {
    if (collection.indexOf(element) === -1) {
      collection.push(element);
    }
    this.songForm.get(name)?.setValue('');
  }

  setYear(normalizedMonthAndYear: Date, datepicker: any) {
    this.songForm.get('year')?.setValue(normalizedMonthAndYear);
    datepicker.close();
  }

  onSubmit(): void {
    if (this.songForm.valid) {
      const formData = this.songForm.value;
      this.songStateService.addSong({
        ...formData,
        year: new Date(formData.year).getFullYear(),
        id: this.song?.id,
      });
      this.router.navigate(['']);
    }
  }
}
