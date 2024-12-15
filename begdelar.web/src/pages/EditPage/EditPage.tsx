import { useEffect, useState } from "react";
import DynamicTable from "../../components/feature/EditPage/DynamicTable";
import { UPricefileManual, UPricefileManualValidationObject } from "../../util/types";
import scaniaLogo from "../../icons/logo/scania-symbol.svg";
import scaniaWordMark from "../../icons/logo/scania-wordmark-white.svg";
import "./EditPage.css";
import { getUPricefileManuals } from "../../services/apiEndpoints";
import { UPricefileManualMockData } from "../../data/mockdata";

export const EditPage = () => {
  const [UPricefileManualData, setUPricefileManualData] = useState<UPricefileManual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getUPricefileManuals();
        // console.log("Fetched Data:", result);
        // console.log("Mock data:", UPricefileManualMockData);
        console.log("Object:", result);
        console.log("ValidationObject", UPricefileManualValidationObject);
        setUPricefileManualData(result);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
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
        <p>Loading data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <DynamicTable 
          // data={UPricefileManualMockData} 
          data={UPricefileManualData}
          validationRules={UPricefileManualValidationObject} 
        />
      )}
    </>
  );
};