import * as React from "react";
import dayjs from "dayjs";
import { random, times } from "lodash";

import "./styles.css";
import { Medalion } from "../Medalion";

export interface IYearSummaryProps {}

export const YearSummary: React.FC<IYearSummaryProps> = ({}) => {
  return (
    <div className="YearSummary">
      {times(12, (month) => {
        const dayCount: number = dayjs().month(month).daysInMonth();
        return (
          <div className="month">
            {times(dayCount, (day) => (
              <div className="day">
                <Medalion
                  size={20}
                  rituals={[
                    {
                      name: "dry",
                      complete: !!random(0, 1)
                    },
                    {
                      name: "no-caffine",
                      complete: !!random(0, 1)
                    }
                  ]}
                  activities={[
                    {
                      name: "running",
                      count: random(0, 3)
                    }
                  ]}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
