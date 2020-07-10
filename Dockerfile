FROM node:14-alpine

RUN addgroup -S service && \
  adduser application -S -G service

COPY ./release /home/application/dist
COPY package.json /home/application/package.json
COPY package-lock.json /home/application/package-lock.json
RUN cd /home/application && npm install --production

RUN chmod -R 775 /home/application
RUN chown -R application:service /home/application

USER application
WORKDIR /home/application

EXPOSE 3000

CMD node dist/index.js
