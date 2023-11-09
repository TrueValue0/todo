# Etapa 1: Crear el build de React
FROM node:18.7.0 as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de npm
COPY package*.json ./

# Instalar las dependencias
RUN npm ci

# Copiar el código fuente de la aplicación
COPY . .

# Construir la aplicación de React
RUN npm run build

# Etapa 2: Crear el servidor NGINX
FROM nginx:latest

# Definir variables de entorno si es necesario
# ENV NOMBRE_VARIABLE="VALOR"

# Copiar los archivos de construcción de React al directorio de contenido de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar NGINX al arrancar el contenedor
CMD ["nginx", "-g", "daemon off;"]

