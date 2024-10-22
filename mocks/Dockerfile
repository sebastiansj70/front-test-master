FROM node:16 AS build
WORKDIR /app

COPY ../package.json ../package-lock.json ./

RUN npm install

COPY . .
COPY mocks.config.js ./

EXPOSE 3100
ENV NODE_ENV=development

CMD ["npm", "run", "mocks"]
