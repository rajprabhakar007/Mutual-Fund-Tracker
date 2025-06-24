import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getSavedFunds, saveFund, removeFund } from '../api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function FundDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`https://api.mfapi.in/mf/${code}`)
      .then(res => res.json())
      .then(setData);
  }, [code]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (!token) return;

    getSavedFunds()
      .then(res => {
        const matched = res.data.find(f => f.fundCode === code);
        setIsSaved(!!matched);
      })
      .catch(() => {
        setIsSaved(false);
      });
  }, [code]);

  const handleSave = async () => {
    if (!isLoggedIn) {
      alert("Please log in to save funds.");
      return navigate("/login", { state: { from: location.pathname } });
    }
    try {
      await saveFund({ fundCode: code, fundName: data.meta.scheme_name });
      alert('Fund saved!');
      setIsSaved(true);
    } catch {
      alert('Error saving fund.');
    }
  };

  const handleRemove = async () => {
    if (!isLoggedIn) {
      alert("Please log in to remove funds.");
      return navigate("/login", { state: { from: location.pathname } });
    }
    try {
      await removeFund(code);
      alert('Fund removed!');
      setIsSaved(false);
    } catch {
      alert('Error removing fund.');
    }
  };

  if (!data) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} />
      </div>
    );
  }

  const latestNav = data.data?.[0];
  const navHistory = data.data?.slice(0, 30).reverse();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>{data.meta.scheme_name}</h3>
        {isSaved ? (
          <button className="btn btn-danger" onClick={handleRemove}>Remove Fund</button>
        ) : (
          <button className="btn btn-primary" onClick={handleSave}>Save Fund</button>
        )}
      </div>

      <div className="row text-center mb-4">
        <div className="col-md-3 mb-3">
          <div className="p-3 border rounded bg-light">
            <h5>₹{latestNav?.nav || 'N/A'}</h5>
            <small>Current NAV</small>
            <div><small>As of {latestNav?.date || 'N/A'}</small></div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-3 border rounded bg-light text-success">
            <h5>+12.50%</h5>
            <small>1 Year Return</small>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-3 border rounded bg-light text-success">
            <h5>+15.20%</h5>
            <small>3 Year Return</small>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="p-3 border rounded bg-light">
            <h5>₹15,000 Cr</h5>
            <small>AUM</small>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Fund Information</h5>
          <ul className="list-group">
            <li className="list-group-item"><strong>Fund House:</strong> {data.meta.fund_house}</li>
            <li className="list-group-item"><strong>Category:</strong> {data.meta.scheme_category}</li>
            <li className="list-group-item"><strong>Type:</strong> {data.meta.scheme_type}</li>
            <li className="list-group-item"><strong>Expense Ratio:</strong> 2.25%</li>
            <li className="list-group-item"><strong>Exit Load:</strong> 1% if redeemed within 1 year</li>
            <li className="list-group-item"><strong>Min Investment:</strong> ₹500</li>
          </ul>
        </div>

        <div className="col-md-6">
          <h5>Performance</h5>
          <ul className="list-group">
            <li className="list-group-item"><strong>1 Year:</strong> +12.50%</li>
            <li className="list-group-item"><strong>3 Years:</strong> +15.20%</li>
            <li className="list-group-item"><strong>5 Years:</strong> +N/A</li>
            <li className="list-group-item"><strong>10 Years:</strong> +N/A</li>
            <li className="list-group-item"><strong>Rating:</strong> ★★★★☆</li>
          </ul>
        </div>
      </div>

      <h5 className="mt-4">30-Day NAV Trend</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={navHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="nav" stroke="#007bff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <h5 className="mt-5">Recent NAV History</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>NAV (₹)</th>
            </tr>
          </thead>
          <tbody>
            {navHistory.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.date}</td>
                <td>₹{parseFloat(entry.nav).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FundDetails;
