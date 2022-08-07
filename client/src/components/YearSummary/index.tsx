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

// taken from: https://colordesigner.io/gradient-generator
const ratioColors = ["#fa6e6e", "#e87e3b", "#c19303", "#87a500", "#15b141"];

const ratioToColor = (ratio: number): string => {
  // min(4,) to cater for 100% (round down)
  return ratioColors[Math.min(4, Math.floor(ratio * 5))];
};

export interface IYearSummaryProps {}

export const YearSummary: React.FC<IYearSummaryProps> = ({}) => {
  const { subscription, setSubscription } = useApp();
  const { days } = useDays();
  const { activities } = useActivities();
  const months = groupBy(days, (d) => dayjs(d.date, "YYYY-MM-DD").month());
  const [editdate, setEditDate] = useState<IDay>();

  return (
    <>
      <VStack>
        <div>
          {/* TODO move to a component */}
          <div className="YearSummary">
            {Object.values(months).map((days) => {
              days = orderBy(days, (d) => dayjs(d.date, "YYYY-MM-DD").date());
              const stats = computeStats(days, activities);

              const activityCount = (stats || []).reduce(
                (total, x) => x.count + total,
                0
              );

              return (
                <div className="month">
                  <div className="monthStats">
                    {(stats || []).map((a) => (
                      <div
                        className="monthStat"
                        style={{ backgroundColor: a.activity.color }}
                      >
                        {a.count}
                      </div>
                    ))}
                    <div className="monthStat -activityCount">
                      {activityCount}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <YearStats />
        </div>
        {/* TODO move to a component */}
        <div className="YearSummary">
          {Object.values(months).map((days) => {
            days = orderBy(days, (d) => dayjs(d.date, "YYYY-MM-DD").date());
            const goodRatio =
              (days || []).filter((d) => d.isGoodDay).length / days.length;

            return (
              <div className="month">
                <div
                  className="monthStat -goodRatio"
                  style={{ backgroundColor: ratioToColor(goodRatio) }}
                >
                  {Math.round(goodRatio * 100)}
                </div>

                {days.map((d) => {
                  const onClick = () => setEditDate(d);

                  const className = ["day"];
                  const date = dayjs(d.date, "YYYY-MM-DD");
                  const dayOfWeek = date.day();

                  if (dayOfWeek === 0 || dayOfWeek === 6)
                    className.push("-weekend");
                  if (date.isToday()) className.push("-today");

                  if (d.isGoodDay) className.push("-goodDay");

                  return (
                    <div className={className.join(" ")} onClick={onClick}>
                      {d.activityCount === 0 && (
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
        {!!subscription && (
          <div className="Details">
            Subscription: {subscription}
            <br />
            <small>
              <a onClick={() => setSubscription("")}>Close</a>
            </small>
          </div>
        )}
      </VStack>
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
