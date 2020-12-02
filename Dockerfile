FROM node:12.18.1
 
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
 
COPY package.json package.json

 
RUN npm install
RUN npm install -g @angular/cli

RUN tr -d '\r'  < /app/node_modules/.bin/ng   > /app/temp-ng
RUN mv /app/temp-ng /app/node_modules/.bin/ng
 
COPY . /app

#CMD [ "npm", "run start" ]
CMD /app/node_modules/.bin/ng serve --host 0.0.0.0 --watch
