import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoTableComponent } from './todo-table/todo-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/todotable', pathMatch: 'full' },
  { path: 'todotable', component: TodoTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
