# Student Portfolio

A simple and clean portfolio website built with React and Tailwind CSS.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"

Alternatively, you can use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Customization

### Adding Projects

Edit `src/pages/Projects.jsx` and add your projects to the `projects` array:

```javascript
const projects = [
  {
    title: "My Awesome Project",
    description: "A brief description of what this project does.",
    tags: ["React", "Tailwind CSS"],
    link: "https://github.com/yourusername/project"
  },
  // Add more projects...
]
```

### Updating About Page

Edit `src/pages/About.jsx` to customize your bio and tags.

### Customizing Colors

The main accent color is pink. To change it, search for `pink-` in the project files and replace with your preferred color (e.g., `blue-`, `purple-`, `green-`).

## Project Structure

```
├── src/
│   ├── components/
│   │   └── Navigation.jsx    # Navigation bar
│   ├── pages/
│   │   ├── Home.jsx          # Home page
│   │   ├── About.jsx         # About page
│   │   ├── Projects.jsx      # Projects page
│   │   └── Contact.jsx       # Contact page
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
└── package.json
```

## Technologies Used

- React 18
- React Router
- Tailwind CSS
- Vite

