# Stage 1: Build
FROM node:17 AS build-image
WORKDIR /usr/src/app

# Copiar solo el package.json y package-lock.json primero para aprovechar la caché de Docker
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install --package-lock-only
RUN npm ci --only=development

RUN npm install -g prettier
RUN npm install -g typescript

RUN npm run prettier
RUN npx tsc --outDir /usr/src/app/dist

# Stage 2: Production
FROM node:17
WORKDIR /usr/src/app

# Copiar el package.json y el package-lock.json desde la etapa de construcción
COPY package*.json ./
RUN npm install --production

# Copiar los archivos generados desde la etapa de construcción
COPY --from=build-image /usr/src/app/dist ./dist

# Copiar el código fuente restante
COPY ./src ./src

# Exponer el puerto configurado
EXPOSE ${SERVER_PORT}

CMD [ "node", "dist/app.js" ]
