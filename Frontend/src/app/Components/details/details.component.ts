import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/Services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movies } from 'src/app/Interfaces/movies';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import simpleLightbox from 'simplelightbox';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: string;
  movie: Movies;
  activated = false;
  list: string[] = [
    'Action', 'Adventure', 'Psychological', 'Slice Of Life', 'Romance',
    'Science Fiction', 'Thriller'
  ];

  list2: string[] = ['PG', 'F', 'G', 'R', 'PG-13', 'NC-17', 'Unrated'];

  list4: string[] = ['United States', 'Francia', 'Canada', 'Europa', 'Asia', 'Korea', 'Japon', 'Australia'
    , 'Africa'];

  list5: string[] = ['English', 'Spanish', 'Russian', 'Chinese', 'Japanese', 'French'];

  list6: string[] = ['720p', '1080p', '720p/1080p', '2k', '4k', '2k/4k'];

  message = '';

  constructor(private moviesService: MoviesService, private activedRoute: ActivatedRoute, private router: Router) {
    this.activedRoute.params.subscribe(params => {

      this.id = params['id'];
      this.moviesService.getMovie(this.id)
        .subscribe(res => {
          console.log(res);
          this.movie = res as Movies;
        });
      console.log(this.id);
    });
  }

  ngOnInit() {
  }

  delete(id: string) {
    if (confirm('Are you Sure, you want to delete it?')) {
      this.moviesService.deleteMovie(id)
        .subscribe(res => {
          console.log(res);
          swal.fire({
            toast: true,
            text: 'Movie Succesfully Deleted!',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigate(['/movies']);
        });
    }
  }

  updateForm(id: string, form: NgForm) {
    this.moviesService.updateMovie(id, form.value)
      .subscribe(res => {
        console.log(res);
        swal.fire({
          toast: true,
          text: 'Movie Succesfully Updated!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate([`/details/${id}`]);
        this.activated = false;
      }, err => {
        console.log(err);
        this.message = err;
      });
  }

}
