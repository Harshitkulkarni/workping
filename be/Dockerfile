FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy .env
COPY .env .env

EXPOSE 7777

CMD ["npm", "start"]
