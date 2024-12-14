import DynamicTable from "../../components/feature/EditPage/DynamicTable";
import { UPricefileManualMockData } from "../../data/mockdata";
import { UPricefileManualValidationObject } from "../../util/types";
import scaniaLogo from '../../icons/logo/scania-symbol.svg'
import scaniaWordMark from '../../icons/logo/scania-wordmark-white.svg'
import './EditPage.css';

export const EditPage = () => {
  return (
    <>
        <header className="editpage-header">
          <div className="editpage-titlesection">
            <img src={scaniaWordMark} alt="scania wordmark" className="scaniaWordMark"/>
            <h1>Begdelar - v1.0</h1>
          </div>
          <img src={scaniaLogo} alt="scania logo" className='scaniaLogo'/>
        </header>
        <DynamicTable 
            data={UPricefileManualMockData} 
            validationRules={UPricefileManualValidationObject} 
        />
    </>
  );
};