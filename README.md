# IDEAS
 Primer proyecto del grupo IDEAS. Creación de un sitio web integral con enfoque en Frontend, Backend, Bases de datos, SCRUM y buenas prácticas.

 ## BACKEND ENDPOINTS
 https://ideas-backend-git-backend-taber76.vercel.app/

  ### POST /api/users/login
  `body{cardNumber:string, pin:string}` (el pin para todos los usuarios es 1234) **devuelve** un JSON con los datos de usuarios he incluye un JWT.

  ### GET /api/transactions?id=...
  query id de usuario + headers: { 'Autorization': 'Bearer ${JWT recibido al hacer el login}'} **devuelve** un JSON con todas las transacciones del usuario.

  ### POST /api/transactions
  `body{monto: number, tarjeta_origen:string, tarjeta_destino:string}` + headers: { 'Autorization': 'Bearer ${JWT recibido al hacer el login}'} **devuelve** un mensaje en JSON.


  ### **EXTRA** GET /api/users
  Devuelve todos los usuarios almacendaos en la base de datos, para poder hacer los testeos con estos.
