interface Category {
  id: string;
  color: string;
  label: string;
  type: "ritual" | "activity";
  // only activities
  count?: number;
}

interface ICategoriesPerformed {
  category: Category;
  timesPerformed: number;
}

export interface Day {
  rituals: ICategoriesPerformed[];
  activities: ICategoriesPerformed[];
  dayPerformed: number;
}
