import { Component, OnInit } from '@angular/core';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  content = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
  }
  saveContent(): void {
    const data = {
      title: this.content.title,
      description: this.content.description
    };

    this.contentService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
    }
    newContent(): void {
      this.submitted = false;
      this.content = {
        title: '',
        description: '',
        published: false
      };
    }

}
