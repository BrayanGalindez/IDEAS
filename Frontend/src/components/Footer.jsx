import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { AiFillApple, AiFillAndroid } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="p-5 mt-10 bg-color-theme shadow md:flex md:item-center md:justify-between  bottom-0 left-0 right-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
        {/* Redes sociales */}
        <div className="flex space-x-4">
          <a href="#" className="text-xl text-white">
            <FaFacebook />
          </a>
          <a href="#" className="text-xl text-white">
            <FaLinkedin />
          </a>
          <a href="#" className="text-xl text-white">
            <FaInstagram />
          </a>
        </div>

        {/* Derechos reservados y Enlaces a App Store y Google Play */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:ml-auto">
          <div className="my-4 md:my-0 text-center md:text-center">
            <p className="text-xl font-[Open Sans] text-white">
              © {new Date().getFullYear()} Banco Saint Patrick.
            </p>
            <p className="text-xl font-[Open Sans] text-white">
              Todos los derechos reservados.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-xl text-white flex items-center">
              <AiFillApple className="ml-2" /> App store
            </a>
            <a href="#" className="text-xl text-white flex items-center">
              <AiFillAndroid className="ml-2" /> Google play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
