From node:latest
LABEL Sandeepraj 2011sandeepraj@gmail.com

ENV NODE_ENV=production
ENV PORT=5000

COPY . /var/www

WORKDIR /var/www

RUN npm install

VOLUME ("/var/www")

EXPOSE 5000

ENTRYPOINT ["npm","build"]