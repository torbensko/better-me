import * as React from "react";
import dayjs from "dayjs";
import { groupBy } from "lodash";

import "./styles.css";
import { Medalion } from "../Medalion";
import { IDay } from "../../types/IDay";
import { useState } from "react";
import { DayEditor } from "../DayEditor";
import { Box, Modal } from "@mui/material";
import { CSSProperties } from "@emotion/serialize";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export interface IYearSummaryProps {
  days: IDay[];
}

export const YearSummary: React.FC<IYearSummaryProps> = ({ days }) => {
  const months = groupBy(days, (d) => dayjs(d.date).month());
  const [editdate, setEditDate] = useState<IDay>();

  return (
    <>
      <div className="YearSummary">
        {Object.values(months).map((days) => {
          return (
            <div className="month">
              {days.map((d) => {
                const onClick = () => setEditDate(d);
                return (
                  <div className="day" onClick={onClick}>
                    <div className="dayNumber">{dayjs(d.date).day()}</div>
                    <Medalion size={20} day={d} />
                  </div>
                );
              })}
            </div>
          );
        })}
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
