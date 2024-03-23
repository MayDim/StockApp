import React from 'react';
import "./StockApp.css";
import { Link } from 'react-router-dom';

// Import the Google Fonts CSS file
import '../StockDetails/fonts.css'; // Adjust the path accordingly

//Import Logos
import AAPLLogo from '../assets/company_logos/apple.png';
import GOOGLLogo from '../assets/company_logos/google.png';
import MSFTLogo from '../assets/company_logos/microsoft.png';
import AMZNLogo from '../assets/company_logos/amazon.png';
import METALogo from '../assets/company_logos/meta.png';
import TSLALogo from '../assets/company_logos/tesla.png';
import NVDALogo from '../assets/company_logos/nvidia.png';
import INTCLogo from '../assets/company_logos/intel.png';
import NFLXLogo from '../assets/company_logos/netflix.png';
import ADBELogo from '../assets/company_logos/adobe.png';
import CRMLogo from '../assets/company_logos/salesforce.png';
import PYPLLogo from '../assets/company_logos/paypal.png';
import CSCOLogo from '../assets/company_logos/cisco.png';
import VLogo from '../assets/company_logos/visa.png';
import AMDLogo from '../assets/company_logos/amd.png';

//stock map that contains ticker information
const stocks = [
    {ticker: 'AAPL', companyName: 'Apple Inc.', logo: AAPLLogo},
    {ticker: 'GOOGL', companyName: 'Alphabet Inc.', logo: GOOGLLogo},
    {ticker: 'MSFT', companyName: 'Microsoft Corporation', logo: MSFTLogo},
    {ticker: 'AMZN', companyName: 'Amazon', logo: AMZNLogo},
    {ticker: 'META', companyName: 'Meta Plaforms Inc', logo: METALogo },
    {ticker: 'TSLA', companyName: 'Telsa', logo: TSLALogo},
    {ticker: 'NVDA', companyName: 'Nvidia', logo: NVDALogo},
    {ticker: 'INTC', companyName: 'Intel', logo: INTCLogo},
    {ticker: 'NFLX', companyName: 'Netflix', logo: NFLXLogo},
    {ticker: 'ADBE', companyName: 'Adobe', logo: ADBELogo},
    {ticker: 'CRM', companyName: 'Salesforce Inc', logo: CRMLogo},
    {ticker: 'PYPL', companyName: 'Paypal Holdings Inc', logo: PYPLLogo },
    {ticker: 'CSCO', companyName: 'Cisco Systems', logo: CSCOLogo},
    {ticker: 'V', companyName: 'Visa Inc', logo: VLogo},
    {ticker: 'AMD', companyName: 'Advanced Micro Devices, Inc', logo: AMDLogo},
];
  
const StockApp = () => {

  return (
    <div className="page-container">
      <h2>Check out the Lastest Stocks! </h2>
      <div className="cards-container">
          {stocks.map((stock, index) => ( //Go through stock map and prints appropriate data 
            <Link to={`/stock/${stock.ticker}`} key={index} className="card">
              <div className="ticker">{stock.ticker}</div>
              <div className="company-name">{stock.companyName}</div>
              <img src={stock.logo} alt={stock.ticker} className="logo"/>
            </Link>
          ))}
      </div>
    </div>
  )
}


export default StockApp;
//export stocks maps so that we can display logos on stock details page
export { stocks };
