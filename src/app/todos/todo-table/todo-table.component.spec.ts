import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from 'primeng/api';
import { selectUserEmail } from 'src/app/auth/+state/auth.reducers';
import { loadTodoItemsAction } from '../+state/todo-item.actions';
import { TodoItemsState } from '../+state/todo-item.reducer';

import { TodoTableComponent } from './todo-table.component';

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;
  let mockStore: MockStore;

  // This could be whatever you want to be when you create the component
  const storeState = {
    todoItems: {
      current: '',
      currentTodoItem: null,
      todoItems: [],
      todoItemsLoaded: false,
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
      imports: [BrowserAnimationsModule, SharedModule],
      providers: [provideMockStore({ initialState: storeState })],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    const testEmail = 'snoopy@live.com';
    const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(component).toBeTruthy();
    mockStore.overrideSelector(selectUserEmail, testEmail);
    const action = loadTodoItemsAction({
      search: { username: testEmail },
      index: '',
    });
    // Expect the list of todos to be empty
    fixture.detectChanges();
    expect(component.email).toBe(testEmail);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
