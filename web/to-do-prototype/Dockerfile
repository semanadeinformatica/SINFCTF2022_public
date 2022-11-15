FROM node:17

WORKDIR /usr/app
EXPOSE 8087

RUN groupadd app
RUN useradd -m -g app app

COPY ./challenge/package.json ./challenge/package-lock.json ./
RUN npm install

COPY ./challenge .

USER app

CMD ["npm", "start"]
