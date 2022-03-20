import { YearSummary } from ".";
import { useDays } from "../../hooks/useDays";
import { mockDays } from "../../mock-data/mockDays";

export const DemoStandard = () => {
  return (
    <div style={{ maxWidth: "360px" }}>
      <YearSummary />
    </div>
  );
};
