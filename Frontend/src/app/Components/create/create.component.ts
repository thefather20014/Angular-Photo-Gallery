import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MoviesService } from 'src/app/Services/movies.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  file: File;
  photoSelected: string | ArrayBuffer;

  list: string[] = [
    'Action', 'Adventure', 'Psychological', 'Slice Of Life', 'Romance',
    'Science Fiction', 'Thriller'
  ];

  list2: string[] = ['PG', 'F', 'G', 'R', 'PG-13', 'NC-17', 'Unrated'];

  list4: string[] = ['United States', 'Francia', 'Canada', 'Europa', 'Asia', 'Korea', 'Japon', 'Australia'
    , 'Africa'];

  list5: string[] = ['English', 'Spanish', 'Russian', 'Chinese', 'Japanese', 'French'];

  list6: string[] = ['720p', '1080p', '720p/1080p', '2k', '4k', '2k/4k'];

  message: any = '';

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
  }

  onPhotoSelected(event: HtmlInputEvent): void {

    if (event.target.files && event.target.files[0]) {
      // tslint:disable-next-line:no-angle-bracket-type-assertion
      this.file = <File> event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  // tslint:disable-next-line:max-line-length
  formData(Title: HTMLInputElement, Duration: HTMLInputElement, Director: HTMLInputElement, Resolution: HTMLSelectElement, Genre: HTMLSelectElement, Rating: HTMLSelectElement, Description: HTMLTextAreaElement, Price: HTMLInputElement, Stars: HTMLInputElement, Date: HTMLInputElement, Country: HTMLSelectElement, Languague: HTMLSelectElement) {
    // tslint:disable-next-line:max-line-length
    this.moviesService.createMovies(Title, Duration, Director, Resolution, Genre, Rating, Description, Price, Stars, Date, Country, Languague, this.file)
      .subscribe(res => {
        console.log(res);
        swal.fire({
          toast: true,
          text: 'Photo Succesfully Saved!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/movies']);
      }, err => {
        console.log(err);
        this.message = err;
      });
    console.log(Date.value, Stars.value, Description.value);
  }

}
