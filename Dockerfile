FROM node:carbon
# Getting a current docker image to run of off which is just node

# Create app directory
WORKDIR /server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Copies the file directories into the docker image
COPY . .

EXPOSE 8080 8085

CMD [ "npm", "start" ]