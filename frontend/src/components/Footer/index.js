import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-header'>Created by Laura Maser</div>
        <div className='footer-icons'>
          <a href='https://www.linkedin.com/in/laura-maser-225196b2/' target='_blank' rel='noopener noreferrer'>
            <i className="fab fa-linkedin"></i>
          </a>
          <a href='https://github.com/lrmaser' target='_blank' rel='noopener noreferrer'>
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div className='footer-technologies'>JavaScript • CSS • React • Redux • Express • Sequelize • PostgreSQL</div>
      </div>
    </div>
  );
};

export default Footer;
