import { Component } from '@angular/core';
import { TodoItem } from './todo-item.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TodoApp';
  username = 'Lisa';
  constructor(private todoService: TodoService) {}

  todoItems$ = this.todoService.query({username: this.username}).pipe();
  editing = false;
  selectedTodoItem: TodoItem = null;

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
}
