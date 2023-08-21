import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa";
import { BsGooglePlay } from "react-icons/bs";
import clover from "../assets/clover.png";

const Footer = () => {
  return (
    <footer className="mt-auto p-7 lg:px-20 bg-color-bg shadow grid md:grid-cols-3 md:gap-6 md:items-center">
      {/* Redes sociales y Términos y condiciones */}
      <div className="md:col-span-1">
        <div className="grid gap-4 justify-center">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white hover:text-pink-500 transition duration-200"
          >
            <FaInstagram className="text-[1.2em]" />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white hover:text-blue-600 transition duration-200"
          >
            <FaFacebook className="text-[1.2em]" />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-white hover:text-blue-700 transition duration-200"
          >
            <FaLinkedin className="text-[1.2em]" />
          </a>
          <small className="col-span-3 text-center text-white mt-2 underline hover:text-color-button">
            <a href="#">Términos y condiciones</a>
          </small>
          <small className="col-span-3 text-center text-white underline hover:text-color-button">
            <a href="#">Políticas de privacidad</a>
          </small>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="text-center md:col-span-1 mt-4 md:mt-0">
        <div className="mb-4">
          <p className="text-[1.15rem] font-[Open Sans] text-white">
            © {new Date().getFullYear()} Banco Saint Patrick.
          </p>
          <p className="text-[1.15rem] font-[Open Sans] text-white">
            Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Enlaces a App Store y Google Play */}
      <div className="grid grid-cols-2 gap-4 justify-center md:col-span-1 mt-4 md:mt-0">
        <a
          href="https://apps.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[1.2rem] text-white hover:text-blue-500 transition duration-200 flex gap-2 items-center"
        >
          <FaAppStoreIos className="ml-2 text-[1.6rem]" /> App store
        </a>
        <a
          href="https://play.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[1.2rem] text-white hover:text-green-500 transition duration-200 flex gap-2 items-center"
        >
          <BsGooglePlay className="ml-2 md:ml-0 text-[1.3rem]" /> Google play
        </a>
      </div>

      {/* Clover images */}
      <div className="hidden md:hidden lg:block absolute mt-[-350px] right-[-100px] sm:right-0 z-10">
        <img src={clover} width="240px" height="291px" alt="clover" />
      </div>
      <div className="hidden md:hidden lg:block absolute mt-[-370px] left-[-70px] rotate-[70deg] sm:left-5 z-20">
        <img src={clover} width="160px" height="200px" alt="clover" />
      </div>
    </footer>
  );
};

export default Footer;
