# ProgramacionIIIAngular

instalar el paquete

dotnet add package microsoft.identitymodel.tokens
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer 

Agrego el modelo User

Agrego el LoginController

Agrego la configuracion en el appsettings.json

  "Jwt": {
    "SecretKey": "EstaEsMiClaveSecreta123456789",
    "Issuer": "https://localhost:5000/",
    "Audience": "https://localhost:5000/"
  },


Agrego en el archivo startup.cs Metodo configureservices
