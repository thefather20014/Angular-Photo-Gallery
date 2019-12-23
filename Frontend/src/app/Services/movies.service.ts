import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../Interfaces/movies';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  readonly API = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movies[]>(this.API);
  }

  // tslint:disable-next-line:max-line-length
  createMovies(Title: HTMLInputElement, Duration: HTMLInputElement, Director: HTMLInputElement, Resolution: HTMLSelectElement, Genre: HTMLSelectElement, Rating: HTMLSelectElement, Description: HTMLTextAreaElement, Price: HTMLInputElement, Stars: HTMLInputElement, Date: HTMLInputElement, Country: HTMLSelectElement, Languague: HTMLSelectElement, Photo: File) {
    const fd = new FormData();
    fd.append('Title', Title.value);
    fd.append('Duration', Duration.value);
    fd.append('Director', Director.value);
    fd.append('Resolution', Resolution.value);
    fd.append('Genre', Genre.value);
    fd.append('Rating', Rating.value);
    fd.append('Description', Description.value);
    fd.append('Price', Price.value);
    fd.append('Stars', Stars.value);
    fd.append('Date', Date.value);
    fd.append('Country', Country.value);
    fd.append('Languague', Languague.value);
    fd.append('image', Photo);
    return this.http.post(this.API, fd);
  }

  getMovie(_id: string) {
    return this.http.get(`${this.API}/${_id}`);
  }

  updateMovie(id: string, movie: Movies) {
    return this.http.put(`${this.API}/${id}`, movie);
  }

  deleteMovie(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
