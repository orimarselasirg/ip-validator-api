# Ip-validator-api

esta API se desarrollo para servir inforación a la webapp IP-Validator.
desde este backend se gestiona toda la logica de almacenamiento, solicitudes, y calculos correspondientes
a la data requeridad desde el frontend

## Como iniciar el proyecto

Para iniciar este proyecto desde tu equipo local puedes usar lo siguientes scripts

es importante que establezcas las variables de entornos correspondientes, a continuacion debes
definir las siguientes variables de entorno en tu equipo local

### PORT
### DB_NAME
### DB_USERNAME
### DB_PASSWORD
### DB_HOST 
### DB_PORT 
### API_KEY [https://ipapi.com/](http://api.ipapi.com/api/) debes abrir una cuenta, generar un api key y usar la api key en esta variable
### API_KEY_FIXER [https://api.fastforex.io](https://api.fastforex.io/fetch-all) debes abrir una cuenta, generar un api key y usar la api key en esta variable


una vez definidas las variables de entorno procede con lo siguiente:

### `yarn` o `npm install`
con este comando se instalaran todas las dependencias que el proyecto requiere

### `yarn dev` o `npm dev` 

Corre el proyecto en modo desarrollo desde la ruta [http://localhost:80](http://localhost:80).

podras validar el levantamiento de la informacion de manera correcta al ver
en la consola que estas conectado a puerto 80 y conectado a la base de datos


# ip-validator-api
