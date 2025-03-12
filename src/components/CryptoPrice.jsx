import { useEffect, useState } from "react";

function CryptoPrice() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch("https://api.coinlore.net/api/tickers/?limit=20");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        if (data && data.data) {
          setCryptos(data.data); // ✅ Store crypto list in state
        } else {
          throw new Error("No data available");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();

    // Auto-refresh price every 30 seconds
    const interval = setInterval(fetchCryptos, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Top 20 Cryptocurrencies</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && (
        <table className="table table-striped table-hover mt-3">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Market Cap</th>
              <th>24h Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td>{crypto.name}</td>
                <td>{crypto.symbol}</td>
                <td>
                  ${crypto.symbol === "SHIB" 
                    ? parseFloat(crypto.price_usd).toFixed(8) 
                    : parseFloat(crypto.price_usd).toFixed(2)}
                </td>
                <td>${parseFloat(crypto.market_cap_usd).toLocaleString()}</td>
                <td className={crypto.percent_change_24h > 0 ? "text-success" : "text-danger"}>
                  {crypto.percent_change_24h}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CryptoPrice;