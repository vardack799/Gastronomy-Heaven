
# Gastronomy Heaven 🍽️

Bienvenidos a Gastronomy Heaven, tu destino digital para explorar una experiencia culinaria única. Este sitio web combina diseño moderno y navegación fluida para que descubras recetas exquisitas, explores menús inspiradores y te sumerjas en la magia de la gastronomía.

Características principales:

- Interfaz atractiva y responsiva, lista para adaptarse a cualquier dispositivo.

- Presentación visual de platos con estilo elegante.

- Navegación intuitiva para encontrar fácilmente tu próxima receta favorita.

- Ideal como base para blogs de comida, portafolios gastronómicos o proyectos de restaurante digital.

Gastronomy Heaven no es solo una web — es una experiencia. Cada clic es una invitación a saborear creatividad, diseño y pasión por la cocina. 🌟

## Como ejecutar localmente

En primera instancia hay que clonar tanto el front-end como el back-end

```bash
  git clone https://github.com/vardack799/Gastronomy-Heaven.git
  git clone https://github.com/SantiagoPard/gastronomy-back.git
```
ingresamos a la carpeta gastronomy-back
```bash
  cd gastronomy-back
```

Instala dependencias necesarias

```bash
  npm i
```

desde la misma carpeta se da inicio a al servidor de manera local

```bash
  Node index.js
```
Despues nos ubicamos en la carpeta Gastronomy-Heaven (frontend) y buscamos la variable API_BASE_URL, una vez se encuentra cambiamos el valor de https://gastronomy-back.vercel.app/api por http://localhost:3001/api para que funcione de forma local

Para acceder al sitio web desplegado debe ingresar a https://gastronomy-heaven.vercel.app/
