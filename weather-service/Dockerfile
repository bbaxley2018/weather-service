FROM node:18-alpine
COPY package.json .
COPY . .
RUN npm install
RUN npx tsc
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]