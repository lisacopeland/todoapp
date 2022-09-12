import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemsEffects } from './+state/todo-item.effects';
import { todoItemsReducer, TODOITEMS_FEATURE_KEY } from './+state/todo-item.reducer';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditItemComponent } from './edit-item/edit-item.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { TodosRoutingModule } from './todos-routing.module';

@NgModule({
  declarations: [
    TodoTableComponent,
    EditItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,    
    TodosRoutingModule,
    StoreModule.forFeature(TODOITEMS_FEATURE_KEY, todoItemsReducer ),
    EffectsModule.forFeature([ TodoItemsEffects]),    
  ]
})
export class TodosModule { }
