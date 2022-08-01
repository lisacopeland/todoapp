import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from './todo-item.mode.l';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = `http://localhost:5263/todo`;

  constructor(private http: HttpClient) { }

  query(aid:string, search: Partial<TodoItem>): Observable<TodoItem[]> {
    const searchObject: any = search;
    const url = this.apiUrl;
    console.log('going to url ', url, 'search: ', search)
    const params = new HttpParams({ fromObject: searchObject });
    return this.http.get<TodoItem[]>(url, { params });
  }

  create(TodoItem: TodoItem): Observable<TodoItem> {
    const url = this.apiUrl;
    return this.http.post<TodoItem>(url, TodoItem);
  }

  update(TodoItem: TodoItem): Observable<TodoItem> {
    const url = this.apiUrl;
    return this.http.put<TodoItem>(url, TodoItem);
  }

  delete(username: string, id: string): Observable<TodoItem> {
    const url = this.apiUrl;
    const params = new HttpParams()
      .append(username, username)
      .append(id, id);
    return this.http.delete<TodoItem>(url, { params });
  }
}