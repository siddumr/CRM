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
          <div className="pricing-pack">Basic</div>
          <div id="basic" className="pricing-price pricing-bottom-bar">
            {formatPrice(10000)}
          </div>
          <div className="pricing-bottom-bar">Basic Modules</div>
          <div className="pricing-bottom-bar">Sales forcasting</div>
          <div className="pricing-bottom-bar">LeadScoring</div>
          <div className="pricing-bottom-bar">Workflows</div>
          <div>
            <button className="pricing-btn">Learn More</button>
          </div>
        </div>
        <div className={`pricing-card pricing-active ${!isAnnually ? 'pricing-active' : ''}`}>
          <div className="pricing-pack">Professional</div>
          <div id="professional" className="pricing-price pricing-bottom-bar">
            {formatPrice(15000)}
          </div>
          <div className="pricing-bottom-bar">Blueprint</div>
          <div className="pricing-bottom-bar">Inventory Management</div>
          <div className="pricing-bottom-bar">Email Integration</div>
          <div className="pricing-bottom-bar">Validation rules</div>
          <div>
            <button className="pricing-btn pricing-active-btn">Learn More</button>
          </div>
        </div>
        <div className={`pricing-card pricing-shadow ${!isAnnually ? 'pricing-active' : ''}`}>
          <div className="pricing-pack">Master</div>
          <div id="master" className="pricing-price pricing-bottom-bar">
            {formatPrice(25000)}
          </div>
          <div className="pricing-bottom-bar">Sales Assistent</div>
          <div className="pricing-bottom-bar">Custom Function</div>
          <div className="pricing-bottom-bar">Multi-user portal</div>
          <div className="pricing-bottom-bar">Client Script</div>
          <div>
            <button className="pricing-btn">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;
