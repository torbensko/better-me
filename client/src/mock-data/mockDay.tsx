import dayjs from "dayjs";
import { IDay } from "../types/IDay";

export const mockDay: IDay = {
  rituals: [
    {
      timesPerformed: 0,
      activity: {
        id: 1,
        title: "No caffeine",
        type: "ritual",
        color: "red"
      }
    },
    {
      timesPerformed: 1,
      activity: {
        id: 2,
        title: "No alcohol",
        type: "ritual",
        color: "blue"
      }
    }
  ],
  activities: [],
  date: dayjs().toISOString()
};
