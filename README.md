# Angular Payment Order Management

Este proyecto es una aplicación desarrollada en Angular para gestionar órdenes de pago a través de una Web API que se conecta con dos proveedores externos de pago. La aplicación permite a los usuarios realizar, gestionar y monitorear órdenes de pago de manera eficiente.

## Funcionalidades principales

- **Creación de órdenes de pago**: Los usuarios pueden generar órdenes de pago con los detalles necesarios.
- **Gestión de órdenes**: Incluye la actualización del estado de las órdenes (Pendiente, Pagado, Cancelado, etc.).
- **Integración con Web API**: La aplicación utiliza una Web API que se encarga de procesar las órdenes y conectarse con proveedores externos de pago.
- **Soporte para múltiples proveedores**: Compatible con dos proveedores externos, permitiendo seleccionar el más adecuado según las necesidades del usuario.
- **Historial de transacciones**: Visualización de todas las órdenes de pago realizadas.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Angular CLI](https://angular.io/cli) (versión 12 o superior)
- Un editor de código, como [Visual Studio Code](https://code.visualstudio.com/)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd tu-repositorio
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

1. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

2. Abre tu navegador y accede a:
   ```
   http://localhost:4200
   ```

3. Utiliza la interfaz para gestionar las órdenes de pago.

## Configuración de la Web API

Asegúrate de tener acceso a la Web API que se conecta con los proveedores externos de pago. Configura la URL base de la API en el archivo `environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:9001/api'
};
```

## Scripts disponibles

- `ng serve`: Inicia el servidor de desarrollo.
- `ng build`: Genera una versión optimizada para producción.
- `ng test`: Ejecuta las pruebas unitarias.
- `ng lint`: Analiza el código para detectar errores de estilo y calidad.



## Contribución

1. Haz un fork del repositorio.
2. Crea una rama con la funcionalidad que deseas agregar:
   ```bash
   git checkout -b nueva-funcionalidad
   ```
3. Realiza tus cambios y crea un commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Haz un push a tu rama:
   ```bash
   git push origin nueva-funcionalidad
   ```
5. Crea un Pull Request.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---

¡Gracias por contribuir y ser parte del desarrollo de esta aplicación!

