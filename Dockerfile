FROM node:18

WORKDIR back/

COPY package* .

RUN npm i

RUN npx prisma generate

COPY . .

CMD ["node","index.js"]