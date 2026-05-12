---
pubDatetime: 2026-05-12T15:48:00Z
# modDatetime: 2026-05-12T00:34:00+06:00
title: Docker Cheat Sheet
postSlug: docker
featured: true
draft: false
description: A minimal quick-reference guide for containerizing MERN apps with Docker, Compose, and Nginx.
tags: [cheat-sheet]
---

## Basic Usage
### Running an image
```fish
docker run -it <image-name>
```
`-it` makes the shell interactive.
### Download, build an image, and start it with bash
```fish
docker run -p 5173:5173 -it --name hello-node node:24 bash
```
`-p` exposes the port to the host.

`bash` starts the container with bash.
### Building an image from a Dockerfile
```fish
docker build -t <image-name> -f <Dockerfile-name> .
```
`-f` file name option.
### List the containers
```fish
docker ps -a
```
`-a` lists all the containers.

### Stop the container
```fish
docker stop <container-name>
```

### Dockerfile example
```Dockerfile
FROM node:24
WORKDIR /usr/src/app
COPY . .
RUN npm ci --omit=dev
CMD [ "npm", "run", "dev", "--", "--host" ]
```

### Multi-stage Dockerfile example
```Dockerfile
FROM node:24 AS base
WORKDIR /usr/src/app
COPY . .
RUN npm ci

FROM base AS test-stage
RUN npm run test

FROM test-stage AS build-stage
RUN npm run build

FROM nginx:1.29-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
```

## Docker Compose

```fish
docker compose -f <compose.yml> up --build -d
```

`--build` rebuilds the images inside.

`-d` runs the compose in the background quietly.

```fish
docker compose -f <compose.yml> down
```

### Docker Compose example
```yml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - 5173:5173
    volumes:
      - ./frontend:/usr/src/app
    container_name: patientor-front

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - 3001:3001
    volumes:
      - ./backend:/usr/src/app
    container_name: patientor-back
	
  nginx:
    image: nginx
    volumes:
      - ./templates:/etc/nginx/templates
    ports:
      - "8080:80"
    environment:
      - NGINX_HOST=foobar.com
      - NGINX_PORT=80
```
`volumes` let us mount a file path from host to the container for hot-reloading during the development.

## Nginx Proxy configuration example
```nginx
events {}

http {
    server {
        listen 80;

        location / {
            proxy_pass http://frontend:80;
        }

        location /api {
            proxy_pass http://backend:3001/api;
        }
    }
}
```
`proxy_pass` recieves the http request and routes them to the correct internal Docker container based URL path.

## Architecture
```
└── my-app
    ├── frontend
    |    └── Dockerfile
    ├── backend
    |    └── Dockerfile
    ├── nginx.conf
    └── docker-compose.yml
```

## Real-World Application
I recently applied this exact architecture to containerize my [Patientor](https://github.com/moysush/patientor) application. It uses the multi-stage Dockerfiles and Nginx reverse proxy setup outlined above to manage both the local development environment and the optimized production build.
