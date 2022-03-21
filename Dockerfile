FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . ./



RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


RUN npm run build
EXPOSE 5000
CMD [ "node", "dist/index.js" ]
