import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CreateComponent } from './Components/create/create.component';
import { DetailsComponent } from './Components/details/details.component';
import { MainComponent } from './Components/main/main.component';


const routes: Routes = [
  {path: 'home', component: MainComponent},
  {path: 'movies', component: HomeComponent},
  {path: 'movies/create', component: CreateComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
