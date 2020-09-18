import { Component, OnInit } from '@angular/core';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-list-content',
  templateUrl: './list-content.component.html',
  styleUrls: ['./list-content.component.css']
})
export class ListContentComponent implements OnInit {

  contents: any;
  currentContent = null;
  currentIndex = -1;
  title = '';

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.retrieveContents();
  }

  retrieveContents(): void {
    this.contentService.getAll()
      .subscribe(
        data => {
          this.contents = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveContents();
    this.currentContent = null;
    this.currentIndex = -1;
  }

  setActiveContent(content, index): void {
    this.currentContent = content;
    this.currentIndex = index;
  }

  removeAllContents(): void {
    this.contentService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveContents();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.contentService.findByTitle(this.title)
      .subscribe(
        data => {
          this.contents = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
