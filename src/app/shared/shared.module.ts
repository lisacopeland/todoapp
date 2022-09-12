import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KnobModule } from 'primeng/knob';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    SliderModule,
    KnobModule,
    InputTextModule,
    CalendarModule
  ],
  exports: [
    TableModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    SliderModule,
    KnobModule,
    InputTextModule,
    CalendarModule
  ]
})
export class SharedModule { }
