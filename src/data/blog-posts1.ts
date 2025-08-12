/* eslint-disable no-useless-escape */
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  body: string;
  headings: { id: string; text: string; level: number }[];
}

export const blogCategories = [
  {
    id: "getting-started",
    title: "Active Directory",
    posts: ["introduction", "quick-start", "installation"]
  },
  {
    id: "tutorials",
    title: "Azure Entra",
    posts: ["first-app", "advanced-concepts", "best-practices"]
  },
  {
    id: "api-reference",
    title: "Powershell",
    posts: ["authentication", "endpoints", "webhooks"]
  },
 {
    id: "tutorials",
    title: "Group Policy",
    posts: ["authentication", "endpoints", "webhooks"]
  }
];

export const blogPosts: Record<string, BlogPost> = {
  introduction: {
    id: "introduction",
    title: "Introduction",
    category: "getting-started",
    body: `
# Introduction to Our Platform

Welcome to our comprehensive documentation. This guide will help you understand the fundamentals of our platform and get you started quickly.

## What is Our Platform?

Our platform is a modern solution designed to help developers build amazing applications with ease. It provides a comprehensive set of tools and APIs that streamline the development process.

### Key Features

- **Fast Development**: Get up and running in minutes
- **Scalable Architecture**: Built to handle applications of any size
- **Developer Friendly**: Intuitive APIs and excellent documentation
- **Secure by Default**: Security best practices built-in

## Active Directory

To begin your journey with our platform, you'll need to:

1. Create an account
2. Set up your development environment
3. Follow our quick start guide

### Prerequisites

Before you start, make sure you have:

- Node.js 18 or later
- A modern web browser
- Basic knowledge of JavaScript/TypeScript

## Next Steps

Ready to dive in? Check out our [Quick Start Guide](/quick-start) to build your first application.
    `,
    headings: [
      { id: "what-is-our-platform", text: "What is Our Platform?", level: 2 },
      { id: "key-features", text: "Key Features", level: 3 },
      { id: "getting-started", text: "Active Directory", level: 2 },
      { id: "prerequisites", text: "Prerequisites", level: 3 },
      { id: "next-steps", text: "Next Steps", level: 2 }
    ]
  },


  "quick-start": {
    id: "quick-start",
    title: "Quick Start Guide",
    category: "getting-started",
    body: `
# Quick Start Guide

Get up and running with our platform in under 5 minutes.

## Step 1: Installation

First, install our CLI tool:

\`\`\`bash
npm install -g @ourplatform/cli
\`\`\`

## Step 2: Create Your First Project

Use the CLI to create a new project:

\`\`\`bash
ourplatform create my-app
cd my-app
\`\`\`

## Step 3: Configure Your Environment

Create a \`.env\` file in your project root:

\`\`\`env
API_KEY=your_api_key_here
PROJECT_ID=your_project_id
\`\`\`

## Step 4: Start Development Server

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Your application will be available at \`http://localhost:3000\`.

## Step 5: Deploy Your Application

When you're ready to deploy:

\`\`\`bash
ourplatform deploy
\`\`\`

## Troubleshooting

### Common Issues

**Port already in use**: Try running on a different port with \`npm run dev -- --port 3001\`

**API key not working**: Make sure your API key is valid and has the correct permissions

## What's Next?

Now that you have a working application, explore our tutorials to learn more advanced concepts.
    `,
    headings: [
      { id: "step-1-installation", text: "Step 1: Installation", level: 2 },
      { id: "step-2-create-your-first-project", text: "Step 2: Create Your First Project", level: 2 },
      { id: "step-3-configure-your-environment", text: "Step 3: Configure Your Environment", level: 2 },
      { id: "step-4-start-development-server", text: "Step 4: Start Development Server", level: 2 },
      { id: "step-5-deploy-your-application", text: "Step 5: Deploy Your Application", level: 2 },
      { id: "troubleshooting", text: "Troubleshooting", level: 2 },
      { id: "common-issues", text: "Common Issues", level: 3 },
      { id: "whats-next", text: "What's Next?", level: 2 }
    ]
  },


  installation: {
    id: "installation",
    title: "Installation Guide",
    category: "getting-started",
    body: `
# Installation Guide

Detailed installation instructions for different environments and platforms.

## System Requirements

### Minimum Requirements

- **OS**: Windows 10, macOS 10.15, or Linux (Ubuntu 18.04+)
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 2GB free space
- **Network**: Internet connection required

### Software Dependencies

- Node.js 18.0.0 or later
- npm 8.0.0 or later (comes with Node.js)
- Git 2.20.0 or later

## Platform-Specific Installation

### Windows

1. Download Node.js from [nodejs.org](https://nodejs.org)
2. Run the installer and follow the setup wizard
3. Open Command Prompt or PowerShell
4. Verify installation:

\`\`\`cmd
node --version
npm --version
\`\`\`

### macOS

Using Homebrew (recommended):

\`\`\`bash
brew install node
\`\`\`

Or download from [nodejs.org](https://nodejs.org).

### Linux

Ubuntu/Debian:

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
\`\`\`

## Installing Our Platform

Once you have Node.js installed:

\`\`\`bash
npm install -g @ourplatform/cli
\`\`\`

### Verify Installation

\`\`\`bash
ourplatform --version
\`\`\`

## Alternative Installation Methods

### Using Yarn

\`\`\`bash
yarn global add @ourplatform/cli
\`\`\`

### Using Docker

\`\`\`bash
docker pull ourplatform/cli:latest
\`\`\`

## Configuration

After installation, configure your environment:

\`\`\`bash
ourplatform init
\`\`\`

This will guide you through the initial setup process.
    `,
    headings: [
      { id: "system-requirements", text: "System Requirements", level: 2 },
      { id: "minimum-requirements", text: "Minimum Requirements", level: 3 },
      { id: "software-dependencies", text: "Software Dependencies", level: 3 },
      { id: "platform-specific-installation", text: "Platform-Specific Installation", level: 2 },
      { id: "windows", text: "Windows", level: 3 },
      { id: "macos", text: "macOS", level: 3 },
      { id: "linux", text: "Linux", level: 3 },
      { id: "installing-our-platform", text: "Installing Our Platform", level: 2 },
      { id: "verify-installation", text: "Verify Installation", level: 3 },
      { id: "alternative-installation-methods", text: "Alternative Installation Methods", level: 2 },
      { id: "using-yarn", text: "Using Yarn", level: 3 },
      { id: "using-docker", text: "Using Docker", level: 3 },
      { id: "configuration", text: "Configuration", level: 2 }
    ]
  },



  "first-app": {
    id: "first-app",
    title: "Building Your First App",
    category: "tutorials",
    body: `
# Building Your First App

Learn how to build a complete application from scratch using our platform.

## Overview

In this tutorial, we'll create a simple todo application that demonstrates the core concepts of our platform.

## Project Setup

Create a new project:

\`\`\`bash
ourplatform create todo-app
cd todo-app
\`\`\`

## Application Structure

Your project will have the following structure:

\`\`\`
todo-app/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── app.js
├── public/
├── package.json
└── ourplatform.config.js
\`\`\`

## Creating Components

### Todo Item Component

Create \`src/components/TodoItem.js\`:

\`\`\`javascript
import React from 'react';

export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item">
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}
\`\`\`

### Todo List Component

Create \`src/components/TodoList.js\`:

\`\`\`javascript
import React, { useState } from 'react';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <h1>My Todo App</h1>
      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todos">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
\`\`\`

## Adding Styles

Add some basic styling to make your app look good:

\`\`\`css
.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}
\`\`\`

## Running Your App

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

## Next Steps

Congratulations! You've built your first app. Next, learn about:

- Adding data persistence
- User authentication
- Advanced styling
- Deployment strategies
    `,
    headings: [
      { id: "overview", text: "Overview", level: 2 },
      { id: "project-setup", text: "Project Setup", level: 2 },
      { id: "application-structure", text: "Application Structure", level: 2 },
      { id: "creating-components", text: "Creating Components", level: 2 },
      { id: "todo-item-component", text: "Todo Item Component", level: 3 },
      { id: "todo-list-component", text: "Todo List Component", level: 3 },
      { id: "adding-styles", text: "Adding Styles", level: 2 },
      { id: "running-your-app", text: "Running Your App", level: 2 },
      { id: "next-steps", text: "Next Steps", level: 2 }
    ]
  },
  "advanced-concepts": {
    id: "advanced-concepts",
    title: "Advanced Concepts",
    category: "tutorials",
    body: `
# Advanced Concepts

Dive deeper into advanced features and patterns.

## State Management

Learn how to manage complex application state effectively.

### Context API

Use React Context for sharing state across components:

\`\`\`javascript
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    loading: false
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
\`\`\`

## Performance Optimization

### Code Splitting

Split your code to improve loading times:

\`\`\`javascript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### Memoization

Use React.memo and useMemo for expensive operations:

\`\`\`javascript
import React, { memo, useMemo } from 'react';

const ExpensiveComponent = memo(({ data, filter }) => {
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <ul>
      {filteredData.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});
\`\`\`

## Error Handling

Implement robust error handling strategies:

### Error Boundaries

\`\`\`javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
\`\`\`

## Testing Strategies

### Unit Testing

Write comprehensive unit tests:

\`\`\`javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';

test('toggles todo completion', () => {
  const mockToggle = jest.fn();
  const todo = { id: 1, text: 'Test todo', completed: false };
  
  render(<TodoItem todo={todo} onToggle={mockToggle} />);
  
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  
  expect(mockToggle).toHaveBeenCalledWith(1);
});
\`\`\`

### Integration Testing

Test component interactions:

\`\`\`javascript
test('adds new todo when form is submitted', () => {
  render(<TodoList />);
  
  const input = screen.getByPlaceholderText('Add a new todo...');
  const button = screen.getByText('Add');
  
  fireEvent.change(input, { target: { value: 'New todo' } });
  fireEvent.click(button);
  
  expect(screen.getByText('New todo')).toBeInTheDocument();
});
\`\`\`

## Security Best Practices

### Input Validation

Always validate and sanitize user input:

\`\`\`javascript
import DOMPurify from 'dompurify';

function sanitizeInput(input) {
  return DOMPurify.sanitize(input);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
\`\`\`

### Authentication

Implement secure authentication patterns:

\`\`\`javascript
import jwt from 'jsonwebtoken';

async function authenticateUser(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
\`\`\`
    `,
    headings: [
      { id: "state-management", text: "State Management", level: 2 },
      { id: "context-api", text: "Context API", level: 3 },
      { id: "performance-optimization", text: "Performance Optimization", level: 2 },
      { id: "code-splitting", text: "Code Splitting", level: 3 },
      { id: "memoization", text: "Memoization", level: 3 },
      { id: "error-handling", text: "Error Handling", level: 2 },
      { id: "error-boundaries", text: "Error Boundaries", level: 3 },
      { id: "testing-strategies", text: "Testing Strategies", level: 2 },
      { id: "unit-testing", text: "Unit Testing", level: 3 },
      { id: "integration-testing", text: "Integration Testing", level: 3 },
      { id: "security-best-practices", text: "Security Best Practices", level: 2 },
      { id: "input-validation", text: "Input Validation", level: 3 },
      { id: "authentication", text: "Authentication", level: 3 }
    ]
  },
  "best-practices": {
    id: "best-practices",
    title: "Best Practices",
    category: "tutorials",
    body: `
# Best Practices

Follow these guidelines to build maintainable and scalable applications.

## Code Organization

### File Structure

Organize your files logically:

\`\`\`
src/
├── components/
│   ├── common/
│   ├── forms/
│   └── layout/
├── hooks/
├── services/
├── utils/
├── types/
└── constants/
\`\`\`

### Naming Conventions

Use consistent naming throughout your project:

- **Components**: PascalCase (e.g., \`UserProfile\`)
- **Files**: kebab-case (e.g., \`user-profile.tsx\`)
- **Functions**: camelCase (e.g., \`getUserData\`)
- **Constants**: UPPER_SNAKE_CASE (e.g., \`API_BASE_URL\`)

## Component Design

### Single Responsibility

Each component should have a single, clear purpose:

\`\`\`javascript
// Good: Focused component
function UserAvatar({ user, size = 'medium' }) {
  return (
    <img
      src={user.avatar}
      alt={user.name}
      className={\`avatar avatar-\${size}\`}
    />
  );
}

// Avoid: Component doing too much
function UserCard({ user }) {
  // Handles avatar, profile info, actions, etc.
}
\`\`\`

### Composition over Inheritance

Prefer composition patterns:

\`\`\`javascript
function Card({ children, className = '' }) {
  return (
    <div className={\`card \${className}\`}>
      {children}
    </div>
  );
}

function UserCard({ user }) {
  return (
    <Card className="user-card">
      <UserAvatar user={user} />
      <UserInfo user={user} />
      <UserActions user={user} />
    </Card>
  );
}
\`\`\`

## State Management

### Lift State Up

Keep state at the appropriate level:

\`\`\`javascript
// Good: State managed at parent level
function TodoApp() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <TodoForm onAddTodo={(todo) => setTodos([...todos, todo])} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}
\`\`\`

### Use Appropriate State Solutions

Choose the right tool for your needs:

- **useState**: Local component state
- **useReducer**: Complex state logic
- **Context**: App-wide state (theme, auth)
- **External library**: Large, complex apps

## Performance

### Avoid Premature Optimization

Profile before optimizing:

\`\`\`javascript
// Use React DevTools Profiler
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component render time:', actualDuration);
}

<Profiler id="TodoList" onRender={onRenderCallback}>
  <TodoList />
</Profiler>
\`\`\`

### Optimize Re-renders

Use dependency arrays correctly:

\`\`\`javascript
// Good: Proper dependencies
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Bad: Missing dependencies
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, []); // Missing 'data' dependency
\`\`\`

## Error Handling

### Graceful Degradation

Handle errors gracefully:

\`\`\`javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <EmptyState />;

  return <UserDetails user={user} />;
}
\`\`\`

## Accessibility

### Semantic HTML

Use appropriate HTML elements:

\`\`\`javascript
// Good: Semantic markup
function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
}

// Avoid: Non-semantic markup
function Navigation() {
  return (
    <div>
      <div onClick={() => navigate('/home')}>Home</div>
      <div onClick={() => navigate('/about')}>About</div>
    </div>
  );
}
\`\`\`

### ARIA Labels

Provide descriptive labels:

\`\`\`javascript
<button
  aria-label="Close dialog"
  onClick={onClose}
>
  ×
</button>
\`\`\`

## Testing

### Test Behavior, Not Implementation

Focus on what users experience:

\`\`\`javascript
// Good: Testing behavior
test('displays error message when login fails', async () => {
  render(<LoginForm />);
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'invalid@email' }
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
\`\`\`

### Write Tests That Give Confidence

Prioritize integration tests over unit tests:

\`\`\`javascript
// Integration test
test('user can complete todo workflow', async () => {
  render(<TodoApp />);
  
  // Add todo
  const input = screen.getByPlaceholderText(/add todo/i);
  fireEvent.change(input, { target: { value: 'Buy groceries' } });
  fireEvent.click(screen.getByText(/add/i));
  
  // Mark as complete
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  
  // Verify completion
  expect(screen.getByText('Buy groceries')).toHaveClass('completed');
});
\`\`\`
    `,
    headings: [
      { id: "code-organization", text: "Code Organization", level: 2 },
      { id: "file-structure", text: "File Structure", level: 3 },
      { id: "naming-conventions", text: "Naming Conventions", level: 3 },
      { id: "component-design", text: "Component Design", level: 2 },
      { id: "single-responsibility", text: "Single Responsibility", level: 3 },
      { id: "composition-over-inheritance", text: "Composition over Inheritance", level: 3 },
      { id: "state-management", text: "State Management", level: 2 },
      { id: "lift-state-up", text: "Lift State Up", level: 3 },
      { id: "use-appropriate-state-solutions", text: "Use Appropriate State Solutions", level: 3 },
      { id: "performance", text: "Performance", level: 2 },
      { id: "avoid-premature-optimization", text: "Avoid Premature Optimization", level: 3 },
      { id: "optimize-re-renders", text: "Optimize Re-renders", level: 3 },
      { id: "error-handling", text: "Error Handling", level: 2 },
      { id: "graceful-degradation", text: "Graceful Degradation", level: 3 },
      { id: "accessibility", text: "Accessibility", level: 2 },
      { id: "semantic-html", text: "Semantic HTML", level: 3 },
      { id: "aria-labels", text: "ARIA Labels", level: 3 },
      { id: "testing", text: "Testing", level: 2 },
      { id: "test-behavior-not-implementation", text: "Test Behavior, Not Implementation", level: 3 },
      { id: "write-tests-that-give-confidence", text: "Write Tests That Give Confidence", level: 3 }
    ]
  },
  authentication: {
    id: "authentication",
    title: "Authentication",
    category: "api-reference",
    body: `
# Authentication

Learn how to authenticate users and secure your API requests.

## Overview

Our platform uses JWT (JSON Web Tokens) for authentication. This provides a secure and stateless way to authenticate users across your application.

## Active Directory

### API Keys

First, obtain your API credentials from the dashboard:

1. Log in to your account
2. Navigate to Settings > API Keys
3. Generate a new API key
4. Store it securely in your environment variables

### Environment Setup

Add your credentials to your environment:

\`\`\`env
API_KEY=your_api_key_here
API_SECRET=your_api_secret_here
JWT_SECRET=your_jwt_secret_here
\`\`\`

## Authentication Flow

### 1. User Registration

Register a new user:

\`\`\`javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${API_KEY}\`
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword123',
    name: 'John Doe'
  })
});

const { user, token } = await response.json();
\`\`\`

### 2. User Login

Authenticate an existing user:

\`\`\`javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${API_KEY}\`
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword123'
  })
});

const { user, token } = await response.json();

// Store token for future requests
localStorage.setItem('authToken', token);
\`\`\`

### 3. Making Authenticated Requests

Include the JWT token in subsequent requests:

\`\`\`javascript
const token = localStorage.getItem('authToken');

const response = await fetch('/api/user/profile', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

const userProfile = await response.json();
\`\`\`

## Token Management

### Token Refresh

Refresh expired tokens:

\`\`\`javascript
async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refreshToken
    })
  });

  const { token, refreshToken: newRefreshToken } = await response.json();
  
  localStorage.setItem('authToken', token);
  localStorage.setItem('refreshToken', newRefreshToken);
  
  return token;
}
\`\`\`

### Automatic Token Refresh

Implement automatic token refresh:

\`\`\`javascript
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Axios interceptor example
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = \`Bearer \${token}\`;
          return axios(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Redirect to login
        window.location.href = '/login';
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
\`\`\`

## Security Best Practices

### Secure Token Storage

- **Never store tokens in localStorage in production**
- Use secure, httpOnly cookies when possible
- Implement proper CSRF protection

\`\`\`javascript
// Secure cookie storage (server-side)
response.cookie('authToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
\`\`\`

### Password Security

- Enforce strong password requirements
- Use bcrypt for password hashing
- Implement rate limiting on login attempts

\`\`\`javascript
const bcrypt = require('bcrypt');

// Hash password before storing
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(password, hashedPassword);
\`\`\`

### API Rate Limiting

Implement rate limiting to prevent abuse:

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  // Login logic
});
\`\`\`

## Error Handling

Handle authentication errors gracefully:

\`\`\`javascript
const handleAuthError = (error) => {
  switch (error.status) {
    case 401:
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      break;
    case 403:
      // Insufficient permissions
      showError('You don\'t have permission to access this resource');
      break;
    case 429:
      // Rate limited
      showError('Too many requests. Please try again later.');
      break;
    default:
      showError('An authentication error occurred');
  }
};
\`\`\`

## Testing Authentication

### Unit Tests

\`\`\`javascript
describe('Authentication', () => {
  test('should store token after successful login', async () => {
    const mockResponse = {
      user: { id: 1, email: 'test@example.com' },
      token: 'mock-jwt-token'
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    await login('test@example.com', 'password');

    expect(localStorage.getItem('authToken')).toBe('mock-jwt-token');
  });

  test('should handle login failure', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Invalid credentials' })
    });

    await expect(login('test@example.com', 'wrong-password'))
      .rejects.toThrow('Invalid credentials');
  });
});
\`\`\`
    `,
    headings: [
      { id: "overview", text: "Overview", level: 2 },
      { id: "getting-started", text: "Getting Started", level: 2 },
      { id: "api-keys", text: "API Keys", level: 3 },
      { id: "environment-setup", text: "Environment Setup", level: 3 },
      { id: "authentication-flow", text: "Authentication Flow", level: 2 },
      { id: "1-user-registration", text: "1. User Registration", level: 3 },
      { id: "2-user-login", text: "2. User Login", level: 3 },
      { id: "3-making-authenticated-requests", text: "3. Making Authenticated Requests", level: 3 },
      { id: "token-management", text: "Token Management", level: 2 },
      { id: "token-refresh", text: "Token Refresh", level: 3 },
      { id: "automatic-token-refresh", text: "Automatic Token Refresh", level: 3 },
      { id: "security-best-practices", text: "Security Best Practices", level: 2 },
      { id: "secure-token-storage", text: "Secure Token Storage", level: 3 },
      { id: "password-security", text: "Password Security", level: 3 },
      { id: "api-rate-limiting", text: "API Rate Limiting", level: 3 },
      { id: "error-handling", text: "Error Handling", level: 2 },
      { id: "testing-authentication", text: "Testing Authentication", level: 2 },
      { id: "unit-tests", text: "Unit Tests", level: 3 }
    ]
  },
  endpoints: {
    id: "endpoints",
    title: "API Endpoints",
    category: "api-reference",
    body: `
# API Endpoints

Complete reference for all available API endpoints.

## Base URL

All API requests should be made to:

\`\`\`
https://api.ourplatform.com/v1
\`\`\`

## Authentication

Include your API key in the Authorization header:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Users

### Get User Profile

\`\`\`http
GET /users/me
\`\`\`

**Response:**

\`\`\`json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
\`\`\`

### Update User Profile

\`\`\`http
PATCH /users/me
Content-Type: application/json

{
  "name": "Jane Doe",
  "avatar": "https://example.com/new-avatar.jpg"
}
\`\`\`

**Response:**

\`\`\`json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "Jane Doe",
  "avatar": "https://example.com/new-avatar.jpg",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-02T00:00:00Z"
}
\`\`\`

## Projects

### List Projects

\`\`\`http
GET /projects
\`\`\`

**Query Parameters:**

- \`page\` (integer): Page number (default: 1)
- \`limit\` (integer): Items per page (default: 20, max: 100)
- \`search\` (string): Search projects by name

**Response:**

\`\`\`json
{
  "projects": [
    {
      "id": "proj_123",
      "name": "My Project",
      "description": "A sample project",
      "status": "active",
      "createdAt": "2023-01-01T00:00:00Z",
      "updatedAt": "2023-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "pages": 3
  }
}
\`\`\`

### Create Project

\`\`\`http
POST /projects
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description",
  "settings": {
    "public": false,
    "collaborators": ["user_456"]
  }
}
\`\`\`

**Response:**

\`\`\`json
{
  "id": "proj_124",
  "name": "New Project",
  "description": "Project description",
  "status": "active",
  "settings": {
    "public": false,
    "collaborators": ["user_456"]
  },
  "createdAt": "2023-01-02T00:00:00Z",
  "updatedAt": "2023-01-02T00:00:00Z"
}
\`\`\`

### Get Project

\`\`\`http
GET /projects/{project_id}
\`\`\`

**Path Parameters:**

- \`project_id\` (string): The project ID

**Response:**

\`\`\`json
{
  "id": "proj_123",
  "name": "My Project",
  "description": "A sample project",
  "status": "active",
  "settings": {
    "public": false,
    "collaborators": ["user_456"]
  },
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-01-01T00:00:00Z"
}
\`\`\`

### Update Project

\`\`\`http
PATCH /projects/{project_id}
Content-Type: application/json

{
  "name": "Updated Project Name",
  "description": "Updated description"
}
\`\`\`

### Delete Project

\`\`\`http
DELETE /projects/{project_id}
\`\`\`

**Response:**

\`\`\`json
{
  "message": "Project deleted successfully"
}
\`\`\`

## Files

### Upload File

\`\`\`http
POST /projects/{project_id}/files
Content-Type: multipart/form-data

file: [binary data]
path: "assets/image.png"
\`\`\`

**Response:**

\`\`\`json
{
  "id": "file_123",
  "name": "image.png",
  "path": "assets/image.png",
  "size": 1024,
  "mimeType": "image/png",
  "url": "https://cdn.ourplatform.com/files/file_123",
  "createdAt": "2023-01-01T00:00:00Z"
}
\`\`\`

### List Files

\`\`\`http
GET /projects/{project_id}/files
\`\`\`

**Query Parameters:**

- \`path\` (string): Filter by path prefix
- \`type\` (string): Filter by file type (image, document, etc.)

**Response:**

\`\`\`json
{
  "files": [
    {
      "id": "file_123",
      "name": "image.png",
      "path": "assets/image.png",
      "size": 1024,
      "mimeType": "image/png",
      "url": "https://cdn.ourplatform.com/files/file_123",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  ]
}
\`\`\`

### Delete File

\`\`\`http
DELETE /projects/{project_id}/files/{file_id}
\`\`\`

## Analytics

### Get Project Analytics

\`\`\`http
GET /projects/{project_id}/analytics
\`\`\`

**Query Parameters:**

- \`period\` (string): Time period (day, week, month, year)
- \`start_date\` (string): Start date (ISO 8601)
- \`end_date\` (string): End date (ISO 8601)

**Response:**

\`\`\`json
{
  "views": 1250,
  "uniqueVisitors": 450,
  "averageSessionDuration": 180,
  "bounceRate": 0.35,
  "timeline": [
    {
      "date": "2023-01-01",
      "views": 125,
      "uniqueVisitors": 45
    }
  ]
}
\`\`\`

## Error Responses

All endpoints return errors in a consistent format:

\`\`\`json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request is invalid",
    "details": {
      "field": "email",
      "issue": "Email is required"
    }
  }
}
\`\`\`

### Error Codes

- \`400\` - Bad Request
- \`401\` - Unauthorized
- \`403\` - Forbidden
- \`404\` - Not Found
- \`422\` - Validation Error
- \`429\` - Rate Limited
- \`500\` - Internal Server Error

## Rate Limits

API requests are rate limited:

- **Standard**: 1000 requests per hour
- **Premium**: 5000 requests per hour
- **Enterprise**: Unlimited

Rate limit headers are included in responses:

\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
\`\`\`

## SDKs and Libraries

### JavaScript/Node.js

\`\`\`bash
npm install @ourplatform/sdk
\`\`\`

\`\`\`javascript
import { OurPlatform } from '@ourplatform/sdk';

const client = new OurPlatform({
  apiKey: process.env.API_KEY
});

const projects = await client.projects.list();
\`\`\`

### Python

\`\`\`bash
pip install ourplatform-python
\`\`\`

\`\`\`python
from ourplatform import Client

client = Client(api_key="your_api_key")
projects = client.projects.list()
\`\`\`

### PHP

\`\`\`bash
composer require ourplatform/php-sdk
\`\`\`

\`\`\`php
use OurPlatform\\Client;

$client = new Client(['api_key' => 'your_api_key']);
$projects = $client->projects->list();
\`\`\`
    `,
    headings: [
      { id: "base-url", text: "Base URL", level: 2 },
      { id: "authentication", text: "Authentication", level: 2 },
      { id: "users", text: "Users", level: 2 },
      { id: "get-user-profile", text: "Get User Profile", level: 3 },
      { id: "update-user-profile", text: "Update User Profile", level: 3 },
      { id: "projects", text: "Projects", level: 2 },
      { id: "list-projects", text: "List Projects", level: 3 },
      { id: "create-project", text: "Create Project", level: 3 },
      { id: "get-project", text: "Get Project", level: 3 },
      { id: "update-project", text: "Update Project", level: 3 },
      { id: "delete-project", text: "Delete Project", level: 3 },
      { id: "files", text: "Files", level: 2 },
      { id: "upload-file", text: "Upload File", level: 3 },
      { id: "list-files", text: "List Files", level: 3 },
      { id: "delete-file", text: "Delete File", level: 3 },
      { id: "analytics", text: "Analytics", level: 2 },
      { id: "get-project-analytics", text: "Get Project Analytics", level: 3 },
      { id: "error-responses", text: "Error Responses", level: 2 },
      { id: "error-codes", text: "Error Codes", level: 3 },
      { id: "rate-limits", text: "Rate Limits", level: 2 },
      { id: "sdks-and-libraries", text: "SDKs and Libraries", level: 2 },
      { id: "javascriptnodejs", text: "JavaScript/Node.js", level: 3 },
      { id: "python", text: "Python", level: 3 },
      { id: "php", text: "PHP", level: 3 }
    ]
  },


  webhooks: {
    id: "webhooks",
    title: "Webhooks",
    category: "api-reference",
    body: `
# Webhooks

Learn how to receive real-time notifications from our platform.

## Overview

Webhooks allow you to receive HTTP notifications when certain events occur in your account. Instead of repeatedly polling our API, you can set up webhooks to be notified immediately when something happens.

## Supported Events

### Project Events

- \`project.created\` - A new project was created
- \`project.updated\` - A project was updated
- \`project.deleted\` - A project was deleted
- \`project.published\` - A project was published

### User Events

- \`user.created\` - A new user signed up
- \`user.updated\` - A user profile was updated
- \`user.deleted\` - A user account was deleted

### File Events

- \`file.uploaded\` - A file was uploaded
- \`file.deleted\` - A file was deleted

## Setting Up Webhooks

### Via API

Create a webhook endpoint:

\`\`\`http
POST /webhooks
Content-Type: application/json

{
  "url": "https://yoursite.com/webhooks/ourplatform",
  "events": ["project.created", "project.updated"],
  "secret": "your_webhook_secret"
}
\`\`\`

**Response:**

\`\`\`json
{
  "id": "webhook_123",
  "url": "https://yoursite.com/webhooks/ourplatform",
  "events": ["project.created", "project.updated"],
  "secret": "your_webhook_secret",
  "active": true,
  "createdAt": "2023-01-01T00:00:00Z"
}
\`\`\`

### Via Dashboard

1. Navigate to Settings > Webhooks
2. Click "Add Webhook"
3. Enter your endpoint URL
4. Select the events you want to receive
5. Save your webhook

## Webhook Payload

### Standard Format

All webhooks follow this format:

\`\`\`json
{
  "id": "evt_123",
  "type": "project.created",
  "data": {
    "object": {
      "id": "proj_123",
      "name": "My Project",
      "description": "A sample project",
      "status": "active",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  },
  "created": "2023-01-01T00:00:00Z"
}
\`\`\`

### Event-Specific Payloads

#### project.created

\`\`\`json
{
  "id": "evt_123",
  "type": "project.created",
  "data": {
    "object": {
      "id": "proj_123",
      "name": "New Project",
      "description": "Description",
      "status": "active",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  },
  "created": "2023-01-01T00:00:00Z"
}
\`\`\`

#### project.updated

\`\`\`json
{
  "id": "evt_124",
  "type": "project.updated",
  "data": {
    "object": {
      "id": "proj_123",
      "name": "Updated Project Name",
      "description": "Updated description",
      "status": "active",
      "updatedAt": "2023-01-02T00:00:00Z"
    },
    "previous_attributes": {
      "name": "Old Project Name",
      "description": "Old description"
    }
  },
  "created": "2023-01-02T00:00:00Z"
}
\`\`\`

#### file.uploaded

\`\`\`json
{
  "id": "evt_125",
  "type": "file.uploaded",
  "data": {
    "object": {
      "id": "file_123",
      "name": "image.png",
      "path": "assets/image.png",
      "size": 1024,
      "mimeType": "image/png",
      "projectId": "proj_123",
      "createdAt": "2023-01-01T00:00:00Z"
    }
  },
  "created": "2023-01-01T00:00:00Z"
}
\`\`\`

## Handling Webhooks

### Basic Endpoint

Here's a basic webhook handler in Node.js:

\`\`\`javascript
const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.raw({ type: 'application/json' }));

app.post('/webhooks/ourplatform', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = req.body;
  
  // Verify webhook signature
  if (!verifyWebhookSignature(payload, signature)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = JSON.parse(payload);
  
  // Handle the event
  switch (event.type) {
    case 'project.created':
      handleProjectCreated(event.data.object);
      break;
    case 'project.updated':
      handleProjectUpdated(event.data.object);
      break;
    case 'file.uploaded':
      handleFileUploaded(event.data.object);
      break;
    default:
      console.log(\`Unhandled event type: \${event.type}\`);
  }
  
  res.status(200).send('OK');
});

function verifyWebhookSignature(payload, signature) {
  const secret = process.env.WEBHOOK_SECRET;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

function handleProjectCreated(project) {
  console.log('New project created:', project.name);
  // Your logic here
}

function handleProjectUpdated(project) {
  console.log('Project updated:', project.name);
  // Your logic here
}

function handleFileUploaded(file) {
  console.log('File uploaded:', file.name);
  // Your logic here
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
\`\`\`

### Python/Flask Example

\`\`\`python
from flask import Flask, request, abort
import hashlib
import hmac
import json
import os

app = Flask(__name__)

@app.route('/webhooks/ourplatform', methods=['POST'])
def webhook():
    signature = request.headers.get('X-Webhook-Signature')
    payload = request.get_data()
    
    if not verify_webhook_signature(payload, signature):
        abort(401)
    
    event = json.loads(payload)
    
    if event['type'] == 'project.created':
        handle_project_created(event['data']['object'])
    elif event['type'] == 'project.updated':
        handle_project_updated(event['data']['object'])
    elif event['type'] == 'file.uploaded':
        handle_file_uploaded(event['data']['object'])
    
    return 'OK', 200

def verify_webhook_signature(payload, signature):
    secret = os.environ['WEBHOOK_SECRET'].encode()
    expected_signature = hmac.new(
        secret, 
        payload, 
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature)

def handle_project_created(project):
    print(f"New project created: {project['name']}")

def handle_project_updated(project):
    print(f"Project updated: {project['name']}")

def handle_file_uploaded(file):
    print(f"File uploaded: {file['name']}")

if __name__ == '__main__':
    app.run(port=3000)
\`\`\`

## Security

### Signature Verification

Always verify webhook signatures to ensure requests are from our platform:

1. Get the signature from the \`X-Webhook-Signature\` header
2. Compute the expected signature using HMAC-SHA256
3. Compare signatures using a timing-safe comparison

### Best Practices

- **Use HTTPS**: Always use HTTPS for webhook endpoints
- **Verify signatures**: Always verify webhook signatures
- **Idempotency**: Handle duplicate webhooks gracefully
- **Timeouts**: Respond within 10 seconds
- **Error handling**: Return appropriate HTTP status codes

### Retry Logic

Our platform will retry failed webhooks with exponential backoff:

- 1st retry: 30 seconds
- 2nd retry: 2 minutes
- 3rd retry: 10 minutes
- 4th retry: 1 hour
- 5th retry: 6 hours

After 5 failed attempts, we'll disable the webhook.

## Testing Webhooks

### Using ngrok for Local Development

1. Install ngrok: \`npm install -g ngrok\`
2. Expose your local server: \`ngrok http 3000\`
3. Use the ngrok URL for your webhook endpoint

### Webhook Testing Tool

Use our webhook testing tool to simulate events:

\`\`\`bash
curl -X POST "https://api.ourplatform.com/v1/webhooks/test" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "webhook_id": "webhook_123",
    "event_type": "project.created"
  }'
\`\`\`

## Managing Webhooks

### List Webhooks

\`\`\`http
GET /webhooks
\`\`\`

### Update Webhook

\`\`\`http
PATCH /webhooks/{webhook_id}
Content-Type: application/json

{
  "events": ["project.created", "file.uploaded"],
  "active": true
}
\`\`\`

### Delete Webhook

\`\`\`http
DELETE /webhooks/{webhook_id}
\`\`\`

### Get Webhook Logs

\`\`\`http
GET /webhooks/{webhook_id}/logs
\`\`\`

This returns recent webhook delivery attempts and their results.

## Troubleshooting

### Common Issues

**Webhook not receiving events**
- Check that your endpoint is publicly accessible
- Verify the webhook is active
- Check webhook logs for delivery failures

**Signature verification failing**
- Ensure you're using the correct secret
- Verify you're computing the signature correctly
- Check that you're using the raw request body

**Timeouts**
- Ensure your endpoint responds within 10 seconds
- Consider processing webhooks asynchronously

### Debug Headers

We include debug headers in webhook requests:

- \`X-Webhook-ID\`: Unique delivery ID
- \`X-Webhook-Timestamp\`: Delivery timestamp
- \`X-Webhook-Signature\`: HMAC signature
    `,
    headings: [
      { id: "overview", text: "Overview", level: 2 },
      { id: "supported-events", text: "Supported Events", level: 2 },
      { id: "project-events", text: "Project Events", level: 3 },
      { id: "user-events", text: "User Events", level: 3 },
      { id: "file-events", text: "File Events", level: 3 },
      { id: "setting-up-webhooks", text: "Setting Up Webhooks", level: 2 },
      { id: "via-api", text: "Via API", level: 3 },
      { id: "via-dashboard", text: "Via Dashboard", level: 3 },
      { id: "webhook-payload", text: "Webhook Payload", level: 2 },
      { id: "standard-format", text: "Standard Format", level: 3 },
      { id: "event-specific-payloads", text: "Event-Specific Payloads", level: 3 },
      { id: "projectcreated", text: "project.created", level: 4 },
      { id: "projectupdated", text: "project.updated", level: 4 },
      { id: "fileuploaded", text: "file.uploaded", level: 4 },
      { id: "handling-webhooks", text: "Handling Webhooks", level: 2 },
      { id: "basic-endpoint", text: "Basic Endpoint", level: 3 },
      { id: "pythonflask-example", text: "Python/Flask Example", level: 3 },
      { id: "security", text: "Security", level: 2 },
      { id: "signature-verification", text: "Signature Verification", level: 3 },
      { id: "best-practices", text: "Best Practices", level: 3 },
      { id: "retry-logic", text: "Retry Logic", level: 3 },
      { id: "testing-webhooks", text: "Testing Webhooks", level: 2 },
      { id: "using-ngrok-for-local-development", text: "Using ngrok for Local Development", level: 3 },
      { id: "webhook-testing-tool", text: "Webhook Testing Tool", level: 3 },
      { id: "managing-webhooks", text: "Managing Webhooks", level: 2 },
      { id: "list-webhooks", text: "List Webhooks", level: 3 },
      { id: "update-webhook", text: "Update Webhook", level: 3 },
      { id: "delete-webhook", text: "Delete Webhook", level: 3 },
      { id: "get-webhook-logs", text: "Get Webhook Logs", level: 3 },
      { id: "troubleshooting", text: "Troubleshooting", level: 2 },
      { id: "common-issues", text: "Common Issues", level: 3 },
      { id: "debug-headers", text: "Debug Headers", level: 3 }
    ]
  }
};