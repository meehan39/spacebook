FROM node:12
WORKDIR /usr/src/auth
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8001
CMD ["npm", "run", "dev"]