import { Component, OnInit } from '@angular/core';

export interface Day {
  calendarDay: string;
  dayOfWeek: string;
  appointments: string[];

}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  days: Day[] = [];

  ngOnInit(): void {
    for (let i = 1; i<= 30; i++) {
      const day: Day = {
        calendarDay: i.toString(),
        dayOfWeek: 'Saturday',
        appointments: []
      }
      this.days.push(day);
    }
  }

}
