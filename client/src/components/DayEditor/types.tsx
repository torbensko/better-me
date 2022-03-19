export interface Activity {
  id: string;
  color: string;
  label: string;
  type: "ritual" | "activity";
  maxCount?: number;
}

export interface IActivityPerformed {
  activity: Activity;
  timesPerformed: number;
}

export interface Day {
  rituals: IActivityPerformed[];
  activities: IActivityPerformed[];
  date: string;
}
