import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
    'Auth: Log In',
    props<{ payload: { email: string; password: string}}>()
)
export const setUserAction = createAction(
    'Auth: Set User',
    props<{ payload: { email: string } }>()
)
export const setAuthErrorAction = createAction(
    'Auth: Sign in Error',
    props<{ payload: { error: string } }>()
)
export const signupUserAction = createAction(
    'Auth: Signup User',
    props<{ payload: { email: string; password: string } }>()
);
export const userSignedupAction = createAction(
    'Auth: User Signed Up',
    props<{ payload: { email: string } }>()
);
export const confirmSignupUserAction = createAction(
    'Auth: Confirm Signup User',
    props<{ payload: { email: string; confirmationCode: string } }>()
);
export const signedupConfirmedAction = createAction(
    'Auth: Signed Up Confirmed',
    props<{ payload: { email: string } }>()
);
export const logOutUserAction = createAction(
    'Auth: Log Out',
    props<{ payload: unknown }>()
);
export const userLoggedOutAction = createAction(
    'Auth: User Logged Out',
    props<{ payload: unknown }>()
);
