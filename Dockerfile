FROM node:18.3.0-alpine3.15
FROM mcr.microsoft.com/playwright:focal

LABEL maintener="Youssef Lahssini"

WORKDIR /usr/src/app

COPY . .

RUN echo "🚀 You are building the Mini CRM image" && npm install -g pnpm
RUN pnpm install
RUN pnpm run build

RUN pnpm dlx playwright install

CMD ["pnpm", "run", "dev"]

