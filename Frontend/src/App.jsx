import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AutoLogout } from "../src/components/AutoLogout.jsx";
import PageTransition from "./components/PageTransition";

function App() {
    return (
        <div
            id="root"
            className="flex flex-col min-h-screen overflow-hidden sm:overflow-auto"
        >
            {/* Autologut: la variable sessionTimeout es la cantidad de segundo para el auto logut */}

            {/* <AutoLogout sessionTimeout={20000} /> */}
            <Navbar />
            <PageTransition />
            <Footer />
        </div>
    );
}
export default App;
