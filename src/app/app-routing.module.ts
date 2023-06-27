import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterViewComponent } from './characteres/character-view/character-view.component';
import { CharacteresComponent } from './characteres/characteres.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'characteres', component: CharacteresComponent},
  {path:'characteres/character/:id', component: CharacterViewComponent},
  {path:'locations', component: LocationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
