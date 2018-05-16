FROM node:9.11.1-alpine
MAINTAINER maretekent@gmail.com

EXPOSE 8080

WORKDIR /app

ADD yarn.lock package.json webpack.config.js .babelrc ./
ADD src ./src

RUN npm install -g -s --no-progress yarn
RUN yarn install --pure-lockfile

CMD ["yarn", "start"]