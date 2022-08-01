export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export class TodoItem {
    id?: string;
    userName?: string;
    dateAdded?: string;
    dueDate?: string;
    task?: string;
    priority?: string;

    constructor(defaultValues: Partial<TodoItem>) {
        Object.keys(defaultValues).forEach((key) => {
            this[key] = defaultValues[key];
        });
    }

    clone() {
        return new TodoItem(deepCopy(this));
    }
}

export function mapToTodoItem(data: any): TodoItem {
    return new TodoItem(data);
}
export function mapToTodoItems(data: any[]): TodoItem[] {
    if ((data !== undefined) && (data.length)) {
        const allData = data.map(mapToTodoItem);
        return allData;
    } else {
        return [];
    }
}

