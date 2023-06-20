import { Component, OnInit } from '@angular/core';
import { CharacteresDataService } from '../services/characteres-data.service';
import { ICharacter } from '../interfaces/icharacter';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.scss']
})
export class CharacteresComponent implements OnInit {
  constructor(private characterService: CharacteresDataService) { }
  characteres: ICharacter[] = []

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe(
      response => {
        if (response.body != null) {
          this.characteres = response.body.results
          this.length = response.body.info.count
          this.pageSize = response.body.results.length

        }
      }, error => {
        console.log('errror')
      }
    )
  }


  length = 0
  pageSize = 0;
  pageIndex = 1;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.characterService.getCharactersPage(e.pageIndex).subscribe(
      resp => {
        this.characteres = resp.body.results
        console.log('Cambio');
        console.log(resp.body.results);


      }
    )
  }
}
