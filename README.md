# YAAM ARINTHA AI
An interactive AI-powered historical learning experience that connects Mahakavi Bharathiyar's timeless ideas with modern technology and social challenges.

## Feature: Bharathi Timeline — Step Into Bharathiyar's Era

### Problem
Modern students often struggle to connect with historical figures, viewing them as distant figures from the past rather than dynamic visionaries whose ideas are highly relevant today.

### Solution
The **Bharathi Timeline** bridges this gap by offering an interactive, cinematic time-travel simulation. It's not a static list of dates, but a 4-stage immersive journey into Bharathiyar's world.

### Timeline Simulation
- **Time Arrival**: A cinematic blur-to-sharp transition scaling the year into focus ("ENTERING 1908...").
- **The Moment**: Exploring the historical atmosphere through stylized visuals, CSS particles, and typography.
- **The Vision**: Animated key concepts breaking down his revolutionary thought.
- **Modern Connection & AI Interpretation**: Directly linking Bharathiyar's legacy to a modern student challenge and showcasing an AI-driven possibility to solve it.

### Technology Used
- **Frontend Architecture**: React + Vite (Fast, offline-ready SPA).
- **Styling**: Pure CSS animations, dynamic gradients, SVG filters for grain/texture, and `lucide-react` icons. No heavy 3D libraries (Three.js) or external video files used to ensure high performance.
- **Gamification**: Built-in React Hook (`useTimelineProgress`) utilizing `localStorage` to save milestones and issue badges.
- **Backend-less**: Fully functional offline and without API dependencies, keeping the focus entirely on frontend UI/UX and storytelling.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:5174/` and click the "BHARATHI TIMELINE" navigation link.

## Deployment (Vercel / Netlify)

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. For platforms like Netlify, the standard `dist` folder is deployed. Ensure a `_redirects` file (or `netlify.toml`) is present to direct all traffic to `index.html` for React Router to function properly.
