IndexNow — configuración
=========================

IndexNow notifica a Bing, Yandex y otros buscadores cuando el sitio cambia,
para que reindexen más rápido.

Pasos:

1. Genera una clave aleatoria de 32+ caracteres hexadecimales (a-f, 0-9).
   Ejemplo (NO uses esta, genera la tuya):
   a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4

2. Crea en esta carpeta `public/` un archivo con ese nombre y extensión .txt,
   cuyo contenido sea exactamente la misma clave. Por ejemplo:
   public/a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4.txt
   (contenido del archivo: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4)

3. Configura la variable de entorno INDEXNOW_KEY con la misma clave en Vercel
   y en tu .env.local.

4. Tras un deploy con contenido nuevo, dispara la notificación:

   curl -X POST https://www.darwinontiveros.com/api/indexnow \
     -H "x-indexnow-key: TU_CLAVE"

   El endpoint enviará todas las URLs (ES + EN) a IndexNow.

Nota: el archivo .txt de la clave debe existir para que IndexNow verifique la
propiedad del dominio; si no, rechazará el envío.
