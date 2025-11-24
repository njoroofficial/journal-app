# 📔 My Simple Journal

A beautiful, modern journal application built with React, TypeScript, and Tailwind CSS. Write, edit, and manage your thoughts with an intuitive interface and smooth user experience.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.2-purple?logo=vite)

## ✨ Features

- **📝 Create & Edit Entries** - Write new journal entries or update existing ones
- **🗑️ Delete Entries** - Remove entries you no longer need
- **⭐ Mark Important** - Flag entries as important for quick reference
- **🌙 Dark Mode** - Automatic dark mode support for comfortable reading
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🔄 API Integration** - Connects to JSONPlaceholder API for CRUD operations
- **⚡ Fast & Modern** - Built with Vite for lightning-fast development and builds
- **🎨 Beautiful UI** - Clean, modern interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/njoroofficial/journal-app.git
cd journal-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🛠️ Built With

- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** - Mock API

## 🏗️ Project Structure

```
journal-app/
├── src/
│   ├── components/
│   │   ├── JournalEntryCard.tsx    # Individual entry card component
│   │   └── JournalForm.tsx         # Form for creating/editing entries
│   ├── lib/
│   │   └── api-service.ts          # API utility functions
│   ├── assets/                     # Static assets
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles
├── public/                         # Public assets
└── package.json                    # Dependencies and scripts
```

## 🎯 How It Works

1. **Fetch Entries** - On load, the app fetches 10 journal entries from the API
2. **Create New** - Click "New Entry" to open the form and write a new entry
3. **Edit** - Click the edit icon on any entry card to modify it
4. **Delete** - Click the trash icon to remove an entry
5. **Mark Important** - Click the star icon to flag important entries

## 🌟 Key Features Explained

### CRUD Operations

- **Create**: POST new entries to the API
- **Read**: Fetch and display entries from the API
- **Update**: PUT requests to modify existing entries
- **Delete**: Remove entries via DELETE requests

### Error Handling

- Retry mechanism for failed API requests
- User-friendly error messages
- Loading states for better UX

### Responsive Design

- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly buttons and interactions

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Moses Njoroge**

- GitHub: [@njoroofficial](https://github.com/njoroofficial)

---

Made with ❤️ and React
