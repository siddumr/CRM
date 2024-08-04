import React, { useEffect } from 'react';
import './Land.scss';

const Land: React.FC = () => {
  useEffect(() => {
    const parent = document.querySelector('.splitview') as HTMLElement;
    const topPanel = parent.querySelector('.top') as HTMLElement;
    const handle = parent.querySelector('.handle') as HTMLElement;
    let skewHack = 0;
    let delta = 0;

    if (parent.classList.contains('skewed')) {
      skewHack = 1000;
    }

    const handleMouseMove = (event: MouseEvent) => {
      delta = (event.clientX - window.innerWidth / 2) * 0.5;
      handle.style.left = `${event.clientX + delta}px`;
      topPanel.style.width = `${event.clientX + skewHack + delta}px`;
    };

    parent.addEventListener('mousemove', handleMouseMove);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="splitview skewed">
      <div className="panel bottom">
        <div className="content">
          <div className="description">
            <h1 className="display-5">
              How can we help <br></br>grow your business?
            </h1>
            <p>This is how the image looks like before applying a duotone effect.</p>
          </div>
          <div></div>
          <img
            src="https://img.freepik.com/premium-photo/black-white-silhouette-business-handshake_985204-148607.jpg?ga=GA1.1.688353063.1686149813&semt=ais_hybrid"
            alt="Original"
          />
        </div>
      </div>

      <div className="panel top">
        <div className="content">
          <div className="description">
            <h1 className="display-5">Why people choose us ?</h1>
            <p style={{ marginTop: '25px' }}>
              Our CRM system offers a Comprehensive Feature Set designed to streamline and enhance your business operations. With our
              unified customer database, you can centralize all customer information, interactions, and history, making it easily accessible
              and manageable.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/customer-experience-creative-collage_23-2149346503.jpg?ga=GA1.1.688353063.1686149813&semt=sph"
            alt="Duotone"
          />
        </div>
      </div>

      <div className="handle"></div>
    </div>
  );
};

export default Land;
