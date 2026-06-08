# Sistema de Gestión de Festivales Estudiantiles - CampusFest
## Especificación de Requisitos de Software (ERS)

---

## 1. Descripción General del Sistema
El sistema **CampusFest** es una plataforma web integral diseñada para automatizar, centralizar y optimizar la gestión de festivales estudiantiles. Su propósito principal es facilitar la coordinación entre los organizadores (Administradores) y la comunidad estudiantil, permitiendo el registro de usuarios mediante credenciales institucionales, la creación y publicación de eventos cronogramas, la inscripción y votación en actividades, y la generación de reportes métricos en tiempo real. La solución busca erradicar los procesos manuales, garantizando un entorno seguro, accesible y de alta disponibilidad.

---

## 2. Perfiles de Usuario y Actores
* **Administrador:** Usuario de la institución con privilegios totales. Se encarga de la configuración global, validación de accesos, creación y modificación del cronograma del festival, gestión de categorías y generación de reportes de participación y votaciones.
* **Estudiante / Usuario General:** Miembro de la comunidad académica que ingresa con su correo institucional. Puede visualizar el catálogo de eventos, inscribirse en actividades específicas, emitir votos en concursos habilitados y recibir notificaciones o alertas del festival.

---

## 3. Suposiciones, Dependencias y Restricciones
* **Suposición:** Se asume que todos los usuarios estudiantes cuentan con un correo electrónico institucional activo bajo el dominio oficial de la universidad.
* **Dependencia:** El sistema depende de la disponibilidad continua del servidor de bases de datos y del correcto funcionamiento del servicio de internet de la institución para el envío de alertas.
* **Restricción:** La aplicación debe ser completamente accesible desde dispositivos móviles y de escritorio (Diseño Adaptable/Responsive), y no implementará pasarelas de pago ni autenticación tradicional por contraseñas complejas en su primera fase.

---

## 4. Requisitos Funcionales (RF)

| ID | Requisito | Descripción |
| :--- | :--- | :--- |
| **RF-01** | Registro de Usuarios | El sistema permitirá a los usuarios registrarse utilizando exclusivamente su correo institucional. |
| **RF-02** | Inicio de Sesión | Los usuarios podrán autenticarse de forma segura mediante su correo institucional para acceder a sus perfiles. |
| **RF-03** | Detalle de la Actividad | El sistema mostrará la información detallada de cada actividad, incluyendo descripción, expositor, horario y ubicación. |
| **RF-04** | Registro de Eventos | El Administrador podrá registrar nuevos eventos en el sistema, asignándoles categoría, fecha, hora y cupo máximo. |
| **RF-05** | Modificación de Eventos | El Administrador podrá editar cualquier campo de un evento previamente registrado o cancelar el evento si es necesario. |
| **RF-06** | Visualización del Listado | El sistema presentará un catálogo o lista completa de todas las actividades programadas para el festival. |
| **RF-07** | Filtrado de Actividades | Los usuarios podrán filtrar las actividades del festival por categorías (música, arte, tecnología, etc.) o por fecha. |
| **RF-08** | Acceso Diferenciado | El sistema restringirá el acceso a los módulos de gestión, permitiendo la entrada a las vistas de administración solo a roles autorizados. |
| **RF-09** | Inscripción a Actividades | Los estudiantes podrán inscribirse en las actividades disponibles que cuenten con cupos libres. |
| **RF-10** | Cancelación de Inscripción | Los usuarios inscritos podrán darse de baja de una actividad antes de que esta dé inicio para liberar el cupo. |
| **RF-11** | Votación en Eventos | El sistema permitirá a los estudiantes emitir un voto único en los concursos o eventos del festival que tengan la opción habilitada. |
| **RF-12** | Reporte de Asistencia | El sistema generará reportes cuantitativos sobre la cantidad de inscritos y asistentes estimados por cada actividad. |
| **RF-13** | Reporte de Votaciones | El Administrador podrá visualizar un reporte con el conteo final y detallado de los votos emitidos en cada categoría competitiva. |
| **RF-14** | Alertas de Eventos | El sistema enviará notificaciones o alertas en la interfaz a los usuarios sobre cambios de horario o cancelaciones en sus eventos inscritos. |

---

## 5. Requisitos No Funcionales (RNF)

| ID | Requisito | Categoría | Descripción |
| :--- | :--- | :--- | :--- |
| **RNF-01** | Alta Disponibilidad | Tolerancia a Fallos | El sistema debe mantener una disponibilidad del 99.5% durante los días de ejecución del festival. |
| **RNF-02** | Tiempo de Respuesta | Rendimiento | Las consultas de listados y filtros de eventos deben responder en un tiempo menor a 2 segundos bajo condiciones normales. |
| **RNF-03** | Resguardo de Datos | Seguridad | Se realizarán copias de seguridad automáticas de la base de datos cada 24 horas para evitar la pérdida de información. |
| **RNF-04** | Cifrado de Datos | Seguridad | Toda la información sensible transmitida entre el cliente y el servidor viajará cifrada mediante el protocolo HTTPS. |
| **RNF-05** | Interfaces Intuitivas | Usabilidad | El diseño de la interfaz debe ser limpio, intuitivo y fácil de usar, requiriendo menos de 3 clics para completar una inscripción. |
| **RNF-06** | Diseño Adaptable | Portabilidad | La interfaz de usuario debe ser 100% responsive, adaptándose correctamente a teléfonos móviles, tabletas y computadoras. |

---

## 6. Restricciones de Diseño e Implementación
* **Arquitectura y Tecnologías:** La aplicación web se desarrollará utilizando Node.js y Express para el backend, garantizando una arquitectura escalable y de alto rendimiento.
* **Persistencia de Datos:** Se empleará un sistema de gestión de bases de datos relacional o no relacional adecuado para el manejo de transacciones concurrentes de inscripción.
* **Entorno de Producción:** La aplicación se estructurará siguiendo estándares modulares que faciliten su despliegue en entornos en la nube (ej. Render, AWS o similares).

---

## 7. Normativas de Desarrollo (Git & Código)
* **Estilo de Código:** Se utilizarán las convenciones estándar de nomenclatura (CamelCase para variables y funciones en JavaScript).
* **Estrategia de Ramas (Git branching):**
    * `main` / `master`: Producción limpia y estable.
    * `develop`: Integración de características terminadas.
    * `feature/nombre-tarea`: Ramas de trabajo individuales para el desarrollo de funcionalidades específicas.
* **Estándar de Commits (Conventional Commits):**
    * `feat:` para nuevas funcionalidades (ej. *feat: add login implementation*).
    * `fix:` para corrección de errores (ej. *fix: resolve filter rendering glitch*).
    * `docs:` para cambios en la documentación (ej. *docs: update README with ERS*).

---

## 8. Matriz de Trazabilidad de Requisitos

| ID Requisito | Nombre del Requisito | Tipo | Elemento Jira Asociado (Épica / Historia) |
| :--- | :--- | :--- | :--- |
| **RF-01** | Registro de Usuarios | Funcional | VG-1: Historia - Registro con correo institucional |
| **RF-02** | Inicio de Sesión | Funcional | VG-2: Historia - Autenticación de usuarios |
| **RF-03** | Detalle de la Actividad | Funcional | VG-3: Historia - Vista detallada de eventos |
| **RF-04** | Registro de Eventos | Funcional | VG-4: Historia - Creación de actividades (Admin) |
| **RF-05** | Modificación de Eventos | Funcional | VG-5: Historia - Edición y cancelación de eventos |
| **RF-06** | Visualización del Listado | Funcional | VG-6: Historia - Catálogo general de actividades |
| **RF-07** | Filtrado de Actividades | Funcional | VG-7: Historia - Filtros por categoría y fecha |
| **RF-08** | Acceso Diferenciado | Funcional | VG-8: Historia - Restricción de vistas administrativas |
| **RF-09** | Inscripción a Actividades | Funcional | VG-9: Historia - Módulo de inscripción para estudiantes |
| **RF-10** | Cancelación de Inscripción | Funcional | VG-10: Historia - Cancelación de cupos de eventos |
| **RF-11** | Votación en Eventos | Funcional | VG-11: Historia - Sistema de voto único en concursos |
| **RF-12** | Reporte de Asistencia | Funcional | VG-12: Historia - Métricas de inscritos (Admin) |
| **RF-13** | Reporte de Votaciones | Funcional | VG-13: Historia - Resultados de votaciones (Admin) |
| **RF-14** | Alertas de Eventos | Funcional | VG-14: Historia - Sistema de notificaciones internas |
| **RNF-01** | Alta Disponibilidad | No Funcional | Vinculado a Tareas de Infraestructura y Despliegue |
| **RNF-02** | Tiempo de Respuesta | No Funcional | Vinculado a Optimización de Consultas en Base de Datos |
| **RNF-03** | Resguardo de Datos | No Funcional | Vinculado a Configuración de Backups Automáticos |
| **RNF-04** | Cifrado de Datos | No Funcional | Vinculado a Implementación de Certificados SSL/HTTPS |
| **RNF-05** | Interfaces Intuitivas | No Funcional | Vinculado a Tareas de Diseño de UI/UX |
| **RNF-06** | Diseño Adaptable | No Funcional | Vinculado a Hojas de Estilo Responsive (CSS/Frameworks) |
