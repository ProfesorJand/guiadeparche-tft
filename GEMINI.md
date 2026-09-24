# Reglas del Proyecto

## 1. Estilos y CSS
- Todos los componentes de React deben usar **CSS Modules** (`.module.css`) para sus estilos. Evita usar estilos globales o en línea para componentes específicos.
- Si un componente `.jsx` necesita estilos y aún no tiene su archivo correspondiente, debes crear una carpeta `./css/` en ese mismo directorio y colocar ahí el archivo (ej. `./css/MiComponente.module.css`).

## 2. Declaración de Componentes
- Todos los componentes de React deben declararse utilizando **`const` y Arrow Functions**.
  - Correcto: `const MiComponente = () => {}`
  - Incorrecto: `function MiComponente() {}`

## 3. Idioma
- El idioma principal para los comentarios, explicaciones y documentación en el código es el **Español**.

## 4. Importaciones y Alias
- Para las importaciones, utiliza siempre los alias configurados (ej. `@components/`, `@stores/`, `@utils/`) en lugar de rutas relativas largas como `../../`.

## 5. Convención de Nombres
- Los nombres de los archivos que contienen componentes de React deben estar en `PascalCase` (ej. `MiComponente.jsx`). Los archivos de utilidades o stores deben usar `camelCase` (ej. `dataTFT.js`).

## 6. Manejo del Estado Global
- El estado global de la aplicación se maneja exclusivamente con **Nanostores**. No sugieras ni utilices Redux o React Context. Usa `useStore()` para leer el estado en los componentes de React.

## 7. Exportación de Componentes
- Todos los componentes principales de React deben exportarse usando `export default` al final del archivo.

## 8. Diseño Responsivo y Móviles
- En los archivos `.module.css` o en las etiquetas `<style>` de Astro, incluye siempre el media query `@media only screen and (max-width: 900px) { ... }`.
- Prioriza y considera siempre el mejor estilado para dispositivos móviles, asegurando una buena experiencia de usuario en estas resoluciones.

## 9. Compatibilidad con iOS
- Evita usar propiedades de CSS o comportamientos que sean conocidos por causar problemas o incompatibilidades en navegadores de iOS (Safari). Por ejemplo, ten precaución con unidades como `100vh`, `background-attachment: fixed` u otras particularidades de iOS.
