FROM node:18

WORKDIR app/

COPY package* .

RUN npm i


COPY . .
RUN npx prisma generate
CMD ["node","index.js"]