FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN npm run build --prod

EXPOSE 4200
ENTRYPOINT ["./entrypoint.sh"]