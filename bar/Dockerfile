FROM node:6.9.1

MAINTAINER dzhitomirsky

#switching to non-root node user, provided by node-container
RUN su node

#create app directory
RUN mkdir -p /bar

#make /bar work directory
WORKDIR /bar

#mount sources to bar
ADD . /bar

#set environment variables
ENV HOST 0.0.0.0
ENV NODE_ENV $NODE_ENV

#install dependencies
RUN npm install

CMD [ "npm", "start" ]
