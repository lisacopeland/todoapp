import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { createTodoItemAction, deleteTodoItemAction, updateTodoItemAction } from '../+state/todo-item.actions';
import { TodoItem } from '../todo-item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  @Input() todoItem: TodoItem;
  @Output() action = new EventEmitter<any>();

  editTitle = '';
  form: FormGroup;
  newItem = false;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    console.log('Hi from edit todoItem item is ', this.todoItem);
    if (this.todoItem.id === undefined) {
      console.log('this is new!!');
      this.newItem = true;
      this.editTitle = 'New todo list item';
    } else {
      console.log('editing an existing!');
      this.editTitle = 'Edit existing todo list item';
      this.newItem = false;
    }
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      task: [this.todoItem.task, Validators.required],
      priority: [parseInt(this.todoItem.priority)],
      dueDate: [moment(new Date(this.todoItem.dueDate))],
    });
  }

  onDelete() {
    this.store.dispatch(deleteTodoItemAction({ id: this.todoItem.id }));
    this.action.emit({ action: 'delete' });
  }

  onSubmit() {
    const newTodo = new TodoItem(this.todoItem);
    newTodo.task = this.form.value.task;
    newTodo.priority = this.form.value.priority.toString();
    newTodo.dueDate = moment(this.form.value.dueDate).format('MM/DD/YY');
    newTodo.dateAdded = moment(new Date()).format('MM/DD/YY');
    console.log('todoItem is now ', newTodo);
    if (this.newItem) {
      this.store.dispatch(createTodoItemAction({ payload: newTodo }));
    } else {
      this.store.dispatch(updateTodoItemAction({ changes: newTodo }));
    }
    this.action.emit({ action: 'save' });

  }

}
