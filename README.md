# Todo Quill

<!-- markdownlint-disable MD033 -->
<div align="center">
  <img src="./assets/demo.gif" alt="Todo Quill Demo" />
</div>
<!-- markdownlint-enable MD033 -->

A modern, feature-rich todo application built with React Native and Expo, featuring a comprehensive design system with dark mode support and file-based navigation using Expo Router.

## ✨ Features

- **📝 Task Management**: Create, complete, and delete todos
- **🔍 Filtering**: Filter todos by All, Active, or Done status
- **🎨 Theme System**: Light, dark, and system theme support
- **⚙️ Settings Screen**: Dedicated settings page with theme controls
- **🧭 File-based Navigation**: Modern routing with Expo Router
- **💾 Persistent Storage**: Todos are saved locally using AsyncStorage
- **📱 Cross-Platform**: Works on iOS, Android, and Web
- **🎯 Type Safety**: Full TypeScript support
- **🔧 Code Quality**: ESLint, Prettier, and Husky pre-commit hooks

## 🚀 Quick Start

### Prerequisites

- Node.js (v22 or higher)
- iOS Simulator (for iOS development) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/demirtasdurmus/todo-quill.git
   cd todo-quill
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on your preferred platform**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 🎨 Design System

This project implements a comprehensive design system with the following features:

### Theme Architecture

The app uses a semantic color system with three theme modes:

- **Light Theme**: Clean, bright interface
- **Dark Theme**: Easy on the eyes for low-light environments
- **System Theme**: Automatically follows device theme settings

### Color Palette

```typescript
// Brand colors
primary: "#3b82f6"     // Main brand color
secondary: "#6b7280"   // Secondary brand color

// UI colors
background: "#f9fafb"  // App background
surface: "#ffffff"     // Card/input backgrounds
border: "#e5e7eb"      // Borders and dividers

// Text colors
text.primary: "#111827"    // Main text
text.secondary: "#6b7280"  // Secondary text
text.inverse: "#ffffff"    // Text on colored backgrounds

// Feedback colors
success: "#22c55e"     // Success states
error: "#ef4444"       // Error states
warning: "#f59e0b"     // Warning states
```

### Typography Scale

```typescript
sizes: {
  xs: 12,    // Captions
  sm: 14,    // Small text
  base: 16,  // Body text
  lg: 18,    // Large text
  xl: 20,    // Headings
  "2xl": 24, // Large headings
  "3xl": 30, // Page titles
  "4xl": 36, // Hero text
}
```

### Spacing System

```typescript
spacing: {
  xs: 4,   // Tiny gaps
  sm: 8,   // Small gaps
  md: 16,  // Medium gaps
  lg: 24,  // Large gaps
  xl: 32,  // Extra large gaps
  xxl: 48, // Hero spacing
}
```

## 📁 Project Structure

```sh
app/                   # Expo Router file-based navigation
├── _layout.tsx        # Root layout with theme provider
└── (tabs)/            # Tab navigation group
    ├── _layout.tsx    # Tab layout configuration
    ├── index.tsx      # Todo screen (home route)
    └── settings.tsx   # Settings screen

src/
├── components/          # Reusable UI components
├── layouts/            # Layout components
├── providers/          # Context providers
├── services/           # Business logic and API calls
├── hooks/              # Custom hooks
└── theme/              # Design system
```

## 🧭 Navigation

This app uses **Expo Router** for modern file-based navigation:

### Routes

- **`/`** (index.tsx): Todo screen - main task management interface
- **`/settings`** (settings.tsx): Settings screen - theme configuration

### Navigation Features

- **File-based routing**: Routes are automatically created based on file structure
- **Type-safe navigation**: Full TypeScript support for route parameters
- **Deep linking**: Every screen is automatically deep linkable
- **Native navigation**: Built on top of React Navigation for optimal performance

### Navigation Usage

```typescript
import { router } from "expo-router";

// Navigate to settings
router.push("/settings");

// Go back
router.back();

// Navigate and replace current screen
router.replace("/settings");
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm start              # Start Expo development server
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
npm run web           # Run on web browser

# Code Quality
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

### Code Quality Tools

- **ESLint v9**: Modern linting with flat config
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit linting
- **lint-staged**: Run linters only on staged files

### Theme Usage

```typescript
import { useTheme, useThemedStyles } from '../src/hooks';

const MyComponent = () => {
  const { theme } = useTheme();

  const styles = useThemedStyles(
    (theme) => StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
      },
      title: {
        color: theme.colors.text.primary,
        fontSize: theme.typography.sizes.xl,
        fontWeight: theme.typography.weights.bold,
      },
    }),
    theme
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
};
```

## Features in Detail

### Todo Management

- **Add Todos**: Type in the input field and press Enter
- **Complete Todos**: Tap the checkbox or the todo text
- **Delete Todos**: Tap the ✕ button (with confirmation dialog)
- **Clear Completed**: Remove all completed todos at once

### Filtering

- **All**: Show all todos
- **Active**: Show only incomplete todos
- **Done**: Show only completed todos
- **Counter**: Shows remaining active todos

### Settings & Theme

- **Settings Screen**: Dedicated page for app configuration
- **Theme Selection**: Choose between Automatic, Light, and Dark themes
- **System Integration**: Automatic theme follows device settings
- **Persistent Settings**: Theme preferences are saved locally

## Configuration

### Environment Setup

The app uses Expo SDK 53 with the following key dependencies:

- **React Native**: 0.79.5
- **Expo**: 53.0.22
- **Expo Router**: File-based navigation
- **TypeScript**: 5.8.3
- **AsyncStorage**: For local data persistence

### Theme Configuration

To customize the theme, edit the color definitions in `src/theme/colors.ts`:

```typescript
export const themes = {
  light: {
    primary: "#your-brand-color",
    // ... other colors
  },
  dark: {
    primary: "#your-dark-brand-color",
    // ... other colors
  },
};
```

## 🚀 Deployment

### Building for Production

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for web
expo build:web
```

### Publishing

```bash
expo publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (enforced by ESLint and Prettier)
- Write TypeScript for all new code
- Use the design system for styling
- Test on both light and dark themes
- Ensure accessibility features are maintained
- Follow Expo Router conventions for new screens

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- Navigation powered by [Expo Router](https://docs.expo.dev/router/)
- Icons from [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
- Checkbox component from [expo-checkbox](https://docs.expo.dev/versions/latest/sdk/checkbox/)
- Storage solution using [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)

---

Made with ❤️ using React Native and Expo
