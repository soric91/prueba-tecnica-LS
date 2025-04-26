# Usa la imagen oficial de Node.js
FROM node:18-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

ENV BROWSER=none
# Expone el puerto que usa la aplicación (ajusta según tu configuración)
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]