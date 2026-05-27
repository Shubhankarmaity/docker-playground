FROM node

ENV MONGO_DB_USERNAME=delta_admin \
    MONGO_DB_PWD=admin123

RUN mkdir -p delta/nodeapp

COPY . /delta/nodeapp

RUN npm install

CMD ["node","/delta/nodeapp/server.js"]