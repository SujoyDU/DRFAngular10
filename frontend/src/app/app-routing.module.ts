import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListContentComponent} from './list-content/list-content.component';
import {DetailContentComponent} from './detail-content/detail-content.component';
import {AddContentComponent} from './add-content/add-content.component';

const routes: Routes = [
  { path: '', redirectTo: 'contents', pathMatch: 'full' },
  { path: 'contents', component: ListContentComponent },
  { path: 'contents/:id', component: DetailContentComponent },
  { path: 'add', component: AddContentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
