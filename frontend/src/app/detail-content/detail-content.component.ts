import { Component, OnInit } from '@angular/core';
import {ContentService} from '../services/content.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.css']
})
export class DetailContentComponent implements OnInit {

  currentContent = null;
  message = '';

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getContent(this.route.snapshot.paramMap.get('id'));
  }

  getContent(id): void {
    this.contentService.get(id)
      .subscribe(
        data => {
          this.currentContent = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentContent.title,
      description: this.currentContent.description,
      published: status
    };

    this.contentService.update(this.currentContent.id, data)
      .subscribe(
        response => {
          this.currentContent.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateContent(): void {
    this.contentService.update(this.currentContent.id, this.currentContent)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The Content was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteContent(): void {
    this.contentService.delete(this.currentContent.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }
}
