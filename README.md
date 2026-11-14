Aplicación móvil de autenticación y gestión de fotografías

Ninrod Fredy Daniel Duarte Archila

la pagina funciona mediante el telefono ya que se utilizalara la galeria y camara
en la aplicacion se pedira permiso para usar la camara 
se podran elegir fotos de tu galeria 
eliminar la foto
o la opcion de tomar una foto dentro de la apliacion

Instrucciones para Instalar Dependencias y Ejecutar el Proyecto
git clone https://github.com/tu-usuario/ExamenFinalPro.git
cd ExamenFinalPro

npm install

const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY = 'tu-clave-publicable-anon';

npx expo start

Dependencias Principales Utilizadas
react-native: Entorno base para la construcción de componentes nativos móviles.

expo-router: Sistema de enrutamiento basado en archivos para la navegación y control de accesos entre pantallas.

@supabase/supabase-js: Cliente oficial de Supabase para la gestión de autenticación de usuarios por correo electrónico y contraseña.

@react-native-async-storage/async-storage: Almacenamiento local persistente requerido por Supabase para mantener la sesión activa al cerrar y reabrir la aplicación.

expo-image-picker: Librería nativa para la selección de fotografías desde la galería y la captura mediante la cámara del dispositivo con solicitud automática de permisos.

