import './ScaniaErrorBasic.css'
import scaniaLogo from '../../../icons/logo/scania-symbol.svg'

type Props = {
    errMessage: string;
}

export const ScaniaErrorBasic = ({ errMessage }:Props) => {
  return (
    <div className="error-information">
        <img src={scaniaLogo} alt="scania Logo" />
        <h3>Error</h3>
        <p>{errMessage}</p>
    </div>
  );
};