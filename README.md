# Guía para Comprender y Desplegar el Proyecto Emprendedores-UBB

Este documento proporciona los pasos necesarios para que cualquier persona, incluso si no tiene experiencia previa con estas tecnologías, pueda entender y desplegar el proyecto.

## Tecnologías Utilizadas

- **Backend**: API REST utilizando el stack MERN (MongoDB, Express, React, Node.js).
  - Validaciones completas:
    - De base de datos.
    - De schema para campos y valores.
    - HTTP en los controladores.
    - De rutas.
    - De autenticación y autorización usando roles y JWT Bearer.
  - **Almacenamiento de Imágenes**: Se utiliza Multer para el guardado de imágenes en un servidor local.
  - **Base de Datos**: MongoDB online en un cluster gratuito.
- **Frontend**: Vite y Chakra UI para la interfaz de usuario.

---

## 1. Clonar el Repositorio

Primero, necesitas clonar el repositorio desde GitHub a tu máquina local. Abre tu terminal y ejecuta:

```bash
git clone https://github.com/SanchezRene/Emprendedores-Ubb.git
```

Luego, navega al directorio del proyecto:

```bash
cd Emprendedores-Ubb
```

---

## 2. Instalar Dependencias

### Backend

Dirígete a la carpeta `/backend` y ejecuta:

```bash
npm install
```

Luego inicia el servidor backend:

```bash
npm start
```

### Frontend

Dirígete a la carpeta `/frontend` y ejecuta:

```bash
npm install
```

Inicia el servidor de desarrollo para el frontend:

```bash
npm run dev
```

---

## 3. Configurar Variables de Entorno

El proyecto utiliza variables de entorno definidas en un archivo `.env`. Estas deben ser solicitadas al administrador del proyecto por correo electrónico.

Agrega el archivo `.env` en las carpetas correspondientes del backend y frontend, asegurándote de incluir la configuración correcta para:

- **Backend**: Puerto del servidor, cadena de conexión de MongoDB, secreto JWT, entre otros.
- **Frontend**: Variables necesarias para la configuración del cliente.

---

## 4. Iniciar el Servidor Backend

Una vez configuradas las variables de entorno y las dependencias instaladas, ejecuta el siguiente comando dentro de `/backend`:

```bash
npm start
```

El servidor debería iniciarse y estar accesible en `http://localhost:3000` (o el puerto configurado en `.env`).

---

## 5. Iniciar el Servidor Frontend

Dentro de la carpeta `/frontend`, inicia el servidor de desarrollo:

```bash
npm run dev
```

Esto debería iniciar una instancia local del frontend, accesible desde tu navegador.

---

## 6. Rutas Principales del Backend

Las rutas del backend pueden revisarse en el archivo `index.routes.js`, ubicado dentro de `/backend/src/routes/`. Estas rutas son manejadas por el frontend desde el navegador.

---

## 7. Probar Localmente

Para probar el proyecto:

1. Inicia sesión utilizando una cuenta de usuario o de encargado de la UBB. Puedes realizar esto desde la interfaz del frontend.
2. Usa Postman o cualquier cliente HTTP para probar los endpoints del backend.
3. Asegúrate de que las funcionalidades de autenticación y autorización estén operativas, especialmente roles y permisos.

---

&#x20;9\. Verificación Final

Asegúrate de que todo esté funcionando correctamente:

- Verifica los logs para errores.
- Prueba las rutas importantes.
- Si algo falla, revisa el archivo `.env` y las dependencias.

---
