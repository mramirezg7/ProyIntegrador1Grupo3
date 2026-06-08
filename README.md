# Sistema Web para la Gestión del Festival Estudiantil CampusFest

Aplicación web full stack para administrar el festival estudiantil **CampusFest**, un evento anual donde se realizan actividades culturales, deportivas, tecnológicas, artísticas, gastronómicas y recreativas.

El sistema centraliza la gestión del festival, reemplazando el uso actual de hojas de cálculo, formularios externos y mensajes manuales. Permite publicar las actividades, gestionar participantes, controlar inscripciones (evitando duplicados y sobrecupos), administrar stands o grupos participantes, y mostrar la agenda general del evento.

---

## Características principales

- **Acceso diferenciado sin contraseñas:** identificación opcional mediante correo institucional para habilitar el rol de Administrador; los demás visitantes acceden como usuarios públicos.
- **Catálogo visual de actividades:** tarjetas informativas con datos completos, categoría, cupo disponible y acceso al detalle.
- **Agenda dinámica:** vista cronológica con estado de cada actividad (disponible, lleno, cancelado), eventos pasados, en ejecución y futuros (con margen mínimo de 8 horas).
- **Inscripciones con validaciones:** formulario validado en cliente y servidor; control automático de cupos y bloqueo de inscripciones duplicadas (por cédula o correo).
- **Gestión administrativa completa:** CRUD de actividades, registro de stands, consulta de participantes y publicación de resultados o reconocimientos.
- **Diseño adaptable (responsive):** experiencia optimizada tanto para escritorio como para móvil mediante media queries propias.
- **Modo oscuro automático:** detección automática de la preferencia del sistema operativo mediante `prefers-color-scheme`, sin interruptores manuales.

---

## Tecnologías utilizadas

- **Frontend:** HTML5, CSS3 (nativo, con media queries propias) y JavaScript Vanilla (ES6+).
- **Backend:** Node.js (Express, Mongoose).
- **Base de Datos:** MongoDB (Atlas).
- **Control de Versiones:** Git + GitHub.
- **Gestión de Proyecto:** Jira (Scrum).

---

## Instalación y configuración

### Programas requeridos

- Visual Studio Code
- Node.js (versión LTS 20.x o superior)
- Extensión **Live Server** en Visual Studio Code
- Cuenta en MongoDB Atlas (o instalación local de MongoDB)

### Instalar Visual Studio Code

1. Descargar desde: <https://code.visualstudio.com/>
2. Instalar con las opciones por defecto.
3. Instalar la extensión **Live Server**:
   - En VS Code → Extensions → Buscar: `Live Server` → Install.

### Instalar Node.js

1. Ir a: <https://nodejs.org/>
2. Descargar la versión LTS para el sistema operativo correspondiente.
3. Instalar con opciones por defecto.
4. Verificar la instalación en la terminal:

```
node -v
npm -v
```

### Instalar dependencias del back-end

1. Dentro de la carpeta `back-end`, abrir la terminal integrada y ejecutar:

```
npm i express
npm i mongoose
npm i cors
npm i body-parser
npm i dotenv
```

### Configurar variables de entorno

1. En la carpeta `back-end`, crear un archivo `.env` siguiendo el ejemplo de `.env.example`.
2. Completar la cadena de conexión a MongoDB Atlas y demás variables requeridas.

### Levantar el servidor

1. Desde la terminal de Visual Studio Code, dentro de la carpeta `back-end`:

```
node index.js
```

### Verificación

1. Verificar que la terminal indique que el servidor está corriendo y que se realizó la conexión a MongoDB Atlas correctamente.

### Ejecutar el front-end

1. Dentro de la carpeta `front-end`, buscar el archivo `index.html`.
2. Hacer click derecho y seleccionar **Open with Live Server**.
3. Se abrirá la aplicación en el navegador en la ruta: <http://127.0.0.1:5500/front-end/index.html>

---

## Estructura del proyecto

```
├── back-end/
│   ├── models/
│   │   ├── actividad.model.js
│   │   ├── inscripcion.model.js
│   │   └── stand.model.js
│   ├── node_modules/
│   ├── routes/
│   │   ├── actividad.route.js
│   │   ├── inscripcion.route.js
│   │   └── stand.route.js
│   ├── controllers/
│   ├── middlewares/
│   ├── .env
│   ├── .env.example
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── front-end/
│   ├── components/
│   │   ├── navbar.html
│   │   └── footer.html
│   ├── css/
│   │   ├── estilos-globales.css
│   │   ├── modo-oscuro.css
│   │   └── responsive.css
│   ├── img/
│   ├── js/
│   │   ├── formulario-inscripcion.js
│   │   ├── catalogo-actividades.js
│   │   ├── detalle-actividad.js
│   │   ├── agenda.js
│   │   ├── stands.js
│   │   └── acceso-correo.js
│   ├── index.html
│   ├── actividades.html
│   ├── detalle-actividad.html
│   ├── agenda.html
│   ├── stands.html
│   ├── contacto.html
│   └── inscripcion.html
│
├── docs/
│   ├── ERS.md
│   └── bitacoras/
│       └── bitacora-1.pdf
│
├── .gitignore
└── README.md
```

---

## Convenciones de nomenclatura

- **Archivos:** nombres en minúsculas y separados por guiones (`kebab-case`), ejemplo: `formulario-inscripcion.js`, `detalle-actividad.html`.
- **Carpetas:** minúsculas y descriptivas, ejemplo: `back-end`, `front-end`, `docs`, `components`.
- **Variables y funciones (JavaScript):** `camelCase`, ejemplo: `cuposDisponibles`, `validarFormulario()`.
- **Constantes (JavaScript):** `UPPER_SNAKE_CASE`, ejemplo: `MAX_CUPOS_ACTIVIDAD`, `API_BASE_URL`.
- **Clases y modelos (JavaScript):** `PascalCase`, ejemplo: `Actividad`, `Inscripcion`, `Stand`.
- **Clases CSS e IDs HTML:** `kebab-case`, ejemplo: `.tarjeta-actividad`, `#formulario-inscripcion`.
- **Colecciones MongoDB:** en plural y minúsculas, ejemplo: `actividades`, `inscripciones`, `stands`.
- **Endpoints REST:** `kebab-case` en plural, ejemplo: `/api/actividades`, `/api/inscripciones`.

### Formato de código

- Indentación de **2 espacios** (no tabulaciones).
- Comillas simples `'` por defecto en JavaScript.
- Punto y coma obligatorio al final de cada sentencia en JavaScript.
- Llaves en estilo K&R (apertura en la misma línea).
- Longitud máxima recomendada por línea: **100 caracteres**.
- Idioma del código (variables, funciones, comentarios): **español**.

---

## Tipos de commit

Se sigue el estándar **Conventional Commits**:

| Tipo | Descripción |
|------|--------------|
| **feat** | Nueva funcionalidad o historia de usuario implementada. |
| **fix** | Corrección de un error o bug. |
| **docs** | Cambios únicamente en documentación. |
| **style** | Cambios de formato, espacios o indentación que no afectan la lógica. |
| **refactor** | Reorganización de código sin cambiar su comportamiento. |
| **test** | Agregar o modificar pruebas. |
| **chore** | Tareas de mantenimiento, configuración o dependencias. |
| **perf** | Mejoras de rendimiento. |

### Convención de mensajes de commit

Los mensajes de commit deben seguir esta estructura:

```
<tipo>(<alcance opcional>): <descripción breve en español>

[cuerpo opcional]

[footer opcional con referencia a Jira]
```

**Reglas de redacción:**

- Verbo en modo imperativo y en español ("agrega", "corrige", "actualiza"), no en pasado.
- Primera letra en minúscula.
- Sin punto al final del título.
- Máximo 72 caracteres en la línea de título.
- Incluir el código de la historia de Jira en el footer cuando aplique (`Refs: CG3-XX`).

**Ejemplos:**

```
feat(inscripcion): agrega validacion de correo institucional

Refs: CG3-7
```

```
fix(agenda): corrige filtro de eventos pasados

Refs: CG3-4
```

```
docs(ers): actualiza matriz de trazabilidad con CG3-13
```

```
style(mobile): ajusta tarjetas a una columna en pantallas pequenas

Refs: CG3-12
```

---

## Estrategia de ramas (branches)

Se utiliza el modelo **Git Flow** simplificado:

- `main`: contiene versiones estables y liberadas. Protegida; solo recibe merges desde `develop` mediante Pull Request aprobado.
- `develop`: rama de integración del trabajo en curso.
- `feature/*`: desarrollo de nuevas funcionalidades o historias de usuario.
- `fix/*`: corrección de errores.
- `docs/*`: cambios en documentación.
- `refactor/*`: refactorización sin cambio funcional.
- `style/*`: ajustes de formato o estilos visuales.

**Convención de nombres:** `tipo/CG3-XX-descripcion-corta-en-kebab-case`

**Ejemplos:**

```
feature/CG3-7-formulario-inscripcion
fix/CG3-8-validacion-cupo-cero
docs/CG3-actualizar-ers
style/CG3-12-media-queries-mobile
```

### Flujo de trabajo

1. Crear la rama a partir de `develop`:
   ```
   git checkout develop && git pull
   git checkout -b feature/CG3-XX-descripcion
   ```
2. Trabajar localmente con commits frecuentes siguiendo la convención.
3. Al terminar, abrir un **Pull Request** hacia `develop`.
4. Otro miembro del equipo revisa y aprueba.
5. Hacer merge (preferentemente `squash and merge`) y eliminar la rama.
6. Al cierre de cada sprint, mergear `develop` a `main` y crear un tag de versión.

---

## Documentación del proyecto

- [Especificación de Requisitos de Software (ERS)](/docs/ERS.md)
- [Bitácora 1 – Sprint 1: Educción y ERS](/docs/bitacoras/bitacora-1.pdf)

---

## Equipo de trabajo

Proyecto desarrollado por el **Grupo 3** del curso **Proyecto Integrador 1 (SOFT-11)** — Universidad CENFOTEC, periodo 2026-C2.

Docente facilitadora: **Verónica Mora Lezcano**.
