import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from './todo-item.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = `http://localhost:7179/todos/todo`;

  constructor(private http: HttpClient) { }

  query(search: Partial<TodoItem>, sortBy?: string): Observable<TodoItem[]> {
    const searchObject: any = {...search};
    if (sortBy !== undefined && sortBy !== '') {
      searchObject.sortBy = sortBy;
    }

    const url = this.apiUrl;
    console.log('going to url ', url, 'search: ', search)
    const params = new HttpParams({ fromObject: searchObject });
    return this.http.get<TodoItem[]>(url, { params });
  }

  create(todoItem: TodoItem): Observable<TodoItem> {
    const url = this.apiUrl;
    console.log('going to post to ', url);
    return this.http.post<TodoItem>(url, todoItem);
  }

  update(todoItem: TodoItem): Observable<TodoItem> {
    const url = this.apiUrl;
    return this.http.put<TodoItem>(url, todoItem);
  }

  delete(username: string, id: string): Observable<TodoItem> {
    const url = this.apiUrl;
    const params = new HttpParams()
      .append(username, username)
      .append(id, id);
    return this.http.delete<TodoItem>(url, { params });
  }
}
