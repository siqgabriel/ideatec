'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import imgLogo from '@/img/img-logo-ideatec.png';
import imgLogo2 from '@/img/img-logo-ideatec2.png';
import Menu from '../Menu/Menu';
import { useDarkMode } from '@/context/darkModeContext';

export default function Cabecalho() {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Acessando o contexto corretamente
  const [logo, setLogo] = useState(imgLogo);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      setLogo(imgLogo2);
    } else {
      document.documentElement.classList.remove('dark');
      setLogo(imgLogo);
    }
  }, [isDarkMode]);

  return (
    <header className="cabecalho">
      <div className="logo">
        <Link href="/">
          <Image src={logo} alt="Logo Ideatec" width={200} height={40} className='logo1'/>
        </Link>
      </div>
      <Menu toggleDarkMode={toggleDarkMode} />
    </header>
  );
}
