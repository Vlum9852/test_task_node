FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}
ENV DB_HOST=localhost \
    DB_PORT=5432 \
    DB_USER=postgres \
    DB_PASSWORD=postgres \
    DB_NAME=test_task_node \
    JWT_SECRET=your_jwt_secret
CMD ["npm", "start"] 