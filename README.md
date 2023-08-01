# IDEAS
 Primer proyecto del grupo IDEAS. Creación de un sitio web integral con enfoque en Frontend, Backend, Bases de datos, SCRUM y buenas prácticas.

 ## BACKEND ENDPOINTS
 https://ideas-backend-git-backend-taber76.vercel.app/

  ### POST /api/users/login
  `body{cardNumber:string, pin:string}` (el pin para todos los usuarios es 1234) **devuelve** un JSON con los datos de usuarios he incluye un JWT.
  [
    {
        "id": 2,
        "nombre": "Susana",
        "apellido": "Oria",
        "saldo": "10200.00",
        "activo": true,
        "picture": "https://s3.ppllstatics.com/ideal/www/pre2017/multimedia/noticias/201509/13/media/cortadas/zanahoria--320x378.jpg",
        "cards": [
            {
                "numero_tarjeta": "1231123146547897"
            }
        ],
        "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY5MDg5NzY1NywiZXhwIjoxNjkwODk5NDU3fQ.XsC1VT8I1WVp0TjJvFu2fE8-DIYDrCHxjyvbbOVBpYY"
    }
]

  ### GET /api/transactions?id=...
  query id de usuario + headers: { 'Autorization': 'Bearer ${JWT recibido al hacer el login}'} **devuelve** un JSON con todas las transacciones del usuario.

  ### POST /api/transactions
  `body{monto: number, tarjeta_origen:string, tarjeta_destino:string}` + headers: { 'Autorization': 'Bearer ${JWT recibido al hacer el login}'} **devuelve** un mensaje en JSON.


  ### **EXTRA** GET /api/users
  Devuelve todos los usuarios almacendaos en la base de datos, para poder hacer los testeos con estos.
