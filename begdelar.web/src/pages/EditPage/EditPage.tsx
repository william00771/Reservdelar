import { useEffect, useState } from "react";
import DynamicTable from "../../components/feature/EditPage/DynamicTable";
import { UPricefileManual, UPricefileManualValidationObject } from "../../util/types";
import scaniaLogo from "../../icons/logo/scania-symbol.svg";
import scaniaWordMark from "../../icons/logo/scania-wordmark-white.svg";
import "./EditPage.css";
import { getUPricefileManuals } from "../../services/apiEndpoints";
import { ScaniaSpinnerBasic } from "../../components/ui/loaders/ScaniaSpinnerBasic";
import { ScaniaErrorBasic } from "../../components/ui/alerts/ScaniaErrorBasic";

export const EditPage = () => {
  const [UPricefileManualData, setUPricefileManualData] = useState<UPricefileManual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const UPricefileResponse = await getUPricefileManuals();
        setUPricefileManualData(UPricefileResponse);
      } catch (err) {
        setError(`${err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <header className="editpage-header">
        <div className="editpage-titlesection">
          <img src={scaniaWordMark} alt="scania wordmark" className="scaniaWordMark" />
          <h1>Begdelar - v1.0</h1>
        </div>
        <img src={scaniaLogo} alt="scania logo" className="scaniaLogo" />
      </header>

      {loading ? (
        <ScaniaSpinnerBasic />
      ) : error ? (
        <ScaniaErrorBasic errMessage={error}/>
      ) : (
        <>
          <DynamicTable 
            //@ts-ignore
            data={UPricefileManualData}
            validationRules={UPricefileManualValidationObject} 
          />
        </>
      )}
    </>
  );
};