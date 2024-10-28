'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validações de confirmação de email e senha
    if (email !== confirmEmail) {
      setError('Os emails não coincidem.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
  
    // Requisição para a API de cadastro
    try {
      const response = await fetch('/api/base-usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username, // substitua 'user' pelo nome exato se for diferente
          email,
          senha: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        router.push(`/dashboard/${data.$id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Erro ao realizar o cadastro.');
      }
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      setError('Erro ao realizar o cadastro.');
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen cadastro">
      <iframe
        src="https://lottie.host/embed/86c3a33c-2abe-43c5-8f0c-9e926218a1d0/8lxKWcifay.json"
        className="absolute inset-0 w-full h-full transform scale-150 overflow-x-hidden"
        style={{ border: 'none', zIndex: -1 }}
      ></iframe>
      <div className="w-[30%] py-10 flex items-center justify-center bg-white dark:bg-zinc-900 shadow-lg rounded-xl">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900 dark:text-white">FAÇA PARTE DO NOSSO TIME!</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Nome de usuário</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm dark:bg-zinc-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email</label>
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
              <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Confirmação de Email</label>
              <input
                type="email"
                id="confirmEmail"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm dark:bg-zinc-800"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Senha</label>
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-400">Confirmação de Senha</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm dark:bg-zinc-800"
              />
            </div>
            <button type="submit" className="w-full bg-custom text-white py-2 px-4 rounded-3xl hover:bg-customBg">
              Cadastrar
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
