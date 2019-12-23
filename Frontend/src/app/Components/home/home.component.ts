import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/Services/movies.service';
import { Movies } from 'src/app/Interfaces/movies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Movies[] = [];

  constructor(public moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getMovies()
    .subscribe(res => {
      this.movies = res;
      console.log(res);
    });
  }

  preview(_id: string) {
    this.router.navigate([`/details/${_id}`]);
  }

}
