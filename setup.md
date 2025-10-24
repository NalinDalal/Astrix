run docker compose up

for db:
╰─❯ docker run --name plinko \
 -e POSTGRES_PASSWORD=plinko \
 -e POSTGRES_USER=plinko \
 -e POSTGRES_DB=plinko \
 -p 5433:5432 \
 -d postgres:15

put up a .env file in /packages/prisma then run migrations
bunx prisma migrate dev
bun run seed.ts #to seed with dummy data
