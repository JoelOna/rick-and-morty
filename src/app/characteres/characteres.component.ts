import { Component, Input, OnInit } from '@angular/core';
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
  @Input() search: boolean = true;
  @Input() characteres: ICharacter[] = []


  ngOnInit(): void {
    console.log(this.characteres);
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
  pageSize = 20;
  pageIndex = 0;

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


    if (this.filtered) {
      const prevPage = e.previousPageIndex ? e.previousPageIndex : 0
      if (prevPage > e.pageIndex) {
        console.log(this.queryBack)
        fetch(this.queryBack)
          .then(resp => resp.json())
          .then(data => {
            console.log('Data prev', data)
            this.characteres = []
            this.characteres = data.results
          })
      } else {
        fetch(this.query)
          .then(resp => resp.json())
          .then(data => {
            this.queryBack = data.info.prev
            if (data.info.next != this.query && data.info.next != null) {
              this.characterService.getCharacteresFilQuery(data.info.next).subscribe(
                response => {
                  this.characteres = response.body.results
                  console.log('Filtro', this.characteres)
                }
              )
            }
          })
      }


      console.log('FILTRO');

    } else {
      this.characterService.getCharactersPage(e.pageIndex).subscribe(
        resp => {
          this.characteres = resp.body.results
          console.log(resp.body.results);

        }
      )
    }
  }
  errorMessage: string = ''
  filtered: boolean = false
  query: string = ''
  queryBack: string = ''
  addItem(newItem: any) {

    if (this.characteres.length != newItem.info.count) {
      this.characteres = newItem.results
      this.filtered = true
    }


    if (newItem.info.next != null) {
      this.query = newItem.info.next
    }
  
    this.length = newItem.info.count
    this.pageSize = 20
  }
}
