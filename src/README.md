# Fire Officer Building Construction Quiz

An interactive quiz application designed to help fire officers assess their knowledge of building construction types.

## Features

- 5 construction types (Type I through Type V)
- Educational feedback after each answer
- Score tracking throughout the quiz
- Performance summary at completion
- Modern, responsive design
- Reset functionality

## Deployment to GitHub Pages

### Initial Setup

1. Create a new repository on GitHub
2. Initialize git in your project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```

### Deploy

1. Install dependencies:
   ```bash
   npm install
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under "Source", select the `gh-pages` branch
   - Click **Save**

Your quiz will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Local Development

Run the development server:
```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Motion (Framer Motion)
- Lucide React (icons)
