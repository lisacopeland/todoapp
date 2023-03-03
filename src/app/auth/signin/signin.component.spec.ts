import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAuthError } from '../+state/auth.reducers';

import { SigninComponent } from './signin.component';

fdescribe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let mockStore: MockStore;
  let dispatchSpy;
  let formElement: HTMLElement;
  let usernameInput;
  let passwordInput;
  let submitButton;
  let loginForm;
  let usernameControl;
  let passwordControl;

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
  const initialLoginFormValues = {
    email: '',
    password: '',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [FormsModule, ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [
        { provide: FormBuilder },
        provideMockStore({ initialState: storeState }),
      ],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    fixture.detectChanges();
    component.ngOnInit();
    const loginForm = component.form;
    usernameControl = loginForm.get('email') as FormControl;
    passwordControl = loginForm.get('password') as FormControl;
    formElement =
      fixture.debugElement.nativeElement.querySelector('#loginform');
    usernameInput = formElement.querySelector('#email');
    passwordInput = formElement.querySelector('#password');
    submitButton = formElement.querySelector('#submit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the correct inputs', () => {
    const inputs = formElement.querySelectorAll('input');
    expect(inputs.length).toEqual(2);
  });

  it('should have the correct initial values and state', () => {
    const loginForm = component.form;
    usernameControl = loginForm.get('email') as FormControl;
    passwordControl = loginForm.get('password') as FormControl;
    expect(loginForm.value).toEqual(initialLoginFormValues);
    expect(loginForm.valid).toBeFalsy();
    expect(usernameControl.errors['required']).toBeTruthy();
    expect(passwordControl.errors['required']).toBeTruthy();
    formElement =
      fixture.debugElement.nativeElement.querySelector('#loginform');
    submitButton = formElement.querySelector('#submit');
    expect(submitButton.disabled).toBeTruthy;
  });

  it('should call the authError selector', () => {
    mockStore.overrideSelector(selectAuthError, 'fake auth error');
    component.ngOnInit();
    const loginForm = component.form;
    expect(component.errorMessage).toBe('fake auth error');
    expect(loginForm.value).toEqual(initialLoginFormValues);
    formElement =
      fixture.debugElement.nativeElement.querySelector('#loginform');
    submitButton = formElement.querySelector('#submit');
    expect(submitButton.disabled).toBeTruthy;
  });

  it('should accept valid inputs', () => {
    const loginFormValues = {
      email: 'sample@msn.com',
      password: 'testing',
    };
    formElement =
      fixture.debugElement.nativeElement.querySelector('#loginform');
    usernameInput = formElement.querySelector('#email');
    passwordInput = formElement.querySelector('#password');
    submitButton = formElement.querySelector('#submit');
    usernameInput.value = 'sample@msn.com';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'testing';
    passwordInput.dispatchEvent(new Event('input'));
    const loginForm = component.form;
    usernameControl = loginForm.get('email') as FormControl;
    passwordControl = loginForm.get('password') as FormControl;
    expect(loginForm.value).toEqual(loginFormValues);
    expect(loginForm.valid).toBeTruthy();
    expect(usernameControl.errors).toBeNull();
    expect(passwordControl.errors).toBeNull();
    expect(submitButton.disabled).toBeFalsy;
  });
});
