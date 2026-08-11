# CampusFest

Sistema web para la gestión del festival estudiantil **CampusFest** de la Universidad CENFOTEC.

La aplicación permite publicar las actividades del festival, mostrar la agenda general, consultar los stands o grupos participantes y registrar la inscripción de los estudiantes. Además cuenta con una página de administración desde la cual se pueden crear, editar, cancelar y eliminar los registros guardados en la base de datos.

Proyecto desarrollado para el curso SOFT-11 Proyecto Integrador 1.

## Tecnologías utilizadas

**Frontend**

- HTML5
- CSS3 (con media queries propias para el modo oscuro)
- JavaScript
- Bootstrap 5.3.8 y Font Awesome 6.5.1 (por CDN)
- SweetAlert2 (por CDN, en el formulario de inscripción)

**Backend**

- Node.js
- Express 5
- Mongoose 9
- MongoDB Atlas

## Estructura del proyecto

```
ProyIntegrador1Grupo3/
├── backend/
│   ├── models/          Esquemas de Mongoose (actividad, estudiante, stands)
│   ├── routes/          Rutas de la API
│   ├── index.js         Punto de entrada del servidor
│   ├── package.json     Dependencias del backend
│   └── .env             Variables de entorno (no se sube al repositorio)
├── frontend/
│   ├── css/             Hojas de estilo de cada página
│   ├── js/              Scripts de cada página
│   └── *.html           Páginas del sitio
├── img/                 Imágenes del sitio
└── README.md
```

## Requisitos previos

Antes de instalar el proyecto se necesita tener:

- [Node.js](https://nodejs.org/) versión 18 o superior (el proyecto se desarrolló con la v24). Al instalar Node se instala también npm.
- Una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas) con un clúster creado.
- Visual Studio Code con la extensión **Live Server**, para abrir las páginas del frontend.

Para revisar que Node esté instalado:

```
node -v
npm -v
```

## Instalación

**1. Clonar el repositorio**

```
git clone https://github.com/mramirezg7/ProyIntegrador1Grupo3.git
cd ProyIntegrador1Grupo3
```

**2. Instalar las dependencias del backend**

Las dependencias se instalan dentro de la carpeta `backend`, que es donde está el `package.json`:

```
cd backend
npm install
```

Ese comando instala las siguientes dependencias que ya están declaradas en el `package.json`:

| Dependencia | Versión | Para qué se usa |
|---|---|---|
| express | ^5.2.1 | Crear el servidor y manejar las rutas |
| mongoose | ^9.8.0 | Conectarse a MongoDB y definir los esquemas |
| cors | ^2.8.6 | Permitir que el frontend consuma la API |
| dotenv | ^17.4.2 | Leer las variables del archivo .env |
| body-parser | ^2.3.0 | Interpretar los datos que llegan en formato JSON |

## Configuración de las variables de entorno

El archivo `.env` guarda los datos de conexión y **no se comparte** porque contiene las credenciales de la base de datos. Hay que crearlo manualmente dentro de la carpeta `backend`:

```
backend/.env
```

Con este contenido:

```
MONGODB_URI=mongodb+srv://USUARIO:CONTRASENA@CLUSTER.mongodb.net/campusfest
PORT=3000
```

Dónde conseguir cada valor:

- **MONGODB_URI**: se obtiene en MongoDB Atlas entrando al clúster, presionando *Connect*, eligiendo *Drivers* y copiando la cadena de conexión. Hay que reemplazar `USUARIO` y `CONTRASENA` por los del usuario de la base de datos, y agregar al final el nombre de la base (`campusfest`).
- **PORT**: el puerto donde corre el servidor. Si no se indica, el proyecto usa el 3000 por defecto. El frontend está configurado para consultar `http://localhost:3000`, así que se recomienda dejarlo en 3000.

En MongoDB Atlas también hay que permitir la conexión desde la computadora: en *Network Access* se agrega la dirección IP actual o `0.0.0.0/0` para permitir cualquiera.

## Cómo ejecutar el proyecto

El proyecto tiene dos partes que se levantan por separado.

**1. Levantar el servidor (backend)**

Desde la carpeta `backend`:

```
cd backend
node index.js
```

Si todo está bien, en la terminal aparece:

```
Servidor corriendo en http://localhost:3000
MongoDB Atlas conectado
```

Para comprobar que responde se puede abrir `http://localhost:3000` en el navegador, donde debe aparecer el mensaje "Servidor en funcionamiento".

Para detener el servidor se presiona `Ctrl + C`. Cada vez que se modifica un archivo del backend hay que detenerlo y volver a ejecutarlo para que tome los cambios.

**2. Abrir el sitio (frontend)**

Con el servidor corriendo, en Visual Studio Code se hace clic derecho sobre el archivo `frontend/pagina-inicio.html` y se elige **Open with Live Server**. La página se abre en `http://127.0.0.1:5500/frontend/pagina-inicio.html`.

Es importante abrir el sitio con Live Server y no con doble clic sobre el archivo, porque de lo contrario el navegador bloquea las peticiones al servidor.

## Páginas del sitio

| Página | Descripción |
|---|---|
| pagina-inicio.html | Información general del festival y actividades destacadas |
| lista-actividades.html | Catálogo de actividades con su cupo disponible |
| detalle-actividad.html | Detalle de una actividad, se abre con `?id=` |
| sector-agenda.html | Agenda ordenada por fecha y hora |
| stands.html | Stands y grupos participantes |
| sector-contacto.html | Datos del comité organizador y preguntas frecuentes |
| registrar-inscripcion.html | Formulario de inscripción de estudiantes |
| registrar-actividades.html | Formulario para registrar o editar actividades |
| registrar-stands.html | Formulario para registrar o editar stands |
| login-administrador.html | Acceso del administrador |
| administrador.html | Página de administración de los registros |

## API del backend

Todas las rutas responden en `http://localhost:3000`.

**Actividades** (`/actividades`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/actividades` | Lista todas las actividades con su cantidad de inscritos |
| GET | `/actividades/:id` | Obtiene una actividad |
| POST | `/actividades` | Registra una actividad |
| PUT | `/actividades/:id` | Actualiza una actividad |
| DELETE | `/actividades/:id` | Elimina una actividad |

**Estudiantes** (`/estudiantes`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/estudiantes` | Lista los estudiantes con sus actividades |
| GET | `/estudiantes/:id` | Obtiene un estudiante |
| GET | `/estudiantes/primeros/:cantidad` | Los primeros estudiantes registrados |
| GET | `/estudiantes/top-carreras/:top` | Carreras con más estudiantes inscritos |
| POST | `/estudiantes` | Registra un estudiante |
| PUT | `/estudiantes/agregar-actividad` | Inscribe a un estudiante en una actividad |
| PUT | `/estudiantes/:id` | Actualiza un estudiante |
| DELETE | `/estudiantes/:id` | Elimina un estudiante |

**Stands** (`/stands`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/stands` | Lista todos los stands |
| GET | `/stands/:id` | Obtiene un stand |
| POST | `/stands` | Registra un stand |
| PUT | `/stands/:id` | Actualiza un stand |
| DELETE | `/stands/:id` | Elimina un stand |

## Funcionamiento del cupo y los estados

Cada actividad tiene un cupo máximo y un estado que puede ser **Disponible**, **Lleno** o **Cancelado**.

El estado se calcula solo comparando el cupo máximo con la cantidad de estudiantes inscritos: cuando se llena, la actividad pasa a *Lleno* y deja de aceptar inscripciones; si se amplía el cupo o se elimina un estudiante inscrito, vuelve a *Disponible*.

El estado *Cancelado* lo define el administrador desde la página de administración y no se ve afectado por ese cálculo. Una actividad cancelada no admite inscripciones, pero conserva los estudiantes que ya estaban inscritos.

## Posibles problemas

**El servidor muestra "Ocurrió un error al conectarse con MongoDB"**

Revisar que el archivo `.env` exista dentro de `backend`, que la variable `MONGODB_URI` esté bien escrita y que la IP esté autorizada en *Network Access* de MongoDB Atlas.

**Las páginas se abren pero no muestran datos**

Casi siempre es porque el servidor no está corriendo. Hay que verificar que la terminal muestre "Servidor corriendo en http://localhost:3000".

**Los cambios del backend no se reflejan**

Node carga el código una sola vez al iniciar. Después de modificar un archivo del backend hay que detener el servidor con `Ctrl + C` y ejecutarlo de nuevo.

## Integrantes

- Maikoll Carvajal
- Michael Ramírez
- Ignacio Vila
