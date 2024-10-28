import React, { useState, useEffect } from 'react';
import { ReactNode, MouseEventHandler } from 'react';
import { TipoUsuario } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface PopupProps {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
  showPopup: boolean;
  togglePopup: () => void;
  handleDeleteUser: () => void;
  userId: number | null;
}

export default function Popup({ children, onClose, showPopup, togglePopup, handleDeleteUser, userId }: PopupProps) {
  const [user, setUser] = useState<TipoUsuario>({
    $id: userId ?? 0,  // Utiliza o valor fornecido ou 0 como padrão
    user: '',
    email: '',
    senha: '',
    imagem: '',
    nome: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/base-usuarios/${userId}`);
          if (response.ok) {
            const userData: TipoUsuario = await response.json();
            setUser(userData);
          } else {
            console.error('Erro ao buscar dados do usuário.');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  
    const data = new FormData(event.target as HTMLFormElement);
    const imagem = data.get('imagem');
  
    // Verificar se a imagem é um arquivo ou uma string
    if (imagem instanceof File) {
      console.log("Imagem é um arquivo, não será validada como URL:", imagem);
    } else if (typeof imagem === 'string' && imagem && !isValidURL(imagem)) {
      console.error("Formato de URL inválido para a imagem:", imagem);
      alert("Formato de URL inválido para a imagem.");
      return;
    }
  
    // Criar o payload com todos os campos obrigatórios e a imagem opcional
    const payload: any = {
      user: data.get('user'),
      email: data.get('email'),
      senha: data.get('senha'),
      nome: data.get('nome'),
      ...(typeof imagem === 'string' && imagem && { imagem }),
    };
  
    // Verificar se todos os campos obrigatórios estão presentes
    if (!payload.user || !payload.email || !payload.senha || !payload.nome) {
      alert("Os campos user, email, senha e nome são obrigatórios.");
      return;
    }
  
    try {
      const response = await fetch(`/api/base-usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta do servidor:", errorText);
        alert("Erro ao atualizar o usuário!");
        return;
      }
  
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar a solicitação:", error);
      alert("Erro ao enviar a solicitação!");
    }
  }
  
  
  function isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  const handleDelete = async () => {
    if (!userId) {
      alert('ID de usuário não definido!');
      return;
    }

    try {
      const response = await fetch(`/api/base-usuarios/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Usuário deletado com sucesso.');
        togglePopup();
      } else {
        alert('Erro ao deletar o usuário.');
      }
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
      alert('Erro ao deletar o usuário.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md w-full max-w-md">
            <button className="top-4 right-4 text-gray-500 hover:text-red-600" onClick={onClose}>
              <FontAwesomeIcon icon={faX} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Configurações do Usuário</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuário</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={user.user}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={user.nome}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={user.senha}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                />
              </div>
              <input
                  type="file"
                  id="imagem" 
                  name="imagem"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-sm text-gray-700"
                />
              <div className="flex w-full">
                <button type="button" onClick={togglePopup} className="text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full hover:text-gray-700 mr-2 w-[50%]">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-custom hover:bg-customBg text-white rounded-full hover:bg-customDark w-[50%]">Salvar</button>
              </div>
              <div className="flex justify-end mt-4 w-full">
                <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 w-[100%]">Deletar Usuário</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

async function uploadImage(file: File): Promise<string> {
  console.log("Iniciando upload da imagem:", file); // Log para depuração

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro no upload da imagem:", errorText); // Log detalhado do erro
    throw new Error("Erro no upload da imagem");
  }

  const { fileName } = await response.json();
  console.log("Upload da imagem concluído com sucesso:", fileName); // Log de sucesso
  return fileName;
}