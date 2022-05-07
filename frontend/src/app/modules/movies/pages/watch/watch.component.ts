import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { MovieMeta } from 'src/app/shared/movie/movie-meta';
import { MovieService } from 'src/app/shared/movie/movie.service';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchComponent implements OnInit {
    movie$!: Observable<MovieMeta | 1>;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService
    ) { }

    ngOnInit(): void {
        this.movie$ = this.route.paramMap.pipe(
            switchMap(params => this.movieService.getMovieById(params.get('id')!)),
            map(v => v === undefined ? 1 : v),
        );
    }
}
