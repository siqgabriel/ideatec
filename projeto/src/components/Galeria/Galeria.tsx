import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

interface GaleriaProps {
    galeria: URL[];
    nome: string; 
}

const Galeria = ({ galeria, nome }: GaleriaProps) => {
  const [fileTypes, setFileTypes] = useState<{ [key: string]: string | null }>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileTypes = async () => {
      const types: { [key: string]: string | null } = {};
      for (const item of galeria) {
        try {
          const response = await fetch(item, { method: 'HEAD' });
          const contentType = response.headers.get('Content-Type');
          types[item.toString()] = contentType;
        } catch (error) {
          console.error('Erro ao buscar o tipo de arquivo:', error);
        }
      }
      setFileTypes(types);
    };

    fetchFileTypes();
  }, [galeria]);

  const getFileExtensionFromUrl = (url: string): string => {
    const parts = url.split('.');
    return parts.length > 1 ? parts.pop() || '' : '';
  };

  const getFileNameFromResponse = (response: Response, url: string): string => {
    const disposition = response.headers.get('Content-Disposition');
    const extension = getFileExtensionFromUrl(url);

    // Tenta usar Content-Disposition, se disponível, mas substitui pelo nome do projeto
    if (disposition && disposition.includes('filename=')) {
      const fileNameMatch = disposition.match(/filename="?(.+?)"?$/);
      if (fileNameMatch) {
        return `${nome}.${extension}`;
      }
    }

    // Caso contrário, usa o nome do projeto + extensão da URL
    return `${nome}.${extension}`;
  };

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setLightboxOpen(false);
  };

  const downloadFile = (url: string) => {
    fetch(url)
      .then(response => response.blob().then(blob => ({ blob, response }))) // Mantém tanto o blob quanto a resposta
      .then(({ blob, response }) => {
        const contentType = fileTypes[url];
        const fileName = getFileNameFromResponse(response, url);
        const blobWithType = new Blob([blob], { type: contentType || 'application/octet-stream' });

        // Cria o link de download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blobWithType);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch(error => console.error('Erro ao baixar o arquivo:', error));
  };

  return (
    <div>
      <h2 className="text-2xl dark:text-white font-semibold">Galeria:</h2>
      <div className="grid grid-cols-3 gap-4 ">
        {galeria.map((item, index) => {
          const contentType = fileTypes[item.toString()];
          const isImage = contentType && contentType.startsWith('image/');
          return (
            <div key={index} className="flex flex-col py-10">
              {isImage ? (
                <img 
                  src={item.toString()} 
                  alt={`Galeria item ${index}`} 
                  className="w-full h-auto rounded-md cursor-pointer" 
                  onClick={() => openLightbox(item.toString())} 
                />
              ) : (
                <button 
                  onClick={() => downloadFile(item.toString())} 
                  className="text-custom underline flex items-center"
                >
                  <FontAwesomeIcon className="mr-2 text-xl" icon={faFileAlt} />
                  Baixar Arquivo do Projeto {index + 1}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {lightboxOpen && selectedImage &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <img
              src={selectedImage}
              alt="Imagem em destaque"
              className="max-w-full max-h-full"
              
            />
          </div>,
          document.body
        )
      }
    </div>
  );
};

export default Galeria;
