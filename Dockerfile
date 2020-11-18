FROM node

MAINTAINER Hquestion

RUN mkdir -p /home/Service

WORKDIR /home/Service

COPY package.json /home/Service

RUN npm install

COPY . /home/Service

RUN npm run tsc

RUN npx sequelize db:migrate --env=production

EXPOSE 7001

CMD [ "npm", "start:docker" ]

