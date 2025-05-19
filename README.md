# CRUD-API-INSYDE

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-9.1.2-764ABC?logo=redux&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?logo=bootstrap&logoColor=white)

## 📋 Descripción

Frontend desarrollado en React para la gestión de contenido multimedia a través de una API REST creada con Node.js. Esta aplicación permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre archivos multimedia, playlists y eventos en un calendario.

El proyecto está desplegado en Vercel y conectado a una base de datos MongoDB.

## ✨ Características principales

- **Sistema de autenticación**: Login y páginas privadas protegidas
- **Gestión de archivos multimedia**:
  - Subida y visualización de archivos (imágenes, videos)
  - Organización en playlists
  - Edición de metadatos (título, descripción, duración)
  - Generación automática de miniaturas para videos
- **Calendario de eventos**:
  - Creación y gestión de eventos
  - Asignación de eventos a players y playlists
  - Visualización en calendario interactivo con React Big Calendar
- **Players**:
  - Administración de players (dispositivos de reproducción)
  - Asignación de playlists y eventos a players específicos
- **Interfaz de usuario intuitiva**:
  - Diseño responsive adaptado a diferentes dispositivos
  - Tablas filtrables y paginadas
  - Notificaciones y alertas para acciones importantes

## 🛠️ Tecnologías utilizadas

- **React 18**: Biblioteca JavaScript para construir interfaces de usuario
- **Vite**: Herramienta de compilación rápida para desarrollo frontend
- **Redux Toolkit**: Gestión de estado global de la aplicación
- **React Router**: Navegación y enrutamiento
- **Axios**: Cliente HTTP para realizar peticiones a la API
- **React Hook Form**: Manejo de formularios
- **React Bootstrap**: Componentes de interfaz de usuario
- **React Big Calendar**: Visualización de eventos en calendario
- **SweetAlert2**: Alertas y notificaciones
- **DayJS**: Manipulación de fechas
- **TanStack React Table**: Tablas avanzadas con ordenamiento y filtrado

## 🚀 Instalación y uso

### Requisitos previos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos para instalar

1. Clona el repositorio:
```bash
git clone https://github.com/PeterManga/CRUD-API-INSYDE.git
cd CRUD-API-INSYDE
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Crea un archivo `.env` en la raíz del proyecto con la URL de tu API:
```
VITE_API_URL=http://tu-api-url.com/api
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

5. Accede a la aplicación en tu navegador: http://localhost:5173

## 📁 Estructura del proyecto

```
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Componentes reutilizables
├── contexts/        # Contextos de React
├── pages/           # Páginas principales de la aplicación
├── redux/           # Configuración y slices de Redux Toolkit
├── routes/          # Definición de rutas y enrutamiento
├── services/        # Servicios para comunicación con la API
├── utils/           # Funciones de utilidad
├── App.jsx          # Componente principal
└── main.jsx         # Punto de entrada
```

## 📱 Despliegue

La aplicación está desplegada en Vercel y puedes acceder a ella en: [URL de la aplicación](https://tu-url-de-despliegue)

## 🤝 Contribuir

Si deseas contribuir a este proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu función (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Añadir una función increíble'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo LICENSE.md para detalles

## 📞 Contacto

Pedro Manga - [pedroblack1504@gmail.com](mailto:pedroblack1504@gmail.com)

Enlace del proyecto: [https://github.com/PeterManga/CRUD-API-INSYDE](https://github.com/PeterManga/CRUD-API-INSYDE)
