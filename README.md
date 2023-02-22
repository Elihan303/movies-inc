# Movie Inc

Es una aplicacion para vizualizar y calificar peliculas que estan vigentes en cartelera a la hora de la consulta en la app

Tecnologias utilizadas para el desarrollo de esta aplicacion:

- React Native.
- TypeScript.

Librerias usadas:

- Native Base.
- Axios.
- Dotenv

Recursos externos:

- Movie Database API.

# Como iniciar el proyecto

### Paso 1.

```
yarn install
```

### Paso 2.

Crear archivo `.env` en la carpeta raiz y que esta contenga 4 variables de entorno como este ejemplo:

```
API_KEY= ejemplo12345
API_LANGUAGE=es-ES
API_PHOTOS_URL=https://image.tmdb.org/t/p/original
APP_URL=https://api.themoviedb.org/3


```

### Paso 3.

Ejecutar el siguiente comando en la carpeta raiz del proyecto:

```
 # General
 yarn start

 # Para emulador de android
 yarn android

 # Para emulador de IOS
 yarn ios

 # Para emulador de IOS
 yarn web
```

## Aclaraciones

La aplicacion solo fue probada en dispositvos Android y web por la falta de dispositivo IOS.

# Como se ve la aplicacion

## Screen - Login

![image](https://user-images.githubusercontent.com/70291386/220747993-85e44ca3-ec6b-4602-93e5-222ad2baaec7.png)

El usuario puede iniciar como invitado para poder calificar las peliculas.

## Screen - Home

![image](https://user-images.githubusercontent.com/70291386/220748531-ea6a4034-08af-4add-9563-e0ae8234686e.png)

Aqui el usuario puede apreciar el titulo, media y fecha de lanzamiento de la pelicula.

Cuando el usuario pulsa una `card` de pelicula esto lo lleva el detalle de la pelicula.

## Screen - Detail

![image](https://user-images.githubusercontent.com/70291386/220749849-d3879a78-65f3-4d3d-bf83-4b5e05efeada.png)

En esta vista te permite ver la media, titulo, fecha de lanzamiento, descripcion y generos a lo que pertenece la pelicual.

En el siguiente apartado te permite calificar la pelicula con una valoracion de 1 a 5 estrellas.En esta vista te permite ver la media, titulo, fecha de lanzamiento, descripcion y generos a lo que pertenece la pelicual.

En el siguiente apartado te permite calificar la pelicula con una valoracion de 1 a 5 estrellas.

En el siguiente apartado se puede vizualizar los actores y sus personajes dedntro de la pelicula y una foto para los que tenga disponible.

![image](https://user-images.githubusercontent.com/70291386/220749978-b2fd6890-5f11-478f-a053-46452618baa2.png)

En el siguiente apartado se puede vizualizar peliculas similares a la pelicula del detalle.

Donde se muestra poster, titulo y fecha de lanzamiento de la pelicula.

![image](https://user-images.githubusercontent.com/70291386/220763020-d88c5d46-8817-46ac-91f8-ccf01fb49ea3.png)
