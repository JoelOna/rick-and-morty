import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CharacteresComponent } from './characteres/characteres.component';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterCharactersComponent } from './characteres/filter-characters/filter-characters.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { FooterComponent } from './footer/footer.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CharacterViewComponent } from './characteres/character-view/character-view.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { EpisodeViewComponent } from './episodes/episode-view/episode-view.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CharacteresComponent,
    FilterCharactersComponent,
    HomeComponent,
    LocationComponent,
    FooterComponent,
    CharacterViewComponent,
    EpisodesComponent,
    EpisodeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
