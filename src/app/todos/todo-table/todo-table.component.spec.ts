import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { selectUserEmail } from 'src/app/auth/+state/auth.reducers';
import { SharedModule } from 'src/app/shared/shared.module';
import { loadTodoItemsAction } from '../+state/todo-item.actions';
import {
  selectAllTodoItems,
  TodoItemsState,
} from '../+state/todo-item.reducer';
import { TodoItem } from '../todo-item.model';

import { TodoTableComponent } from './todo-table.component';

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;
  let mockStore: MockStore;
  let testEmail: string;
  let dispatchSpy;
  // This could be whatever you want to be when you create the component
  const storeState = {
    todoItems: {
      current: '',
      currentTodoItem: null,
      todoItems: []
    },
    auth: {
      email: null,
      authError: null,
      userLoggedIn: false,
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoTableComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore({ initialState: storeState })],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    // fixture.detectChanges();
  });

  it('should create with empty list', () => {
    testEmail = 'snoopy@live.com';
    const fakeTodoItems = [];
    const action = loadTodoItemsAction({
      search: { username: testEmail },
      index: '',
    });
    mockStore.overrideSelector(selectUserEmail, testEmail);
    mockStore.overrideSelector(selectAllTodoItems, fakeTodoItems);
    component.ngOnInit();
    // Expect the list of todos to be empty
    fixture.detectChanges();
    const componentElement = fixture.debugElement.nativeElement.querySelector(
      '#todotablecomponent'
    );
    const emptyMessage = componentElement.querySelector('tbody');
    const message = emptyMessage.innerText;
    expect(component.email).toBe(testEmail);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(message).toContain('Please add a Todo Item to get started');
  });

  it('selectUserEmail returns null', () => {
    testEmail = null;
    mockStore.overrideSelector(selectUserEmail, testEmail);
    component.ngOnInit();

    fixture.detectChanges();
    const componentElement = fixture.debugElement.nativeElement.querySelector(
      '#todotablecomponent'
    );
    const emptyMessage = componentElement.querySelector('tbody');
    const message = emptyMessage.innerText;
    expect(component.email).toBeNull();
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(message).toContain('Please add a Todo Item to get started');
    expect(component.searchSelection).toBe('');
    expect(component.sortSelection).toBeNull();


  });

  it('todoItems selector returns data', () => {
    testEmail = 'snoopy@gmail.com';
    const fakeTodoItems = [];

    const todoItem1 = new TodoItem({
      id: '3',
      username: 'Lisa',
      dateAdded: '1/2/2000',
      dueDate: '1/2/2000',
      task: 'Walk dog',
      priority: '2',
    });

    const todoItem2 = new TodoItem({
      id: '4',
      username: 'Lisa',
      dateAdded: '1/2/2000',
      dueDate: '1/2/2000',
      task: 'Walk dog',
      priority: '2',
    });
    fakeTodoItems.push(todoItem1);
    fakeTodoItems.push(todoItem2);
    mockStore.overrideSelector(selectUserEmail, testEmail);
    mockStore.overrideSelector(selectAllTodoItems, fakeTodoItems);
    component.ngOnInit();
    fixture.detectChanges();
    const loadAction = loadTodoItemsAction({
      search: { username: testEmail },
      index: '',
    });
    expect(dispatchSpy).toHaveBeenCalledWith(loadAction);
    fixture.detectChanges();

    const componentElement = fixture.debugElement.nativeElement.querySelector(
      '#todotablecomponent'
    );
    expect(component.email).toBe(testEmail);

  });
});
