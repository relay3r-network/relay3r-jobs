FROM node:12.19.0-alpine3.12

RUN apk update && apk upgrade && apk add bash

COPY . /relayer
WORKDIR /relayer
RUN npm i

ENTRYPOINT ["bash", "dockerentry"]