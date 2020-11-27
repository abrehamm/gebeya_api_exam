FROM Node:12
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.js ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]