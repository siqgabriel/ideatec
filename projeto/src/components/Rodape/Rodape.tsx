import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;


export default function Footer() {
    return (
      <footer className="rodape">
        <div className="rodape-container">
          <div className="rodape-content">
            <div className="flex flex-col items-center md:items-start bg-transparent">
                <h2 className="bg-transparent">
                    IDEATEC 
                    <br />
                    O FUTURO NAS NOSSAS MÃOS
                </h2>
                <p className="rodape-description">Conheça nossas redes sociais!</p>
                <div className="rodape-social-icons">
                    <a href="#" className="rodape-social-icon">
                        <FontAwesomeIcon icon={faFacebook} className="icone"/>
                    </a>
                    <a href="#" className="rodape-social-icon">
                        <FontAwesomeIcon icon={faLinkedin} className="icone"/>
                    </a>
                    <a href="#" className="rodape-social-icon">
                        <FontAwesomeIcon icon={faGithub} className="icone"/>
                    </a>
                </div>
            </div>
  
            <div className="rodape-links">
              <div className="rodape-link-section">
                <h3 className="rodape-link-title">Menu</h3>
                <ul className="rodape-link-list">
                    <li>
                        <Link href="#" className="bg-transparent hover:text-custom">Home</Link>
                    </li>
                    <li>
                        <Link href="#" className="bg-transparent hover:text-custom">Check Point</Link>
                    </li>
                    <li>
                        <Link href="#" className="bg-transparent hover:text-custom">Global Solution</Link>
                    </li>
                    <li>
                        <Link href="#" className="bg-transparent hover:text-custom">Challenger Sprints</Link>
                    </li>
                </ul>
              </div>
  
              <div className="rodape-link-section">
                <h3 className="rodape-link-title">Entre em contato</h3>
                <ul className="rodape-link-list">
                  <li className="rodape-contact-phone">(11) 95300-7890</li>
                  <li><a href="mailto:support@domain.com" className="rodape-link-item">rm@fiap.com.br</a></li>
                </ul>
              </div>
            </div>
  
            <div className="rodape-form">
              <h3 className="rodape-link-title">Envie um email para nós!</h3>
              <form className="rodape-form1">
                <input
                  type="email"
                  placeholder="Email"
                  className="rodape-form-input"
                />
                <button className="rodape-form-button">
                  Enviar
                </button>
              </form>
            </div>
          </div>

          <div className="rodape-copyright">
            <p className="rodape-copyright-text">&copy; 2024 Ideatec. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    );
  }