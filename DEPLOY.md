# Auto deploy workflow for Netlify

## Recommended setup

Use GitHub + Netlify continuous deployment.

### 1. Create a GitHub repo
Push the `language-learn-app/` folder to a GitHub repository.

### 2. Connect the repo in Netlify
In Netlify:
- Add new site
- Import an existing project
- Choose GitHub
- Select your repository

Use these settings:
- Base directory: `language-learn-app`
- Build command: leave empty
- Publish directory: `.`

### 3. Deploy flow
After that, every push to your selected branch automatically creates a new deploy.

## Optional branch workflow
- `main` = production
- feature branches = deploy previews

## Local structure expected by Netlify
- `index.html`
- `style.css`
- `app.js`
- `netlify.toml`

## Notes
This app is static, so no server runtime is needed.
