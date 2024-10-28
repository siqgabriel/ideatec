'use client';
import Astronauta from '@/img/astronauta.png';
import TypingEffect from '@/context/typingEffect';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/authContext';
import axios from 'axios';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      await login(email, password);
      router.push(`/dashboard/${email}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError('Usuário ou senha inválidos');
        } else {
          setError('Erro no servidor. Tente novamente mais tarde.');
        }
      } else {
        setError('Erro inesperado. Tente novamente mais tarde.');
      }
    }
  };
  return (
    <div className="relative flex justify-center items-center h-screen login">
      <iframe
        src="https://lottie.host/embed/86c3a33c-2abe-43c5-8f0c-9e926218a1d0/8lxKWcifay.json"
        className="absolute inset-0 w-full h-full transform scale-150 overflow-x-hidden"
        style={{ border: 'none', zIndex: -1 }}
      ></iframe>
      <div className="flex w-3/7 shadow-lg">
        <div className="relative flex-1 bg-gray-200 rounded-s-xl">
          <Image src={Astronauta} alt={'Astronauta'} className='rounded-s-xl' />
        </div>
        <div className="flex-2 p-8 bg-white dark:bg-zinc-900 rounded-e-xl">
          <h1 className="text-3xl dark:text-white font-bold mb-4">IDEATEC</h1>
          <TypingEffect />
          <form onSubmit={handleLogin}>
            <div className="mb-4 pt-12">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Usuário ou Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm dark:bg-zinc-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm dark:bg-zinc-800"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-checkbox"
                />
                <span className="ml-2 dark:text-gray-400">Lembre de mim</span>
              </label>
            </div>
            <button type="submit" className="w-full bg-custom text-white py-2 px-4 rounded-3xl hover:bg-customBg">
              Entrar
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <p className="mt-6 dark:text-gray-400">
            Faça parte do nosso time,{' '}
            <a href="/login/cadastro" className="text-custom hover:text-customBg">
              cadastre-se aqui
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;