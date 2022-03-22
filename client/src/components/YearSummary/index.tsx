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
import { CSSProperties } from "@emotion/serialize";
import { useDays } from "../../hooks/useDays";
import { YearStats } from "../YearStats";

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
  const { days } = useDays();
  const months = groupBy(days, (d) => dayjs(d.date).month());
  const [editdate, setEditDate] = useState<IDay>();

  return (
    <>
      <div className="YearSummary">
        {Object.values(months).map((days) => {
          days = orderBy(days, (d) => dayjs(d.date).date());
          return (
            <div className="month">
              {days.map((d) => {
                const onClick = () => setEditDate(d);
                const activityCount = d.activities.reduce(
                  (total, x) => x.timesPerformed + total,
                  0
                );
                const className = ["day"];
                const date = dayjs(d.date);
                const dayOfWeek = date.day();
                if (dayOfWeek === 0 || dayOfWeek === 6)
                  className.push("-weekend");
                if (date.isToday()) className.push("-today");

                return (
                  <div className={className.join(" ")} onClick={onClick}>
                    {activityCount === 0 && (
                      <div className="dayNumber">{dayjs(d.date).date()}</div>
                    )}
                    <Medalion size={20} day={d} />
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="stats">
          <YearStats />
        </div>
      </div>
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
