import React from 'react';

function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-5 shadow-sm">
      <div className="container">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} MutualFundPro. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
