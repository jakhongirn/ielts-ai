FROM node:16-alpine

WORKDIR /ielts=plaform/frontend/

COPY package*.json /ielts-platform/frontend/
RUN npm install

COPY . /ielts-platform/frontend/

CMD ["npm", "start"]