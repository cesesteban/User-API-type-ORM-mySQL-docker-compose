# Stage 1: Build
FROM node:17 AS build-image
WORKDIR /usr/src/app

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

COPY package*.json ./
RUN npm install --production

COPY --from=build-image /usr/src/app/dist ./dist

# Copia el resto del código fuente a un subdirectorio para evitar conflictos
COPY . ./src

EXPOSE ${SERVER_PORT}

CMD [ "node", "dist/app.js" ]
