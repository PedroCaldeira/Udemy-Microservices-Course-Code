# Use Node v16.x due to incompatibility with react and webpack in virtualized environment
FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "start"]
