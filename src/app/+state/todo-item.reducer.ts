import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import { TodoItem, mapToTodoItems, mapToTodoItem } from '../todo-item.model';
import {
    loadTodoItemsAction,
    setTodoItemsAction,
    todoItemCreatedAction,
    todoItemUpdatedAction,
    todoItemDeletedAction,
    setCurrentTodoItemAction,
} from './todo-item.actions';

export interface TodoItemsState {
    todoItems: TodoItem[];
    current: string;
    currentTodoItem: TodoItem;
    todoItemsLoaded: boolean;
}

const initialState: TodoItemsState = {
    current: '',
    currentTodoItem: null,
    todoItems: [],
    todoItemsLoaded: false
};

export const TodoItems_FEATURE_KEY = 'todoItems';

export const todoItemsReducer = createReducer(
    initialState,
    on(loadTodoItemsAction, (state, action) => {
        const newState = initialState;
        return newState;
    }),
    on(setTodoItemsAction, (state, action) => {
        console.log('setting TodoItems action!');
        const newState = { ...state, todoItems: mapToTodoItems(action.payload), todoItemsLoaded: true };
        return newState;
    }),
    on(todoItemCreatedAction, (state, action) => {
        const TodoItems = [...state.todoItems];
        TodoItems.push(mapToTodoItem(action.payload.todoItem));
        const newState = { ...state, todoItems: TodoItems };
        return newState;
    }),
    on(setCurrentTodoItemAction, (state, action) => {
        let newState = { ...state };
        const idx = state.todoItems.findIndex(x => x.id === action.id);
        if (idx !== -1) {
            const currentTodoItem = mapToTodoItem(state.todoItems[idx]);
            const todoItems = [...state.todoItems];
            todoItems[idx] = currentTodoItem;
            newState = { ...state, todoItems: todoItems, currentTodoItem: currentTodoItem, current: action.id };
            return newState;
        } else {
            return newState;
        }
    }),
    on(todoItemUpdatedAction, (state, action) => {
        const todoItems = [...state.todoItems];
        const idx = todoItems.findIndex(x => x.id === action.payload.changes.id);
        const newItem = mapToTodoItem(action.payload.changes)
        const updatedTodoItem = new TodoItem({
            ...state.todoItems[idx],
            ...newItem,
        });
        todoItems.splice(idx, 1, updatedTodoItem)
        const newState = { ...state, todoItems: todoItems };
        return newState;
    }),
    on(todoItemDeletedAction, (state, action) => {
        const todoItems = [...state.todoItems];
        const idx = todoItems.findIndex(x => x.id === action.payload.id);
        todoItems.splice(idx, 1)
        const newState = { ...state, todoItems: todoItems };
        return newState;
    })
);

export const getTodoItemsState = createFeatureSelector<TodoItemsState>(TodoItems_FEATURE_KEY);

export const selectAll = createSelector(
    getTodoItemsState,
    (state: TodoItemsState) => state
);

export const selectAllTodoItems = createSelector(selectAll, (state) => mapToTodoItems(state.todoItems)
);

export const selectTodoItemsLoaded = createSelector(selectAll, (state) =>
    state.todoItemsLoaded
);

export const selectCurrentTodoItem = createSelector(selectAll, (state) =>
    state.currentTodoItem
);
