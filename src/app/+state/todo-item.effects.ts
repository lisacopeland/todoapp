import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";

import { TodoService } from "../todo.service";

import { createTodoItemAction, deleteTodoItemAction, loadTodoItemsAction, setTodoItemsAction,
         todoItemCreatedAction, todoItemDeletedAction, todoItemUpdatedAction, updateTodoItemAction } from "./todo-item.actions";

@Injectable()
export class TodoItemsEffects {
    concurrentRequests = 5;

    constructor(
        public service: TodoService,
        public actions$: Actions
    ) { }

    loadTodoItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodoItemsAction),
            mergeMap((action) => {
                return this.service.query(action.search, action.index).pipe(
                    map((response) => {
                        return setTodoItemsAction({ payload: response });
                    })
                );
            }, this.concurrentRequests)
        )
    );

    createTodoItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTodoItemAction),
            mergeMap((action) => {
                return this.service.create(action.payload).pipe(
                    map((response) => {
                        return todoItemCreatedAction({ payload: { todoItem: response }});
                    })
                );
            }, this.concurrentRequests)
        )
    );
    updateTodoItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTodoItemAction),
            mergeMap((action) => {
                return this.service.update(action.changes).pipe(
                    map((response) => {
                        return todoItemUpdatedAction({ payload: { changes: response } });
                    })
                );
            }, this.concurrentRequests)
        )
    );
    deleteTodoItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTodoItemAction),
            mergeMap((action) => {
                return this.service.delete('Lisa', action.id).pipe(
                    map((response) => {
                        return todoItemDeletedAction({ payload: { id: action.id } });
                    })
                );
            }, this.concurrentRequests)
        )
    );
}
