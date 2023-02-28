FROM node:lts as build
LABEL maintener="Youssef Lahssini"

WORKDIR /usr/src/site

COPY . .

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

RUN echo "📦 Node: " && node -v
RUN echo "📦 NPM: " && npm -v

RUN echo "🚀 You are building the DX Blog image" && npm install -g pnpm

RUN echo "📦 PNPM: " && pnpm -v

RUN pnpm install
RUN pnpm run build
