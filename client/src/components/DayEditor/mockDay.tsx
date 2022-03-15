import { Day } from "./types";

export const mockDay: Day = {
  rituals: [{
    timesPerformed: 0,
    category: {
      id: "1",
      label: "No caffeine",
      type: "ritual",
      color: "red"
    }
  }, {
    timesPerformed: 1,
    category: {
      id: "1",
      label: "No alcohol",
      type: "ritual",
      color: "blue"
    }
  }],
  activities: [],
  dayPerformed: 1
};
