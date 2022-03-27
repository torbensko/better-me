import { IActivityPerformed } from "./IActivityPerformed";
import { ISODate } from "./ISODate";

export interface IDay {
  rituals: IActivityPerformed[];
  activities: IActivityPerformed[];
  date: ISODate;
}
