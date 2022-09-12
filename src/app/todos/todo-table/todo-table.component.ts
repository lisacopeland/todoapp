import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../todo-item.model';
import { Store } from '@ngrx/store';
import { loadTodoItemsAction } from '../+state/todo-item.actions';
import { selectAllTodoItems } from '../+state/todo-item.reducer';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { selectUserEmail } from '../../auth/+state/auth.reducers';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit {

  constructor(private store: Store) { }

  email = null;
  todoItems$ = this.store.select(selectAllTodoItems);
  searchSelection = '';
  searchInput: Subject<string> = new Subject();
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
    this.store.select(selectUserEmail).subscribe(email => {
      if (email !== null) {
        this.email = email;
        this.store.dispatch(loadTodoItemsAction({ search: { username: this.email }, index: '' }));
      }
    });    
     this.searchInput.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      console.log('search value is now ', value);
    });
  }

  onSortChange() {
    console.log('current sort selection is ', this.sortSelection);
    if (this.sortSelection === null) {
      // use the general query
      this.store.dispatch(loadTodoItemsAction({ search: { username: this.email }, index: '' }));

    } else {
      const index = this.sortSelection + '-index';
      this.store.dispatch(loadTodoItemsAction({ search: { username: this.email }, index: index }));

    }
  }

  onSearchChange(event) {
    this.searchInput.next(event);
  }

  onAdd() {
    console.log('going to create a new todoItem');
    this.selectedTodoItem = new TodoItem({
      username: this.email,
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
