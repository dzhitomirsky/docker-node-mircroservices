FROM node:6.9.1

MAINTAINER dzhitomirsky

#switching to non-root node user, provided by node-container
RUN su node

#create app directory
RUN mkdir -p /foo

#make /foo work directory
WORKDIR /foo

#mount sources to foo
ADD . /foo

#set environment variables
ENV HOST 0.0.0.0
ENV NODE_ENV $NODE_ENV

#install dependencies
RUN npm install

CMD [ "npm", "start" ]
