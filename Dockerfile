FROM node

MAINTAINER Hquestion

RUN mkdir -p /home/Service

WORKDIR /home/Service

copy . /home/Service

RUN npm install

RUN npm run tsc

RUN npx sequelize db:migrate

EXPOSE 7001

CMD [ "npm", "start" ]

