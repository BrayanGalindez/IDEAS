import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const AutoLogout = ({ sessionTimeout }) => { 
    const navigate = useNavigate();
    const data = localStorage.getItem('userData'); 
    const userData = JSON.parse(data)

    useEffect(() => {

        let logoutTimer;

        //Funcion que llama a handleLogout y establece un tiempo para ejecutarla
        const resetTimer = () => {
            clearTimeout(logoutTimer); //limpia el contador
            logoutTimer = setTimeout(handleLogout, sessionTimeout);
        };

        //Funcion que realiza el cierre de sesion 
        const handleLogout = async () => {
            if(userData){
                await navigate('/autoclosed');
                localStorage.clear();
            }
        };
        
        //Reinicia el contador
        const handleActivity = () => {
            resetTimer();
        };
    
        // Agregar eventos para detectar actividad del usuario
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
    
        // Iniciar el temporizador al cargar el componente
        resetTimer();
    
        // Limpiar eventos y temporizador
        return () => {
            clearTimeout(logoutTimer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };

    }, [navigate, sessionTimeout, userData]);
}
