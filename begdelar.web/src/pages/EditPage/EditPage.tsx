import DynamicTable from "../../components/feature/EditPage/DynamicTable";
import { UPricefileManualMockData } from "../../data/mockdata";
import { UPricefileManualValidationObject } from "../../util/types";

export const EditPage = () => {
  return (
    <>
        <DynamicTable 
            data={UPricefileManualMockData} 
            validationRules={UPricefileManualValidationObject} 
        />
    </>
  );
};