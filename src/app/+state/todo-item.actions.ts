import { createAction, props } from '@ngrx/store';
import { TodoItem } from '../todo-item.model';

// TODO: Implement an error popup

export const loadTodoItemsAction = createAction(
    'TodoItems: Load All',
    props<{ search: Partial<TodoItem> }>()
)
export const setTodoItemsAction = createAction(
    'TodoItems: Set All',
    props<{ payload: TodoItem[] }>()
)
export const setCurrentTodoItemAction = createAction(
    'TodoItems: Set Current',
    props<{ id: string }>()
);
export const createTodoItemAction = createAction(
    'TodoItems: Create',
    props<{ payload: TodoItem }>()
);
export const todoItemCreatedAction = createAction(
    'TodoItems: Created',
    props<{ payload: { todoItem: TodoItem } }>()
);
export const updateTodoItemAction = createAction(
    'TodoItems: Update',
    props<{ changes: TodoItem }>()
);
export const todoItemUpdatedAction = createAction(
    'TodoItems: Updated',
    props<{ payload: { changes: Partial<TodoItem> } }>()
);
export const deleteTodoItemAction = createAction(
    'TodoItems: Delete',
    props<{ id: string }>()
);
export const todoItemDeletedAction = createAction(
    'TodoItems: Deleted',
    props<{ payload: { id: string } }>()
);
