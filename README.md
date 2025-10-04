# API REST - Ejemplo Clase

## Descripción
API REST desarrollada con Node.js, Express y Sequelize para gestión de usuarios y consulta de datos de Pokémon.

## Tecnologías Utilizadas
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **CORS** - Manejo de políticas de origen cruzado

## Estructura del Proyecto
```
src/
├── config/
│   ├── config.js          # Configuración general
│   └── database.js        # Configuración de base de datos
├── controllers/
│   ├── pokemon.js         # Controlador de Pokémon
│   ├── pokemones.js       # Controlador de lista de Pokémon
│   └── user.controller.js # Controlador de usuarios
├── models/
│   ├── index.js           # Índice de modelos
│   └── user.model.js      # Modelo de Usuario
├── routes/
│   ├── index.js           # Router principal
│   ├── test/
│   │   └── index.js       # Rutas de prueba y Pokémon
│   └── user/
│       └── index.js       # Rutas de usuarios
├── services/
│   └── user.service.js    # Servicios de usuario
└── index.js               # Punto de entrada de la aplicación
```

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- PostgreSQL
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd ejemplo_clase

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar el archivo .env con tus configuraciones
```

### Variables de Entorno
Crear archivo `.env` en `src/config/` con:
```env
NODE_ENV=development
PORT=3000
DB_NAME=nombre_base_datos
DB_USER=usuario_postgres
DB_PASS=contraseña_postgres
DB_HOST=localhost
```

### Ejecución
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Modelo de Datos

### Usuario (User)
```javascript
{
  id: INTEGER (auto-increment, primary key),
  name: STRING (required),
  email: STRING (required, unique),
  img: TEXT (optional),
  createdAt: DATE,
  updatedAt: DATE
}
```

## API Endpoints

### Base URL
```
http://localhost:3000
```

---

## 🧪 Rutas de Prueba (`/test`)

### GET `/test`
Obtiene información de prueba.

**Respuesta:**
```json
{
  "nombre": "cristian",
  "apellido": "Florez",
  "edad": "25"
}
```

**Ejemplo de petición:**
```bash
curl -X GET http://localhost:3000/test
```

---

### POST `/test/post`
Realiza una suma de dos números.

**Body:**
```json
{
  "nOne": 5,
  "nTwo": 3
}
```

**Respuesta:**
```json
{
  "message": "Esta es la suma",
  "sum": 8
}
```

**Ejemplo de petición:**
```bash
curl -X POST http://localhost:3000/test/post \
  -H "Content-Type: application/json" \
  -d '{"nOne": 5, "nTwo": 3}'
```

---

### POST `/test/pokemon`
Obtiene información detallada de un Pokémon específico.

**Headers requeridos:**
```
token: 2424
```

**Body:**
```json
{
  "name": "pikachu"
}
```

**Respuesta exitosa:**
```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [
    {"type": "electric"}
  ],
  "abilities": [
    {"ability": "static"},
    {"ability": "lightning-rod"}
  ],
  "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
}
```

**Respuesta de error (no autorizado):**
```json
{
  "message": "No esta autorizado para acceder a esta info"
}
```

**Ejemplo de petición:**
```bash
curl -X POST http://localhost:3000/test/pokemon \
  -H "Content-Type: application/json" \
  -H "token: 2424" \
  -d '{"name": "pikachu"}'
```

---

### GET `/test/pokemones`
Obtiene una lista de todos los Pokémon disponibles (limitado a 1000).

**Respuesta:**
```json
[
  {"name": "bulbasaur"},
  {"name": "ivysaur"},
  {"name": "venusaur"},
  ...
]
```

**Ejemplo de petición:**
```bash
curl -X GET http://localhost:3000/test/pokemones
```

---

## 👥 Rutas de Usuarios (`/user`)

### GET `/user`
Obtiene todos los usuarios registrados.

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "img": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "María García",
    "email": "maria@example.com",
    "img": null,
    "createdAt": "2024-01-16T14:20:00.000Z",
    "updatedAt": "2024-01-16T14:20:00.000Z"
  }
]
```

**Ejemplo de petición:**
```bash
curl -X GET http://localhost:3000/user
```

---

### GET `/user/:id`
Obtiene un usuario específico por su ID.

**Parámetros:**
- `id` (integer): ID del usuario

**Respuesta exitosa:**
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "img": "https://example.com/avatar.jpg",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Respuesta de error (usuario no encontrado):**
```json
{
  "message": "Usuario no encontrado"
}
```

**Ejemplo de petición:**
```bash
curl -X GET http://localhost:3000/user/1
```

---

### POST `/user`
Crea un nuevo usuario.

**Body:**
```json
{
  "name": "Carlos López",
  "email": "carlos@example.com",
  "img": "https://example.com/carlos-avatar.jpg"
}
```

**Respuesta:**
```json
{
  "id": 3,
  "name": "Carlos López",
  "email": "carlos@example.com",
  "img": "https://example.com/carlos-avatar.jpg",
  "createdAt": "2024-01-17T09:15:00.000Z",
  "updatedAt": "2024-01-17T09:15:00.000Z"
}
```

**Ejemplo de petición:**
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos López",
    "email": "carlos@example.com",
    "img": "https://example.com/carlos-avatar.jpg"
  }'
```

---

### PUT `/user/:id`
Actualiza un usuario existente.

**Parámetros:**
- `id` (integer): ID del usuario a actualizar

**Body:**
```json
{
  "name": "Carlos López Actualizado",
  "email": "carlos.nuevo@example.com"
}
```

**Respuesta exitosa:**
```json
{
  "id": 3,
  "name": "Carlos López Actualizado",
  "email": "carlos.nuevo@example.com",
  "img": "https://example.com/carlos-avatar.jpg",
  "createdAt": "2024-01-17T09:15:00.000Z",
  "updatedAt": "2024-01-17T11:30:00.000Z"
}
```

**Respuesta de error (usuario no encontrado):**
```json
{
  "message": "Usuario no encontrado"
}
```

**Ejemplo de petición:**
```bash
curl -X PUT http://localhost:3000/user/3 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos López Actualizado",
    "email": "carlos.nuevo@example.com"
  }'
```

---

### DELETE `/user/:id`
Elimina un usuario existente.

**Parámetros:**
- `id` (integer): ID del usuario a eliminar

**Respuesta exitosa:**
```json
{
  "message": "Usuario eliminado"
}
```

**Respuesta de error (usuario no encontrado):**
```json
{
  "message": "Usuario no encontrado"
}
```

**Ejemplo de petición:**
```bash
curl -X DELETE http://localhost:3000/user/3
```

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Petición exitosa |
| 201 | Created - Recurso creado exitosamente |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## Manejo de Errores

### Errores de Validación
```json
{
  "error": "Mensaje de error descriptivo"
}
```

### Errores de Base de Datos
```json
{
  "error": "Error en el servidor",
  "details": "Detalles específicos del error"
}
```

## Notas Importantes

1. **Autenticación**: El endpoint `/test/pokemon` requiere un token en el header `token: 2424`
2. **Validación**: El email debe ser único en la base de datos
3. **Imágenes**: El campo `img` es opcional y acepta URLs de imágenes
4. **Timestamps**: Todos los usuarios incluyen `createdAt` y `updatedAt` automáticamente
5. **CORS**: Configurado para permitir peticiones desde cualquier origen en desarrollo

## Desarrollo

### Scripts Disponibles
```bash
npm run dev    # Ejecutar en modo desarrollo con nodemon
npm start      # Ejecutar en modo producción
```

### Base de Datos
La aplicación sincroniza automáticamente la base de datos al iniciar. Asegúrate de que PostgreSQL esté ejecutándose y las credenciales en el archivo `.env` sean correctas.

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request