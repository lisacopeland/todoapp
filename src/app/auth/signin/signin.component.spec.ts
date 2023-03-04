import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  click,
  findEl,
  setFieldValue,
} from 'src/app/testing-helpers/element.spec-helper';
import { loginAction } from '../+state/auth.actions';
import { selectAuthError } from '../+state/auth.reducers';

import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let mockStore: MockStore;
  let dispatchSpy;
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the correct inputs', () => {
    component.ngOnInit();
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toEqual(2);
  });

  it('should have the correct initial values and state', () => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const loginForm = component.form;
      usernameControl = loginForm.get('email') as FormControl;
      passwordControl = loginForm.get('password') as FormControl;
      expect(loginForm.value).toEqual(initialLoginFormValues);
      expect(loginForm.valid).toBeFalsy();
      expect(usernameControl.errors['required']).toBeTruthy();
      expect(passwordControl.errors['required']).toBeTruthy();
      const submitButton = findEl(fixture, 'submit');
      expect(submitButton.nativeElement.disabled).toBeTruthy;
    });
  });

  it('should call the authError selector', () => {
    component.ngOnInit();
    mockStore.overrideSelector(selectAuthError, 'fake auth error');
    fixture.detectChanges();
    const loginForm = component.form;
    expect(component.errorMessage).toBe('fake auth error');
    expect(loginForm.value).toEqual(initialLoginFormValues);
    const submitButton = findEl(fixture, 'submit');
    expect(submitButton.nativeElement.disabled).toBeTruthy;
  });

  it('should accept valid inputs', () => {
    component.ngOnInit();
    setFieldValue(fixture, 'email', 'sample@msn.com');
    setFieldValue(fixture, 'password', 'testing');
    const loginFormValues = {
      email: 'sample@msn.com',
      password: 'testing',
    };

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      setTimeout(() => {
        const loginForm = component.form;
        usernameControl = loginForm.get('email') as FormControl;
        passwordControl = loginForm.get('password') as FormControl;
        expect(loginForm.value).toEqual(loginFormValues);
        expect(loginForm.valid).toBeTruthy();
        expect(usernameControl.errors).toBeNull();
        expect(passwordControl.errors).toBeNull();
        const submitButton = findEl(fixture, 'submit');
        expect(submitButton.nativeElement.disabled).toBeFalsy;
      }, 500);
    });
  });

  it('should dispatch loginAction on submitbutton click', () => {
    component.ngOnInit();
    const loginFormValues = {
      email: 'sample@msn.com',
      password: 'testing',
    };
    const loginForm = component.form;
    loginForm.setValue(loginFormValues);
    console.log('loginform is ', loginForm.valid);
    const submitButton = findEl(fixture, 'submit');
    console.log(
      'submitbutton disabled is  ',
      submitButton.nativeElement.disabled
    );
    // click(fixture, 'submit');
    const action = loginAction({
      payload: {
        email: loginFormValues.email,
        password: loginFormValues.password,
      },
    });
    component.onSubmit();
    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
