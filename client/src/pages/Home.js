import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [funds, setFunds] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mutual-fund-tracker-00mp.onrender.com/api/funds/list")
      .then(res => res.json())
      .then(data => {
        setFunds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = funds.filter(f =>
    f.schemeName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-light min-vh-100">
      <div className="container text-center py-5">
        
        <h1 className="display-4 fw-bold">
          Discover Your Perfect <span className="text-primary">Mutual Fund</span>
        </h1>
        <p className="lead text-muted">
          Search, analyze, and save mutual funds from India's leading fund houses.<br />
          Make informed investment decisions with real-time data.
        </p>

        
        <div className="row justify-content-center my-4">
          <div className="col-md-8">
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Search mutual funds by name, AMC, or scheme type..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>

        
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-graph-up"></i> Equity Funds
          </button>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-circle"></i> Debt Funds
          </button>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-bar-chart-steps"></i> Hybrid Funds
          </button>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-piggy-bank"></i> Tax Saving
          </button>
        </div>

        
        {loading ? (
          <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8">
              {query && filtered.length === 0 ? (
                <p className="text-muted text-center">No results found.</p>
              ) : (
                <ul className="list-group shadow">
                  {filtered.slice(0, 20).map(fund => (
                    <Link
                      key={fund.schemeCode}
                      to={`/fund/${fund.schemeCode}`}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-decoration-none"
                    >
                      <span className="text-dark">{fund.schemeName}</span>
                      <span className="btn btn-sm btn-outline-primary">View</span>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
