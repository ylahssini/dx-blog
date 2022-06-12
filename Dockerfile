FROM node:18.3.0-alpine3.15

LABEL maintener="Youssef Lahssini"

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN npm install -g pnpm@6.32.14
RUN pnpm install --force

COPY . .

CMD ["pnpm", "run", "dev"]
