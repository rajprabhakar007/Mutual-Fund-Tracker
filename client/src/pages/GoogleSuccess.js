import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function GoogleSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); 
    }
  }, [token, navigate]); 

  return (
    <div className="container text-center mt-5">
      <div className="spinner-border text-primary" role="status" />
      <p className="mt-3">Logging you in via Google...</p>
    </div>
  );
}

export default GoogleSuccess;
