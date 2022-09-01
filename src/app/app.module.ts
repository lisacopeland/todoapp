import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {KnobModule} from 'primeng/knob';
import { EditItemComponent } from './edit-item/edit-item.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './+state/app.reducer';
import { TodoItemsEffects } from './+state/todo-item.effects';
import { todoItemsReducer } from './+state/todo-item.reducer';
import { environment } from '../environments/environment';
import { TodoTableComponent } from './todo-table/todo-table.component';

@NgModule({
  declarations: [AppComponent, EditItemComponent, TodoTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    SliderModule,
    KnobModule,
    InputTextModule,
    CalendarModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreModule.forRoot({ todoItems: todoItemsReducer }),
    EffectsModule.forRoot([TodoItemsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
