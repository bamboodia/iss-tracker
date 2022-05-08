import React from "react";
import './header.scss'

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='logo'>ISS</div>
        <nav>
          <ul>
            <li>
              <a href='/'>International</a>
            </li>
            <li>
              <a href='/'>Space</a>
            </li>
            <li>
              <a href='/'>Station</a>
            </li>            
          </ul>
        </nav>
      </div>
    </header>
  );
}