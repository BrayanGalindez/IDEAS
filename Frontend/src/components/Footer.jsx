import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { BsGooglePlay } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="p-7 lg:px-20 bg-color-bg shadow md:flex md:items-center md:justify-between">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
        <div>
          {/* Redes sociales */}
          <div className="flex space-x-4 md:justify-start justify-center">
            <a href="#" className="text-xl text-white">
              <FaInstagram className="text-[1.2em]" />
            </a>
            <a href="#" className="text-xl text-white">
              <FaFacebook className="text-[1.2em]" />
            </a>
            <a href="#" className="text-xl text-white">
              <FaLinkedin className="text-[1.2em]" />
            </a>
          </div>
          {/* Términos y condiciones y Política de privacidad */}
          <div className="flex flex-col mb-3 text-[1.1rem] gap-1 text-center mt-4 text-white">
            <small className="underline">Términos y condiciones</small>
            <small className="underline">Políticas de privacidad</small>
          </div>
        </div>

        {/* Derechos reservados */}
        <div className="flex flex-col mb-3 md:flex-row md:items-center md:space-x-4 md:ml-auto md:justify-center">
          <div className="my-4 md:my-0 text-center md:text-center">
            <p className="text-[1.15rem] font-[Open Sans] text-white">
              © {new Date().getFullYear()} Banco Saint Patrick.
            </p>
            <p className="text-[1.15rem] font-[Open Sans] text-white">
              Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Enlaces a App Store y Google Play */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:ml-auto">
          <div className="flex md:flex-col lg:flex-row md:gap-3 justify-center space-x-4">
            <a
              href="#"
              className="text-[1.2rem] text-white flex gap-2 items-center"
            >
              <AiFillApple className="ml-2 text-[1.6rem]" /> App store
            </a>
            <a
              href="#"
              className="text-[1.2rem] text-white flex gap-2 items-center"
            >
              <BsGooglePlay className="ml-2 md:ml-0 text-[1.3rem]" /> Google
              play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
