import DynamicTable from "../../components/feature/EditPage/DynamicTable";
import { UPricefileManualMockData } from "../../data/mockdata";

export const EditPage = () => {
  return (
    <>
        <DynamicTable data={UPricefileManualMockData}/>
    </>
  );
};