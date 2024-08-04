import React, { useState } from 'react';
import './PricingComponent.scss';

const PricingComponent: React.FC = () => {
  const [isAnnually, setIsAnnually] = useState(true);

  const handleToggle = () => {
    setIsAnnually(!isAnnually);
  };

  const formatPrice = (price: number) => (isAnnually ? `₹${price.toFixed(2)}` : `₹${(price / 10).toFixed(2)}`);

  return (
    <div>
      <header className="pricing-header">
        <h1>Our Pricing</h1>
        <div className="pricing-toggle">
          <label>Monthly</label>
          <div className="pricing-toggle-btn">
            <input type="checkbox" className="pricing-checkbox" id="pricing-checkbox" checked={isAnnually} onChange={handleToggle} />
            <label className="pricing-sub" htmlFor="pricing-checkbox">
              <div className="pricing-circle"></div>
            </label>
          </div>
          <label>Annually</label>
        </div>
      </header>
      <div className="pricing-cards">
        <div className={`pricing-card pricing-shadow ${!isAnnually ? 'pricing-active' : ''}`}>
          <ul>
            <li className="pricing-pack">Basic</li>
            <li id="basic" className="pricing-price pricing-bottom-bar">
              {formatPrice(10000)}
            </li>
            <li className="pricing-bottom-bar">500 GB Storage</li>
            <li className="pricing-bottom-bar">2 Users Allowed</li>
            <li className="pricing-bottom-bar">Send up to 3 GB</li>
            <li>
              <button className="pricing-btn">Learn More</button>
            </li>
          </ul>
        </div>
        <div className={`pricing-card pricing-active ${!isAnnually ? 'pricing-active' : ''}`}>
          <ul>
            <li className="pricing-pack">Professional</li>
            <li id="professional" className="pricing-price pricing-bottom-bar">
              {formatPrice(15000)}
            </li>
            <li className="pricing-bottom-bar">1 TB Storage</li>
            <li className="pricing-bottom-bar">5 Users Allowed</li>
            <li className="pricing-bottom-bar">Send up to 10 GB</li>
            <li>
              <button className="pricing-btn pricing-active-btn">Learn More</button>
            </li>
          </ul>
        </div>
        <div className={`pricing-card pricing-shadow ${!isAnnually ? 'pricing-active' : ''}`}>
          <ul>
            <li className="pricing-pack">Master</li>
            <li id="master" className="pricing-price pricing-bottom-bar">
              {formatPrice(25000)}
            </li>
            <li className="pricing-bottom-bar">2 TB Storage</li>
            <li className="pricing-bottom-bar">10 Users Allowed</li>
            <li className="pricing-bottom-bar">Send up to 20 GB</li>
            <li>
              <button className="pricing-btn">Learn More</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;
