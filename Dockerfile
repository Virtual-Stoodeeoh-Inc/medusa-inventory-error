FROM node:latest

WORKDIR /app/medusa

COPY . .

RUN apt-get update && apt-get install -y python3 python3-pip python-is-python3

RUN corepack enable && corepack prepare yarn@4.6.0 --activate

RUN npm install -g @medusajs/medusa-cli

RUN yarn

RUN yarn build

EXPOSE 9000

CMD medusa db:migrate && yarn start
