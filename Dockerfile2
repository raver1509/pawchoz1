FROM alpine:latest as build

RUN apk update && apk upgrade && \
    apk add --no-cache --update nodejs npm

WORKDIR /usr/src/app

COPY package*.json ./
COPY server.js ./

RUN npm install

FROM alpine:latest

RUN apk update && apk upgrade && \
    apk add --no-cache --update nodejs npm

COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

LABEL org.opencontainers.image.authors="Norbert Kowalik"

EXPOSE 5000

HEALTHCHECK --interval=10s --timeout=1s \
  CMD curl -f http://localhost:5000 || exit 1

CMD ["npm", "start"]