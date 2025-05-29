# Sistema de Validación de Usuarios

Un sistema web desarrollado en Angular con Server-Side Rendering (SSR) para validar usuarios por cédula y permitir el registro de nuevos usuarios con integración a WhatsApp.

## 🚀 Características

- **Validación de usuarios** por número de cédula (6-10 dígitos)
- **Registro de nuevos usuarios** con formulario completo
- **Subida de imágenes** con vista previa
- **Integración con WhatsApp** para continuar procesos
- **Server-Side Rendering (SSR)** para mejor SEO y performance
- **API REST** integrada para consulta y registro de usuarios
- **Validación de formularios** en tiempo real
- **Interfaz responsive** y user-friendly

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 18+** - Framework principal
- **Angular SSR** - Server-Side Rendering
- **TypeScript** - Lenguaje de desarrollo
- **Reactive Forms** - Manejo de formularios
- **CSS3** - Estilos y responsive design

### Backend/API
- **Node.js** con Express - Servidor
- **API REST** externa para datos de usuarios
- **Fetch API** - Cliente HTTP

### Herramientas de Desarrollo
- **Angular CLI** - Herramientas de desarrollo
- **npm** - Gestor de paquetes

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── search-form/          # Componente de búsqueda
│   │   └── register-form/        # Componente de registro
│   ├── services/
│   │   └── api.service.ts        # Servicio para API calls
│   ├── app.component.*           # Componente principal
│   ├── app.config.*              # Configuración de la app
│   └── app.routes.*              # Configuración de rutas
├── main.ts                       # Bootstrap de la aplicación
├── main.server.ts               # Bootstrap del servidor SSR
└── server.ts                    # Servidor Express
```

## 🚦 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Angular CLI (`npm install -g @angular/cli`)

### Instalación

1. **Clonar el repositorio**
```bash
git clone [url-del-repositorio]
cd validacion-usuarios
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env (opcional)
PORT=4000
API_BASE_URL=http://localhost:3001/api/dinamic-db/report/119
```

4. **Construir la aplicación**
```bash
npm run build
```

5. **Ejecutar en modo desarrollo**
```bash
npm run dev:ssr
```

6. **Ejecutar en producción**
```bash
npm run serve:ssr
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev:ssr          # Servidor de desarrollo con SSR
npm run build            # Construir para producción
npm run serve:ssr        # Servir build de producción

# Testing
npm run test             # Ejecutar tests unitarios
npm run e2e              # Ejecutar tests end-to-end

# Linting
npm run lint             # Verificar código con ESLint
```

## 🌐 API Integration

### Endpoint de Consulta
```
GET /api/dinamic-db/report/119/{cedula}
```

### Endpoint de Registro
```
POST /api/dinamic-db/report/119
Content-Type: application/json

{
  "cedula": "string",
  "nombre": "string",
  "telefono": "string",
  "ciudad": "string",
  "foto": "base64_string"
}
```

## 📱 Funcionalidades

### 1. Validación de Usuario
- Ingreso de cédula (6-10 dígitos)
- Validación en tiempo real
- Consulta a API externa
- Manejo de estados de carga

### 2. Registro de Usuario
- Formulario completo con validación
- Upload de imagen con preview
- Selección de ciudad (incluye "Otro")
- Conversión de imagen a Base64

### 3. Integración WhatsApp
- Generación automática de mensajes
- Apertura en nueva pestaña
- Diferentes templates según el caso

## 🔒 Consideraciones de Seguridad

### Validación de Datos
- Validación en frontend con Reactive Forms
- Sanitización de inputs
- Validación de tipos de archivo
- Límite de tamaño de imágenes (5MB)

### API Security
- Headers CORS configurados
- Manejo de errores sin exposición de datos
- Validación de respuestas JSON

### Recomendaciones Adicionales
- Implementar autenticación JWT
- Validar datos en backend
- Encriptar datos sensibles
- Implementar rate limiting
- Logs de seguridad

## 🚨 Troubleshooting

### Problemas Comunes

1. **Error de CORS**
```bash
# Verificar configuración del servidor API
# Asegurar headers CORS correctos
```

2. **Error de SSR**
```bash
# Verificar imports de módulos browser-specific
# Usar isPlatformBrowser para código del navegador
```

3. **Error de Build**
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📈 Performance

### Optimizaciones Implementadas
- **Server-Side Rendering** para carga inicial rápida
- **Lazy Loading** de componentes
- **OnPush Change Detection** strategy
- **Tree Shaking** en build de producción
- **Compresión de imágenes** en cliente

### Métricas Objetivo
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3s

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autor

- **Desarrollador Principal** - [Tu Nombre]

## 📞 Soporte

Para soporte técnico:
- Email: soporte@empresa.com
- WhatsApp: +57 300 123 4567
- Documentación: [Link a documentación]

---

## 🔄 Changelog

### v1.0.0 (2025-05-29)
- ✅ Implementación inicial del sistema
- ✅ Validación de usuarios por cédula
- ✅ Formulario de registro completo
- ✅ Integración con WhatsApp
- ✅ Server-Side Rendering
- ✅ Upload de imágenes con preview
