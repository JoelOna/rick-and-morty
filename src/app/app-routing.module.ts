import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterViewComponent } from './characteres/character-view/character-view.component';
import { CharacteresComponent } from './characteres/characteres.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { EpisodeViewComponent } from './episodes/episode-view/episode-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  {path:'', component: HomeComponent,title: 'Home | Rick and Morty'},
  {path:'characteres', component: CharacteresComponent, title: 'Characteres | Rick and Morty'},
  {path:'characteres/character/:id', component: CharacterViewComponent},
  {path:'locations', component: LocationComponent,title : 'Locations | Rick and Morty'},
  {path:'episodes', component: EpisodesComponent, title: 'Episodes | Rick and Morty'},
  {path:'episodes/episode/:id', component: EpisodeViewComponent},
  {path:'about-me',component:AboutMeComponent, title: 'About me | Rick and Morty'},
  { path: '**', pathMatch: 'full', component: NotFoundComponent , title: '404 Not found | Rick and Morty'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
