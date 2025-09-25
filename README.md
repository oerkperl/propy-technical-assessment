# 📝 Task Manager - React TypeScript Application

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. Features complete CRUD operations, form validation, search/sort functionality, and localStorage persistence.

## ✨ Features

### 📋 Task Management

- **Create Tasks** - Add new tasks with title, description, priority, and due date
- **Edit Tasks** - Modify existing tasks with pre-populated form data
- **Delete Tasks** - Remove tasks with smooth animations
- **Toggle Completion** - Mark tasks as complete/incomplete with visual feedback
- **Priority Levels** - High (🔴), Medium (🟡), Low (🟢) with color coding

### 🔍 Advanced Features

- **Real-time Search** - Filter tasks by title, description, or priority
- **Smart Sorting** - Sort by creation date, priority level, or due date
- **Due Date Intelligence** - Shows "Due today", "Overdue by X days", etc.
- **localStorage Persistence** - Tasks automatically save and restore
- **Responsive Design** - Works seamlessly on mobile and desktop

### 🎨 User Experience

- **Smooth Animations** - Loading states, transitions, and micro-interactions
- **Form Validation** - Real-time validation with helpful error messages
- **Empty States** - Helpful guidance when no tasks exist
- **Character Counters** - Live feedback for title (100) and description (500) limits
- **Accessibility** - Proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized builds
- **Styling:** Tailwind CSS with utility-first approach
- **UI Components:** shadcn/ui component library (built on Radix UI)
- **Icons:** Lucide React for consistent iconography
- **State Management:** React hooks (useState, useEffect)
- **Data Persistence:** Browser localStorage with error handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/oerkperl/propy-technical-assessment.git
   cd propy-technical-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── TaskCard.tsx      # Individual task display component
│   ├── TaskForm.tsx      # Task creation/editing form
│   └── ui/              # shadcn/ui component library
├── types/
│   └── Task.ts          # TypeScript interfaces and types
├── hooks/
│   └── useTimer.ts      # Custom timer hook (legacy)
├── pages/
│   ├── Index.tsx        # Main application page
│   └── NotFound.tsx     # 404 error page
├── lib/
│   └── utils.ts         # Utility functions
└── main.tsx            # Application entry point
```

## 🎯 Key Components

### TaskCard Component

Displays individual tasks with:

- Completion checkbox with accessibility
- Priority badge with color coding
- Due date with intelligent formatting
- Edit/delete buttons with hover effects
- Responsive layout for mobile/desktop

### TaskForm Component

Handles task creation and editing:

- Form validation with real-time feedback
- Character limits with live counters
- Date picker with past-date prevention
- Error states with helpful messages
- Controlled components for reliable state

### State Management

Centralized in `Index.tsx`:

- CRUD operations with TypeScript safety
- localStorage integration with error handling
- Search and sort functionality
- Loading states and error boundaries

## 🔧 Configuration

### Tailwind CSS

Custom configuration in `tailwind.config.ts`:

- Custom color palette
- Animation utilities
- Responsive breakpoints
- Component-specific styles

### TypeScript

Strict configuration for type safety:

- Interface definitions for all data structures
- Proper typing for component props
- Error handling with typed catch blocks

## 🎨 Design System

### Colors

- **Primary:** Blue tones for main actions
- **High Priority:** Red (#ef4444)
- **Medium Priority:** Yellow (#eab308)
- **Low Priority:** Green (#22c55e)
- **Muted:** Gray tones for secondary text

### Typography

- **Headings:** Font weights 600-700
- **Body:** Font weight 400-500
- **Labels:** Font weight 500-600

### Spacing

- **Consistent:** 4px base unit (0.25rem)
- **Component Padding:** 16px-24px
- **Element Gaps:** 8px-16px

## 🧪 Code Quality

### Best Practices

- **Component Composition** - Reusable, single-responsibility components
- **TypeScript Interfaces** - Proper typing for all data structures
- **Error Handling** - Graceful handling of localStorage and form errors
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation
- **Performance** - Efficient re-renders and state updates

### Patterns Used

- **Controlled Components** for form inputs
- **Custom Hooks** for reusable logic
- **Compound Components** for complex UI elements
- **Props Drilling** prevention with proper state management

## 🚀 Deployment

This application can be deployed to:

- **Vercel** (recommended for Vite apps)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

Build command: `npm run build`
Output directory: `dist/`

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with ES2020 support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - For the excellent component library
- **Tailwind CSS** - For utility-first styling
- **Lucide** - For beautiful icons
- **Vite** - For fast development experience

---

**Built with ❤️ for the Propy Technical Assessment**
