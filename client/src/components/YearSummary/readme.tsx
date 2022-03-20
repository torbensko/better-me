import { YearSummary } from ".";
import { mockDays } from "../../mock-data/mockDays";

export const DemoStandard = () => {
  return (
    <div style={{ maxWidth: "360px" }}>
      <YearSummary days={mockDays} />
    </div>
  );
};
