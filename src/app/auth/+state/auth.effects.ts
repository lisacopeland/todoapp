import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import { mergeMap, map } from "rxjs";
import { confirmSignupUserAction, loginAction, logOutUserAction, setAuthErrorAction, setUserAction, signedupConfirmedAction, signupUserAction, userLoggedOutAction, userSignedupAction } from "./auth.actions";

@Injectable()
export class AuthEffects {
    concurrentRequests = 5;

    constructor(
        public service: AuthService,
        public actions$: Actions
    ) { }

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginAction),
            mergeMap((action) => {
                return this.service.signIn(action.payload.email, action.payload.password).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        if (response) {
                            const jwt = response.AccessToken;
                            localStorage.setItem('jwt', jwt);
                            return setUserAction({ payload: { email: action.payload.email } });
                        } else {
                            return setAuthErrorAction({ payload: { error: "error"} })
                        }
                    })
                );
            }, this.concurrentRequests)
        )
    );

    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signupUserAction),
            mergeMap((action) => {
                return this.service.signUp(action.payload.email, action.payload.password).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        if (response) {
                            return userSignedupAction({ payload: { email: action.payload.email } });
                        } else {
                            return setAuthErrorAction({ payload: { error: "error" } })
                        }

                    })
                );
            }, this.concurrentRequests)
        )
    );

    confirmSignUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmSignupUserAction),
            mergeMap((action) => {
                return this.service.confirmSignUp(action.payload.email, action.payload.confirmationCode).pipe(
                    map((response) => {
                        console.log('response from query : ', response);
                        if (response) {
                            return signedupConfirmedAction({ payload: { email: action.payload.email } });
                        } else {
                            return setAuthErrorAction({ payload: { error: "error" } })
                        }
                    })
                );
            }, this.concurrentRequests)
        )
    );

}
