import React, { useState, useEffect } from 'react';
import { ReactNode, MouseEventHandler } from 'react';
import { TipoProjeto } from '@/types';

interface PopupProjetoProps {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
  showPopup: boolean;
  togglePopup: () => void;
  handleDeleteProject: () => void;
  projectId: number | null;
}

export default function PopupProjeto({ children, onClose, showPopup, togglePopup, handleDeleteProject, projectId }: PopupProjetoProps) {
    const [project, setProject] = useState<TipoProjeto>({
        $id: projectId ?? 0,
        nome: '',
        tipo: '',
        nota: 0, 
        descricao: '',
        materia: '',
        imagem: '',
        linguagem: '',
        link: '',
        codigo: '',
        integrantes: [],
        galeria: []
      });
 
      
  useEffect(() => {
    if (projectId) {
      const fetchProjectData = async () => {
        try {
          const response = await fetch(`/api/base-projetos/${projectId}`);
          if (response.ok) {
            const projectData: TipoProjeto = await response.json();
            setProject(projectData);
          } else {
            console.error('Erro ao buscar dados do projeto.');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do projeto:', error);
        }
      };
      fetchProjectData();
    }
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  
    // Log para verificar os valores
    console.log("Dados do projeto:", project);
  
    // Validação dos campos obrigatórios
    if (!project.nome || !project.tipo || project.nota === 0 || !project.descricao || !project.materia || !project.imagem || !project.linguagem || !project.link) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    try {
      const response = await fetch(`/api/base-projetos/${project.$id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro na resposta do servidor:", errorData);
        alert(`Erro ao atualizar o projeto: ${errorData.msg}`);
        return;
      }
  
      alert("Projeto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      alert("Erro ao atualizar o projeto!");
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

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md w-[80%] h-[800px]">
            <button className=" top-4 right-4 text-gray-500" onClick={onClose}>X</button>
            <h3 className="text-xl font-semibold mb-4">Configurações do Projeto</h3>
            <div className=''>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 grid-rows-4'>
                    <div className="mb-4 mr-4">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={project.nome}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                        />
                    </div>
                    <div className="mb-4 mr-4">
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
                        <input
                        type="text"
                        id="tipo"
                        name="tipo"
                        value={project.tipo}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                        />
                    </div>
                    <div className="mb-4 mr-4">
                        <label htmlFor="nota" className="block text-sm font-medium text-gray-700">Nota</label>
                        <input
                        type="number"
                        id="nota"
                        name="nota"
                        value={project.nota}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link (URL)</label>
                        <input
                        type="text"
                        id="link"
                        name="link"
                        value={project.link}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                        />
                    </div>
                    <div className="mb-4 mr-4">
                        <label htmlFor="materia" className="block text-sm font-medium text-gray-700">Matéria</label>
                        <input
                        type="text"
                        id="materia"
                        name="materia"
                        value={project.materia}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                        />
                    </div>
                    <div className="mb-4 mr-4">
                        <label htmlFor="integrantes" className="block text-sm font-medium text-gray-700">Integrantes</label>
                        <input
                        type="text"
                        id="integrantes"
                        name="integrantes"
                        value={project.integrantes.join(',')}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                        />
                    </div>
                    <div className="mb-4 mr-4">
                        <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">Imagem (URL)</label>
                        <input
                        type="text"
                        id="imagem"
                        name="imagem"
                        value={project.imagem}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="linguagem" className="block text-sm font-medium text-gray-700">Linguagem</label>
                        <input
                        type="text"
                        id="linguagem"
                        name="linguagem"
                        value={project.linguagem}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                        />
                    </div>
                </form>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 mr-4">
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                    id="descricao"
                    name="descricao"
                    value={project.descricao}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                    <textarea
                    id="codigo"
                    name="codigo"
                    value={project.codigo}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="galeria" className="block text-sm font-medium text-gray-700">Galeria (URLs separadas por vírgula)</label>
                    <input
                    type="text"
                    id="galeria"
                    name="galeria"
                    value={project.galeria.join(',')}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom focus:border-custom sm:text-sm"
                    />
                </div>


              <div className="flex w-full">
                <button type="button" onClick={togglePopup} className="text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full hover:text-gray-700 mr-2 w-[50%]">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-custom hover:bg-customBg text-white rounded-full hover:bg-customDark w-[50%]">Salvar</button>
              </div>
              <div className="flex justify-end mt-4 w-full">
                <button type="button" onClick={handleDeleteProject} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 w-[100%]">Deletar Projeto</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}