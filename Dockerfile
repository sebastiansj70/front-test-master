FROM node:16 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=development

CMD ["npm", "start"]

