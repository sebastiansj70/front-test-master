# Requerimientos

Necesitamos desarrollar una Single Page Application (SPA) que muestre la información de nuestras imagenes:
  1. Mostrar todas las imagenes con un scroll infinito.
  2. Filtrar el contenido a través de una búsqueda (No es necesario que el resultado sea coherente).
  3. Realizar un like/unlike de cada uno de los items. UI responsive.

# Información

En el momento del desarrollo de la aplicación cliente, el API no se encuentra desarrollada, por
lo que esta incluida una api mock que simula el comportamiento de la API.

Para arrancar la api mock simplemente ejecutar:

`npm run mocks`

## Endpoints

### `GET http://localhost:3100/images`
```json
[
  {
    "type": "Image",
    "id": 2,
    "title": "Train in India-Agra",
    "author": "SamyRoad",
    "created_at": "2012-12-12T21: 08: 20Z",
    "main_attachment": {
      "big": "http://lorempixel.com/400/500/",
      "small": "http://lorempixel.com/100/125/"
    },
    "likes_count": 5,
    "liked": true,
    "links": [
      {
        "rel": "avatar",
        "uri": "http://lorempixel.com/250/250/",
        "methods": "GET"
      },
      {
        "rel": "like",
        "uri": "http://localhost:3100/images/2/likes",
        "methods": "POST"
      }
    ]
  },
  ...
]
```

Se puede utilizar los query params `search` y `page` para simular la busqueda y paginación.


### `POST http://localhost:3100/images/:id/likes`

Espera un body vacio y respondera con un 204 si todo ha ido correctamente, simula la acción de like.

# Diseño

La visualización de la aplicación cambia dependiendo del dispositivo que se este utilizando.
- En el caso de que se utilice un dispositivo móvil, se debe de mostrar la aplicación siguiendo el diseño mobile.psd.
- En el caso que se utilice una pantalla mayor, se debe de utilizar el diseño web.psd, con un mínimo de 2 columnas y un máximo de 4.

Los diseños se pueden encontrar [aqui](https://www.dropbox.com/sh/r1fp5nz7x046kjt/AACQdbp6bZlv2pNtCN2lTEoEa?dl=0).

Si no dispones de photoshop puedes usar [photopea](https://www.photopea.com/).

# Implementación

- Diseñar e implementar la aplicación usando preferiblemente React.
- HTML y estilos responsive a partir de los PSDs: mobile para móviles y web para Desktop.

Se valorarán el uso e implementación de tests.

# Solucion

## Cambios Realizados

Por problemas al buscar una biblioteca de iconos gratuita, se decidió reemplazar los iconos originales por una alternativa utilizando **Font Awesome**. Esto asegura que los iconos se mantengan consistentes y no impacten la experiencia del usuario.  
Si necesitas usar otros iconos más adelante, puedes integrar nuevas bibliotecas fácilmente.

##  Levantar el Proyecto

Sigue estos pasos para iniciar tanto la aplicación como la API mock:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/sebastiansj70/front-test-master.git
   cd front-test-master
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```
3. **Inicia la aplicacion**:
    ```bash
    docker-compose up
    ```
    esto inicia la API mock disponible en `http://localhost:3100`.
    y la aplicacion estará disponible en `http://localhost:3000`.

---

## Pruebas
### Ejecución de tests:
1. **Levantar todos los tests**:
   ```bash
   npm test
   ```
---

- La estructura del proyecto sigue **buenas prácticas de desarrollo** con componentes reutilizables y separación clara entre lógica y presentación.


## Conclusión

Con este proyecto se espera mostrar imágenes con scroll infinito, permitir búsquedas y realizar acciones de like/unlike. El diseño está adaptado para dispositivos móviles y pantallas grandes, garantizando una **experiencia fluida y responsive**.