## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## TO SEED THE DATA FOR ALL SCHEMA JUST RUN THIS CMD

npx prisma db seed

seed config in ppackage.json
"prisma": {
"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/seed.ts",
or
"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/seed-lama.ts"
}

# TO RUN WEBHOOK SERVER

# DOWNLOAD ngrok from this url https://dashboard.ngrok.com/get-started/setup/windows

ngrok http http://localhost:4000
