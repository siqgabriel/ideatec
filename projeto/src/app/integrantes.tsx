import Avatar from '@/img/avatar.png'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Integrantes() {
  return ( 
    <section className="integrantes">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl dark:text-white font-bold">Conheça nossos desenvolvedores!</h2>
        <p className="text-center text-xl mt-5 pb-5 px-10 border-b-2 border-custom dark:text-white">Faça parte desse time também!</p>

        <div className="grid grid-cols-4 px-10 pt-20">
          <div className="integrantes-box">
            <Image src={Avatar} alt="Avatar" width={100} height={100} className='rounded-full' />
            <h3 className='text-xl font-semibold'>Pedro Augusto</h3>
            <p className='text-center'>Desenvolvedor Back-End</p>
            <a href="" className='border-2 px-8 py-2 rounded-full hover:bg-custom hover:border-custom'>Ver perfil</a>
          </div>
          <div className="integrantes-box">
            <Image src={Avatar} alt="Avatar" width={100} height={100} className='rounded-full' />
            <h3 className='text-xl font-semibold'>Gabriel de Siqueira</h3>
            <p className='text-center'>Desenvolvedor Front-end</p>
            <a href="" className='border-2 px-8 py-2 rounded-full hover:bg-custom hover:border-custom'>Ver perfil</a>
          </div>
          <div className="integrantes-box">
            <Image src={Avatar} alt="Avatar" width={100} height={100} className='rounded-full' />
            <h3 className='text-xl font-semibold'>Carlos Eduardo</h3>
            <p className='text-center'>Desenvolvedor Full-Stack</p>
            <a href="" className='border-2 px-8 py-2 rounded-full hover:bg-custom hover:border-custom'>Ver perfil</a>
          </div>
          <div className="flex flex-col justify-between items-center px-10 py-14 m-8 rounded-2xl shadow-md h-[500px] text-white bg-gradient-to-b from-slate-200 to-slate-400 dark:bg-gradient-to-b dark:from-zinc-700 dark:to-zinc-900 ">
            <Image src={Avatar} alt="Avatar" width={100} height={100} className='rounded-full p-2' />
            <button className='text-xl text-white dark:text-gray-500 hover:text-lg hover:text-custom dark:hover:text-custom'>
              <FontAwesomeIcon icon={faPlus} className='border-4 p-2 mb-10 border-white dark:border-gray-500 hover:border-custom dark:hover:border-custom rounded-full' />
              <h3 className=''><strong>Entre no time!</strong></h3>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}