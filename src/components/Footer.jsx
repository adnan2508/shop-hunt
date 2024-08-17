import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-secondary text-white  p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Shop Hunt Solutions Ltd.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
