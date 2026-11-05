# CRIMEATHON – Investigation & Innovation Hub

A cybersecurity crime investigation and hackathon preparation platform built for collegiate engineering teams and student investigators.

![CRIMEATHON Hub Header](src/assets/images/hero_crimeathon_cyber_1793903156905.jpg)

## 📌 Project Overview
The platform equips student participants with real-world crime problem statements, hands-on forensic case simulations, an interactive 100+ technical question bank, a timed mock test examination engine, and hackathon judge viva defense preparation.

### 🌟 Core Modules
1. **10 Challenge Problem Statements**:
   - AI-Based Crime Prediction and Detection
   - Cybercrime Detection and Prevention
   - Digital Evidence Collection and Analysis
   - Fake Social Media Account Detection
   - Online Financial Fraud Detection
   - Deepfake and Manipulated Media Detection
   - CCTV-Based Suspicious Activity Detection
   - OSINT-Based Investigation System
   - Missing Person Identification Assistance
   - AI-Powered Crime Investigation Assistant
2. **Interactive Question Bank**:
   - 100 vetted technical questions across 10 specialized domains.
   - Practice mode (interactive attempts) and Study mode (instant explanation reveal).
   - Bookmark system with search and difficulty filters.
3. **Timed Mock Test System**:
   - 10, 20, and 30-question modes with countdown timer (15, 30, and 45 minutes).
   - Interactive question palette (answered, flagged, unanswered, current).
   - Score calculation, category accuracy breakdown, and detailed forensic review.
4. **10 Forensic Case Studies**:
   - Simulated incident dossiers with authentic evidence artifacts (network logs, memory dumps, NTFS MFT attributes, transaction graphs).
   - Clue hints, questions to solve, step-by-step SOP workflows, and legal conclusions.
5. **Judge Defense & Viva Preparation**:
   - Answers to standard judge questions (architecture, accuracy, false positives, data security, limitations, and future roadmap).
   - Interactive Viva Flashcards mode and evaluation rubrics.
6. **Participant Dashboard**:
   - LocalStorage-backed progress ledger tracking test attempts, prepared tracks, solved cases, and editable pitch notes with Markdown export.
7. **Offline-First & Privacy Preserving**:
   - 100% client-side execution in the browser. Zero paid APIs, zero tracking telemetry, and zero backend required.

---

## 🛠️ Technology Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Cyber Dark Theme
- **Icons**: Lucide Icons
- **Animation & Effects**: Canvas Confetti + Glassmorphism surfaces
- **Persistence**: Browser `localStorage`

---

## 🚀 Local Development Setup

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed.

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/crimeathon-hub.git
cd crimeathon-hub
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 4. Build for Production
```bash
npm run build
```
This generates an optimized static bundle in the `dist/` directory.

---

## 🌐 Deploying to GitHub Pages

This project is fully static and client-side, making it ideal for free hosting via **GitHub Pages**.

### Method 1: Automated Deployment via GitHub Actions (Recommended)
1. Push your code to your GitHub repository.
2. In your repository on GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. GitHub provides a default **Static HTML / Vite** workflow, or you can create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

> **Note on Vite base path**: If hosting under a project repository URL (e.g., `https://<username>.github.io/<repo-name>/`), ensure `base: './'` is set in `vite.config.ts`.

---

## ⚖️ Ethical & Educational Notice
All case studies, logs, and problem statements are fictional simulations designed strictly for collegiate hackathons, academic learning, and authorized forensic training. Always obtain written authorization before conducting technical audits or penetration tests on real-world systems.
