import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from '../todo-item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  @Input() todoItem: TodoItem;
  editTitle = '';
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('Hi from edit todoItem item is ', this.todoItem);
    if (this.todoItem.id === undefined) {
      console.log('this is new!!');
      this.editTitle = 'New todo list item';
    } else {
      console.log('editing an existing!');
      this.editTitle = 'Edit existing todo list item';
    }
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      task: [this.todoItem.task, Validators.required],
      priority: [parseInt(this.todoItem.priority)],
      dueDate: [new Date(this.todoItem.dueDate)],
    });
  }

  onSubmit() {
    const newTodo = new TodoItem(this.todoItem);
    newTodo.task = this.form.value.task;
    newTodo.priority = this.form.value.priority.toString();
    newTodo.dueDate = this.form.value.dueDate;
    console.log('todoItem is now ', this.todoItem);
  }

}
