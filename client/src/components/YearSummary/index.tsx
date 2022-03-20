import * as React from "react";
import dayjs from "dayjs";
import { groupBy, random, times } from "lodash";

import "./styles.css";
import { Medalion } from "../Medalion";
import { IDay } from "../../types/IDay";

export interface IYearSummaryProps {
  days: IDay[];
}

export const YearSummary: React.FC<IYearSummaryProps> = ({ days }) => {
  const months = groupBy(days, (d) => dayjs(d.date).month());

  return (
    <div className="YearSummary">
      {Object.values(months).map((days) => {
        return (
          <div className="month">
            {days.map((d) => (
              <div className="day">
                <div className="dayNumber">{dayjs(d.date).day()}</div>
                <Medalion size={20} day={d} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
