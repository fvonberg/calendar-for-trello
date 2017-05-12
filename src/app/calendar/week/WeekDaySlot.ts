import {CalendarDay} from "../../shared/models/calendar-day";
import {Card} from "../../shared/models/card";
export class WeekDaySlot {
  constructor(public time: string, // <- currently localized
              public cards?: Card[],
              public CalendarDay?: CalendarDay,
              public hours?: number) {

  }
}
