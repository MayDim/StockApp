// StockDetail.js

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./StockDetails.css";
// Import the Google Fonts CSS file
import './fonts.css'; // Adjust the path accordingly

const StockDetail = () => {
    const { ticker } = useParams();

    //set data when retrieved
    const [overviewData, setOverviewData] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [historicalData, setHistoricalData] = useState([]);
    
    //api key
    //let api_key = "T5IX5WZYJ53YVR9W";

    //api urls
    //let url_overview = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${api_key}`
    //let url_time_series_daily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${api_key}`

    //demo links 
    let url_overview = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
    let url_time_series_daily = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"

    useEffect(() => {
      const fetchHistoricalData = async () => {
          try {
              const response = await fetch(url_time_series_daily);
              if (!response.ok) { //Error check
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              // Extract historical prices data and store in var
              const timeSeriesData = data["Time Series (Daily)"];
              //declare empty array to input data
              const historicalPrices = [];

              //given each date grab appropraite data and store into map 
              for (const date in timeSeriesData) {
                  const priceData = timeSeriesData[date];
                  historicalPrices.push({
                      date: date,
                      closePrice: parseFloat(priceData["4. close"]),
                      volume: parseInt(priceData["5. volume"])
                  });
              }
              // Calculate percentage change in price from the previous day
              for (let i = 1; i < historicalPrices.length; i++) {
                  const currentPrice = historicalPrices[i];
                  const previousPrice = historicalPrices[i - 1];
                  currentPrice.percentageChange = ((currentPrice.closePrice - previousPrice.closePrice) / previousPrice.closePrice) * 100;
              }
              setHistoricalData(historicalPrices);
          } catch (error) {
              console.error('Error fetching historical data:', error);
          }
      };

      const fetchOverviewData = async () => {
          try {
              const response = await fetch(url_overview);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setOverviewData(data);
          } catch (error) {
              console.error('Error fetching overview data:', error);
          } finally {
            //simulate a delay of 1 second before setting loading to false
            setTimeout(() => {
                setLoading(false);
             }, 1000)
          }
      };

      fetchHistoricalData();
      fetchOverviewData();
  }, [url_time_series_daily, url_overview, ticker]);

  return (
    <div className="overview-container">
        {/* Display company overview */}
        <div className="overview-details">
            <h1 className="overview-heading">Company Overview for {ticker}</h1>
            {loading ? (
                <div className="loading">Loading </div>
            ) : (
                <div> 
                    <h2 className="stock-name">{overviewData.Name}</h2>
                        <div className="overview-info">
                            <p><strong>Sector:</strong> {overviewData.Sector || "N/A"}</p>
                            <p><strong>Asset Type:</strong> {overviewData.AssetType || "N/A"}</p>
                            <p><strong>Industry:</strong> {overviewData.Industry || "N/A"}</p>
                            <p><strong>Market Capitalization:</strong> {overviewData.MarketCapitalization || "N/A"}</p>
                        </div>
                    <p className="description">{overviewData.Description || "N/A"}</p>
                </div>
            )}
        </div>
        {/* Display historical prices */}
        <div className="historical-prices">
            <h2 className="overview-heading"> Price History</h2>
            {loading ? (
                <div className="loading">Loading </div>
            ) : (
                <div>
                    {historicalData.map((price, index) => (
                        <div key={index} className="historical-price-item">
                            <p className="date"><strong>Date:</strong> {price.date}</p>
                            <p className="close-price"><strong>Close Price:</strong> {price.closePrice.toFixed(2)}</p>
                            <p className="volume"><strong>Volume:</strong> {price.volume}</p>
                            {index > 0 && (
                                <p class={price.percentageChange >= 0 ? "percentage-change positive" : "percentage-change negative"}>
                                    <strong>Percentage Change:</strong> {price.percentageChange.toFixed(2)}%  
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default StockDetail;