import React, { useState, useEffect } from "react";

const DelayedFallback = () => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return showLoading ? (
    <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
  ) : null;
};

export default DelayedFallback;
