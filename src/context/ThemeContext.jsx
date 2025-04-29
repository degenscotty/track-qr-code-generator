import { createContext, useContext } from "react"

// Define theme colors and typography
const themeValues = {
    colors: {
        primary: "#56C3EB", // Light blue
        secondary: "#FFC0CB", // Pink
        background: "#FFFFFF", // White (changed from black)
        cardBg: "#F3F4F6", // Light gray for cards (changed from dark gray)
        cardAltBg: "#F9FAFB", // Alternative card background (gray-50)
        border: "#E5E7EB", // Border color (gray-200)
        text: {
            primary: "#111827", // Near black (changed from white)
            secondary: "#4B5563", // Gray-600 (changed from gray-300)
            accent: "#3B82F6", // Blue-500 (slightly darker for contrast)
            subtitle: "#EC4899", // Pink for subtitles (slightly darker)
        },
        form: {
            background: "#F9FAFB", // Gray-50 (changed from gray-900)
            border: {
                default: "#D1D5DB", // Gray-300 (changed from gray-700)
                error: "#EF4444", // Red-500
            },
            focus: "#3B82F6", // Blue-500
        },
    },
    typography: {
        fontFamily: {
            title: "'Space Mono', monospace",
            subtitle: "'Space Grotesk', sans-serif",
            body: "'Montserrat', sans-serif",
        },
    },
    images: {
        backgroundImage: "/images/gradient-wave-bg.png",
    },
}

// Create context
const ThemeContext = createContext(themeValues)

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext)

// Theme provider component
export const ThemeProvider = ({ children }) => {
    return <ThemeContext.Provider value={themeValues}>{children}</ThemeContext.Provider>
}

export default ThemeContext
