FROM node:6-slim

ADD . /code
WORKDIR /code
RUN apt-get update
RUN apt-get install -y libfontconfig1
#RUN npm install
RUN npm run test
RUN npm run dist
