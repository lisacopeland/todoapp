import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { createTodoItemAction } from '../+state/todo-item.actions';
import { todoItemsReducer, TodoItemsState, TODOITEMS_FEATURE_KEY } from '../+state/todo-item.reducer';
import { TodoItem } from '../todo-item.model';

import { EditItemComponent } from './edit-item.component';
import * as moment from 'moment';

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;
  let mockStore: MockStore;
  // let store: Store<TodoItemsState>;
  let todoItem;
  const initialState: TodoItemsState = {
    current: '',
    currentTodoItem: null,
    todoItems: [],
    todoItemsLoaded: false
};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditItemComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        // StoreModule.forRoot({}),
        // StoreModule.forFeature(TODOITEMS_FEATURE_KEY, todoItemsReducer)
      ],
      providers: [ provideMockStore({ initialState })]
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
   // mockStore = jasmine.createSpyObj('Store', ['dispatch']);
    // const spyStore = spyOn(store, 'dispatch')
    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  // store = TestBed.get(Store);

  // spyOn(store, 'dispatch').and.callThrough();
  it('should create component with item without id', () => {
    todoItem = new TodoItem({
      username: 'snoopy@hotmail.com',
      dateAdded: moment(new Date()).format('MM/DD/YY'),
      priority: '5',
      dueDate: moment(new Date()).format('MM/DD/YY'),
      task: 'Water the plants',
    });
    component.todoItem = todoItem;

    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.newItem).toBeTruthy();
    expect(component.editTitle).toBe('New todo list item');
  });
  it('should create component with item with id', () => {
    todoItem = new TodoItem({
      id: '3',
      username: 'snoopy@hotmail.com',
      dateAdded: moment(new Date()).format('MM/DD/YY'),
      priority: '5',
      dueDate: moment(new Date()).format('MM/DD/YY'),
      task: 'Water the plants',
    });
    component.todoItem = todoItem;
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.newItem).toBeFalsy();
    expect(component.editTitle).toBe('Edit existing todo list item');
  });

  it('should dispatch create on submit of a new item', () => {
    todoItem = new TodoItem({
      username: 'snoopy@hotmail.com',
      dateAdded: moment(new Date()).format('MM/DD/YY'),
      priority: '5',
      dueDate: moment(new Date()).format('MM/DD/YY'),
      task: 'Water the plants',
    });
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    component.todoItem = todoItem;
    component.ngOnInit();
    fixture.detectChanges();
    component.onSubmit();
    const action = createTodoItemAction({ payload: todoItem });
    // expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
