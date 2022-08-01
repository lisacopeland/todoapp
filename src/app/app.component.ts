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
export class AppComponent implements OnInit {
  title = 'TodoApp';
  username = 'Lisa';
  constructor(private store: Store) {}

  todoItems$ = this.store.select(selectAllTodoItems);

  editing = false;
  selectedTodoItem: TodoItem = null;

  ngOnInit() {
    this.store.dispatch(loadTodoItemsAction({ search: { username: 'Lisa '} }));

  }

  onAdd() {
    console.log('going to create a new todoItem');
    this.selectedTodoItem = new TodoItem({
      username: this.username,
      dateAdded: new Date().toDateString(),
      priority: '5',
      dueDate: new Date().toDateString(),
      task: 'Water the plants'
    });
    console.log('selectedTodoItem is ', this.selectedTodoItem);
    this.editing = true;
  }

  onRowSelect() {
    console.log('selectedTodoItem is ', this.selectedTodoItem);
    this.editing = true;
  }

  onSidebarHide() {
    this.selectedTodoItem = null;
  }
}
