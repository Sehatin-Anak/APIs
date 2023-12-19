FROM node:18

WORKDIR app/

COPY package* .

RUN npm i

RUN npx prisma generate

COPY . .

CMD ["node","index.js"]