import { IActivityPerformed } from "./IActivityPerformed";

export interface IDay {
  rituals: IActivityPerformed[];
  activities: IActivityPerformed[];
  date: string;
}
