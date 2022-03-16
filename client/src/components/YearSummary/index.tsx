import * as React from "react";
import dayjs from "dayjs";
import { times } from "lodash";

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
                      complete: false
                    },
                    {
                      name: "no-caffine",
                      complete: true
                    }
                  ]}
                  activities={[
                    {
                      name: "running",
                      count: 2
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
