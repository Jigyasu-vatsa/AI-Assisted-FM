# GitHub Pages Deployment Guide (Step-by-Step with Git Bash)

This guide provides the exact terminal commands to host **Zero Waste Food Management** on GitHub Pages for free using **Git Bash**.

---

## Prerequisites
- Node.js (v18 or higher recommended)
- Git installed on your computer (with **Git Bash**)
- A free GitHub account ([github.com](https://github.com))

---

## Step 1: Download & Extract the ZIP File
1. In Google AI Studio Build, locate the top-right header and click **Download / Export ZIP**.
2. Save the ZIP file to your computer (e.g. `Downloads` or `Desktop`).
3. Right-click the ZIP file and select **Extract All...** (e.g., to a folder named `zero-waste-food-management`).

---

## Step 2: Open Git Bash in the Project Folder
1. Open the extracted folder `zero-waste-food-management`.
2. Right-click inside the blank space of the folder and select **Open Git Bash here** (or open Git Bash and `cd` into the folder).

---

## Step 3: Install Dependencies & Build
Run these commands in Git Bash:

```bash
# 1. Install all required dependencies
npm install

# 2. Build the production static distribution bundle (creates the 'dist' folder)
npm run build
```

*Note: The project is already configured in `vite.config.ts` with `base: './'`, ensuring all scripts and styles load with relative paths on GitHub Pages.*

---

## Step 4: Initialize Git Repository
Run the following commands in Git Bash:

```bash
# Initialize a local Git repository
git init

# Stage all files
git add .

# Create the initial commit
git commit -m "feat: initial release of Zero Waste Food Management by Jigyasu Vatsa"

# Set branch to main
git branch -M main
```

---

## Step 5: Create a New Repository on GitHub
1. Open your browser and log into [github.com](https://github.com).
2. Click the **+** (plus icon) in the top-right corner and select **New repository**.
3. Choose a Repository name (e.g. `zero-waste-food-management` or `food-redistribution`).
4. Keep it **Public** (required for free GitHub Pages).
5. **Do NOT** check "Add a README file", ".gitignore", or "license" (we already have them).
6. Click **Create repository**.
7. Copy your repository's HTTPS URL (e.g. `https://github.com/YOUR_USERNAME/zero-waste-food-management.git`).

---

## Step 6: Link Remote & Push Source Code
Back in **Git Bash**, paste your copied URL:

```bash
# Link your local folder to GitHub (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/zero-waste-food-management.git

# Push your code to GitHub
git push -u origin main
```

---

## Step 7: Deploy to GitHub Pages (2 Simple Methods)

### Method A: Direct Command Line (Fastest & Recommended)
You can deploy the pre-built `dist` directory directly to GitHub Pages in one command:

```bash
# Deploy dist folder to the gh-pages branch
npx gh-pages -d dist
```

*When prompted by Git Bash, authorize your GitHub credentials.*

### Method B: GitHub Repository Settings
1. Go to your repository on GitHub.
2. Click **Settings** (top tabs) -> **Pages** (in left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `gh-pages` and folder `/ (root)`.
   - Click **Save**.

---

## Step 8: View Your Live Web Application
Within 1–2 minutes, GitHub will publish your site at:
```
https://YOUR_USERNAME.github.io/zero-waste-food-management/
```
Your live app is now publicly accessible, running client-side with full interactive dashboards, radar canvas, legal documentation, citations, and institutional baseline proof!
