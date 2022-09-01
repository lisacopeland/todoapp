import { Component, OnInit } from '@angular/core';
import { TodoItem } from './todo-item.model';
import { Store } from '@ngrx/store';
import { loadTodoItemsAction } from './+state/todo-item.actions';
import { selectAllTodoItems } from './+state/todo-item.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
