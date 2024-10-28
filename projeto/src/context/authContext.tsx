// src/context/AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

const login = async (email: string, password: string) => {
  try {
    const response = await axios.get(`/api/base-usuarios/${email}`);
    console.log('Response da API:', response.data); // Adicione este log para verificar os dados do usuário.
    if (response.status === 200) {
      const user = response.data;
      if (user.senha === password) {
        localStorage.setItem('authToken', 'your-auth-token');
        setIsAuthenticated(true);
      } else {
        throw new Error('Usuário ou senha inválidos');
      }
    } else {
      throw new Error('Usuário ou senha inválidos');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};


  const logout = () => {
    localStorage.removeItem('authToken'); // Remova o token de autenticação do localStorage
    setIsAuthenticated(false);
    // Limpar o cache do navegador
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    // Atualizar a página
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};