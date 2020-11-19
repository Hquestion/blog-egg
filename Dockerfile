FROM node

MAINTAINER Hquestion

RUN mkdir -p /home/Service

WORKDIR /home/Service

COPY package.json /home/Service
COPY yarn.lock /home/Service

RUN yarn

COPY . /home/Service

RUN npm run tsc

RUN npx sequelize db:migrate --env=production

EXPOSE 7001

CMD [ "npm", "run", "start:docker" ]

