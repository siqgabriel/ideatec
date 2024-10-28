'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleHalfStroke, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;


interface MenuProps {
  toggleDarkMode: () => void;
}

export default function Menu({ toggleDarkMode }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="menu hamburger:hidden">
        <nav className="navegacao">
            <Link href="/checkpoints" className="link">
                Check Point
            </Link>
            <Link href="/globals" className="link">
                Global Solution
            </Link>
            <Link href="/sprints" className="link">
                Challenger Sprints
            </Link>
        </nav>
        <div className="acoes">
            <Link href="/login" className="btn-entre">
                Entre no time
                <FontAwesomeIcon icon={faUserPlus} className='icone'/>
            </Link>
            <button onClick={toggleDarkMode} className="btn-dark-mode">
                <FontAwesomeIcon icon={faCircleHalfStroke} className='icone'/>
            </button>
        </div>
      </div>
      <div className="xl:hidden lg:hidden hamburger:flex items-center">
            <button onClick={toggleMenu} className="btn-menu">
                <FontAwesomeIcon icon={faBars} className='icone-menu'/>
            </button>
      </div>
      {menuOpen && (
        <div className="hamburger:flex flex-col items-start">
            <nav className="navegacao">
                <Link href="/checkpoint" className="link">
                    Check Point
                </Link>
                <Link href="/global-solution" className="link">
                    Global Solution
                </Link>
                <Link href="/challenger-sprints" className="link">
                    Challenger Sprints
                </Link>
            </nav>
            <div className="acoes">
                <button className="btn-entre">
                    Entre no time
                </button>
                <button onClick={toggleDarkMode} className="btn-dark-mode">
                    <FontAwesomeIcon icon={faCircleHalfStroke} className='icone'/>
                </button>
            </div>
        </div>
      )}
    </div>
  );
}