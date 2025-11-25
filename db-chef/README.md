# DB Chef 🧑‍🍳

A polished, production-quality database assistant tool built with React, Vite, and TailwindCSS.

## Features

- 🔌 **Universal Connections** - Connect to PostgreSQL, MySQL, MongoDB, SQLite, Oracle, Redis, Kafka, and more
- 🤖 **AI Chat Assistant** - Convert SQL dialects, generate migrations, explain queries
- ⚡ **Lightning Fast** - Built with Vite for instant hot module replacement
- 🎨 **Beautiful UI** - Modern dark theme with smooth animations
- 🔒 **Secure** - SSL support and encrypted credentials
- 📊 **Schema Explorer** - Browse tables and columns with tree view

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open automatically at `http://localhost:3000`

## Project Structure

```
db-chef/
├── src/
│   ├── components/        # Reusable components
│   │   ├── layout/       # Navbar, Toast
│   │   ├── dashboard/    # Connection management
│   │   └── workspace/    # Chat, Schema, History
│   ├── pages/            # Page components
│   ├── data/             # Mock data and providers
│   └── assets/           # Icons and static files
├── public/               # Static assets
└── index.html           # Entry HTML

## Pages

- **Landing** - Hero section with features
- **Login/Register** - Authentication forms
- **Dashboard** - Connection management with DB carousel
- **Workspace** - Main workspace with schema, chat, and history panels
- **Error** - Connection error page with troubleshooting

## Components

### Layout
- `Navbar` - Navigation with logo and links
- `Toast` - Notification system

### Dashboard
- `DBCarousel` - Horizontal scrolling database selector
- `ConnectionCard` - Display saved connections
- `ConnectionModal` - Form for new connections

### Workspace
- `SchemaPanel` - Collapsible tree view of database schema
- `ChatPanel` - AI assistant chat interface
- `HistoryPanel` - Saved prompts and queries
- `Message` - Individual chat message with code blocks

## Mock Data

The app includes realistic mock data for demonstration:
- 10 database providers with icons, colors, and default ports
- Sample schema (users, orders, products tables)
- Pre-populated connections
- Realistic SQL responses

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  primary: {
    DEFAULT: '#10b981',  // Change primary color
    dark: '#059669',
    light: '#34d399',
  }
}
```

### Database Providers

Add or modify providers in `src/data/dbProviders.js`

### Mock Responses

Customize AI responses in `src/pages/Workspace.jsx`

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Screenshots

### Landing Page
Modern hero section with features grid

### Dashboard
Connection management with interactive DB carousel

### Workspace
Three-column layout: schema tree, chat assistant, history panel

## Features in Detail

### DB Carousel
- Circular database icons
- Smooth horizontal scrolling
- Left/right arrow controls
- Keyboard navigation
- Hover tooltips

### Chat Assistant
- Syntax-highlighted code blocks
- Copy-to-clipboard functionality
- Enter to send, Shift+Enter for newline
- Quick action chips (List Tables, Explain Query, etc.)
- Realistic SQL responses

### Schema Tree
- Expandable/collapsible nodes
- Icons for schemas, tables, columns
- Lazy loading support

### Connection Management
- Test connection with loading states
- SSL toggle
- Success/error toasts
- Validation

## License

MIT

## Author

Built with ❤️ for developers
