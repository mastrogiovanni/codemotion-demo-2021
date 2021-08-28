FROM node:14.15.4 As development

WORKDIR /app

COPY *.json /app/
RUN npm install

COPY src /app/src
RUN npm run build

CMD ["npm", "run", "start:prod"]
