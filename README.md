This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This project is configured for automatic deployment to Vercel with CI/CD pipeline.

### Initial Setup

1. **Push to GitHub**
   ```bash
   gh repo create product-app --public --source=. --remote=origin
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js settings
   - Click "Deploy"

3. **Configure GitHub Actions (Optional for CI/CD)**

   If you want to use GitHub Actions for automated deployments:

   a. Get your Vercel credentials:
   ```bash
   npm i -g vercel
   vercel login
   vercel link  # Link to your project
   ```

   b. Add secrets to your GitHub repository (Settings > Secrets and variables > Actions):
   - `VERCEL_TOKEN`: Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID`: Found in `.vercel/project.json` after running `vercel link`
   - `VERCEL_PROJECT_ID`: Found in `.vercel/project.json` after running `vercel link`

### Deployment Workflow

Once configured, deployments happen automatically:

- **Pull Requests**: Automatic preview deployments
- **Main Branch**: Automatic production deployments
- **Manual**: Run `vercel --prod` locally

### Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your environment variables
3. Add the same variables in Vercel Dashboard (Settings > Environment Variables)

### Project Structure

```
product-app/
├── app/                 # Next.js App Router pages
├── public/             # Static assets
├── .github/
│   └── workflows/
│       └── ci.yml      # CI/CD pipeline
├── vercel.json         # Vercel configuration
└── .env.local.example  # Environment variables template
```

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
