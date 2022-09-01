import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { TodoItem } from '../todo-item.model';
import { Store } from '@ngrx/store';
import { loadTodoItemsAction } from '../+state/todo-item.actions';
import { selectAllTodoItems } from '../+state/todo-item.reducer';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {

  username = 'Lisa';
  constructor(private store: Store) { }

  todoItems$ = this.store.select(selectAllTodoItems);
  sortSelection = null;
  sortOptions = [
    {
      name: 'Task'
    },
    {
      name: 'DueDate'
    },
    {
      name: 'Priority'
    }

  ]
  editing = false;
  selectedTodoItem: TodoItem = null;

  ngOnInit() {
    this.store.dispatch(loadTodoItemsAction({ search: { username: 'Lisa' }, index: '' }));
  }

  onSortChange() {
    console.log('current sort selection is ', this.sortSelection);
    if (this.sortSelection === null) {
      // use the general query
      this.store.dispatch(loadTodoItemsAction({ search: { username: 'Lisa' }, index: '' }));

    } else {
      const index = this.sortSelection + '-index';
      this.store.dispatch(loadTodoItemsAction({ search: { username: 'Lisa' }, index: index }));

    }
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
    this.editing = false;
  }
}
