import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { checkLoginState } from './auth/+state/auth.actions';
import { findEl, getText } from './testing-helpers/element.spec-helper';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore;
  let dispatchSpy;

  const storeState = {
    todoItems: {
      current: '',
      currentTodoItem: null,
      todoItems: [],
    },
    auth: {
      email: null,
      authError: null,
      userLoggedIn: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, StoreModule.forRoot({})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({ initialState: storeState }),
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    fixture.detectChanges();
    const titleText = getText(fixture, 'title');
    expect(titleText).toContain('Todo App');
  });

  it('should dispatch checkLoginState', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const action = checkLoginState({ payload: {} });
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  })
});
