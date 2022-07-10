import * as React from "react";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { groupBy, orderBy } from "lodash";

import "./styles.css";
import { Medalion } from "../Medalion";
import { IDay } from "../../types/IDay";
import { useState } from "react";
import { DayEditor } from "../DayEditor";
import { Box, Modal } from "@mui/material";
import { useDays } from "../../hooks/useDays";
import { computeStats, YearStats } from "../YearStats";
import { useApp } from "../../hooks/useApp";
import { useActivities } from "../../hooks/useActivities";
import { VStack } from "../VStack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

dayjs.extend(isToday);

export interface IYearSummaryProps {}

export const YearSummary: React.FC<IYearSummaryProps> = ({}) => {
  const { subscription, setSubscription } = useApp();
  const { days } = useDays();
  const { activities } = useActivities();
  const months = groupBy(days, (d) => dayjs(d.date, "YYYY-MM-DD").month());
  const [editdate, setEditDate] = useState<IDay>();
  // the number of days training/resting in the last 7
  let streak: number[] = [];

  return (
    <>
      <VStack>
        {/* TODO move to a component */}
        <div className="YearSummary">
          {Object.values(months).map((days) => {
            days = orderBy(days, (d) => dayjs(d.date, "YYYY-MM-DD").date());
            const stats = computeStats(days, activities);

            return (
              <div className="month">
                <div className="monthStats">
                  <div
                    className="monthStat"
                    style={{ backgroundColor: "#fff" }}
                  >
                    {(stats || []).reduce((total, x) => x.count + total, 0)}
                  </div>
                  {(stats || []).map((a) => (
                    <div
                      className="monthStat"
                      style={{ backgroundColor: a.activity.color }}
                    >
                      {a.count}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="YearSummary">
          <YearStats />
        </div>
        {/* TODO move to a component */}
        <div className="YearSummary">
          {Object.values(months).map((days) => {
            days = orderBy(days, (d) => dayjs(d.date, "YYYY-MM-DD").date());
            const stats = computeStats(days, activities);

            return (
              <div className="month">
                {/* 
                <div className="monthStats">
                  <div className="monthStat" style={{ backgroundColor: "#fff" }}>
                    {(stats || []).reduce((total, x) => x.count + total, 0)}
                  </div>
                  {(stats || []).map((a) => (
                    <div
                      className="monthStat"
                      style={{ backgroundColor: a.activity.color }}
                    >
                      {a.count}
                    </div>
                  ))}
                </div> 
                */}

                {days.map((d) => {
                  const onClick = () => setEditDate(d);
                  const activityCount = d.activities.reduce(
                    (total, x) => x.timesPerformed + total,
                    0
                  );
                  const className = ["day"];
                  const date = dayjs(d.date, "YYYY-MM-DD");
                  const dayOfWeek = date.day();

                  streak.push(activityCount);
                  if (streak.length > 7) streak = streak.slice(1);

                  const tooMuchTraining =
                    streak.filter((n) => !n).length > 2 && !activityCount;
                  const tooMuchRest =
                    streak.filter((n) => n).length > 5 && activityCount;

                  if (dayOfWeek === 0 || dayOfWeek === 6)
                    className.push("-weekend");
                  if (date.isToday()) className.push("-today");

                  if (tooMuchTraining) className.push("-tooMuchRest");
                  if (tooMuchRest) className.push("-tooMuchTraining");
                  if (!tooMuchTraining && !tooMuchRest)
                    className.push("-goodDay");

                  return (
                    <div className={className.join(" ")} onClick={onClick}>
                      {activityCount === 0 && (
                        <div className="dayNumber">
                          {dayjs(d.date, "YYYY-MM-DD").date()}
                        </div>
                      )}
                      <Medalion size={20} day={d} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </VStack>
      {!!subscription && (
        <>
          <div className="Details">
            Subscription: {subscription}
            <br />
            <small>
              <a onClick={() => setSubscription("")}>Close</a>
            </small>
          </div>
          {/* <div className="Stats">
            <YearStats />
          </div> */}
        </>
      )}
      <div style={{ height: "40px" }}></div>
      <Modal
        open={!!editdate}
        onClose={() => setEditDate(undefined)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!!editdate && (
            <DayEditor
              initDay={editdate}
              onSuccess={() => setEditDate(undefined)}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};
