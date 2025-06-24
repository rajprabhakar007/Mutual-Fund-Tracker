import React, { useEffect, useState } from 'react';
import { getSavedFunds, removeFund } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

function SavedFunds() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await getSavedFunds();
        setFunds(res.data);
        setLoading(false);
      } catch {
        alert("Error fetching saved funds. Please log in first.");
        navigate("/login");
      }
    };

    fetchFunds();
  }, [navigate]);

  const handleRemove = async (fundCode) => {
    try {
      await removeFund(fundCode);
      setFunds(funds.filter((f) => f.fundCode !== fundCode));
      alert("Fund removed successfully.");
    } catch {
      alert("Error removing fund.");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Your Saved Funds</h3>

      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : funds.length === 0 ? (
        <p>No saved funds.</p>
      ) : (
        <ul className="list-group">
          {funds.map((f, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between align-items-center saved-fund-item"
            >
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip-${f.fundCode}`}>
                    Click to view details
                  </Tooltip>
                }
              >
                <Link
                  to={`/fund/${f.fundCode}`}
                  className="saved-fund-link text-muted"
                >
                  {f.fundName}
                </Link>
              </OverlayTrigger>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleRemove(f.fundCode)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedFunds;
