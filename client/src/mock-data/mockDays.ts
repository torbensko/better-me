import dayjs from "dayjs";
import { random } from "lodash";
import { IDay } from "../types/IDay";
import { mockActivitiesTypes } from "./activityTypes";

export const mockDays: IDay[] = [];

const mockActivities = mockActivitiesTypes.filter((a) => a.type === "activity");
const mockRituals = mockActivitiesTypes.filter((a) => a.type === "ritual");

for (let m = 0; m < 12; m++) {
  const dayCount: number = dayjs().month(m).daysInMonth();
  for (let d = 0; d < dayCount; d++) {
    mockDays.push({
      date: dayjs()
        .date(d + 1)
        .month(m)
        .toISOString(),
      activities: mockActivities.map((a) => ({
        activity: a,
        timesPerformed: random(a.maxCount || 1)
      })),
      rituals: mockRituals.map((a) => ({
        activity: a,
        timesPerformed: random(a.maxCount || 1)
      }))
    });
  }
}
