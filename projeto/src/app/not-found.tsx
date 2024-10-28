"use client";

import React from 'react';
import styles from './not-found.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Página Não Encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link href="/" className="btn-home">
        Voltar para a Página Inicial
        <FontAwesomeIcon icon={faHome} className='icone'/>
      </Link>
      <style jsx>{`
        .not-found {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        .btn-home {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .btn-home .icone {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}