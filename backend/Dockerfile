FROM node:14 as build-deps

RUN apt-get update && apt-get install -y --no-install-recommends wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN apt-get update
RUN apt-get install -y --no-install-recommends wget
RUN apt-get install -y --no-install-recommends gnupg
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt-get install -y --no-install-recommends google-chrome-stable
RUN apt-get install -y --no-install-recommends fonts-ipafont-gothic
RUN apt-get install -y --no-install-recommends fonts-wqy-zenhei
RUN apt-get install -y --no-install-recommends fonts-thai-tlwg
RUN apt-get install -y --no-install-recommends fonts-kacst
RUN apt-get install -y --no-install-recommends fonts-freefont-ttf
RUN apt-get install -y --fix-missing --no-install-recommends libxss1
RUN rm -rf /var/lib/apt/lists/*

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV CHROME_BIN=google-chrome-stable

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD dockerize -wait tcp://${DB_HOST}:3306 \
  && npx sequelize db:migrate \
  && node dist/server.js