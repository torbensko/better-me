import { IDay } from "../../types/IDay";

export const mockDay: IDay = {
  rituals: [
    {
      timesPerformed: 0,
      activity: {
        id: "1",
        label: "No caffeine",
        type: "ritual",
        color: "red"
      }
    },
    {
      timesPerformed: 1,
      activity: {
        id: "1",
        label: "No alcohol",
        type: "ritual",
        color: "blue"
      }
    }
  ],
  activities: [],
  date: 1
};
