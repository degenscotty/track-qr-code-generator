import { createContext, useContext } from "react"

// Define theme colors and typography
const themeValues = {
    colors: {
        primary: "#44C8F5", // Light blue
        secondary: "#FFBDDF", // Pink
        background: "#FFFFFF", // White (changed from black)
        cardBg: "#F3F4F6", // Light gray for cards (changed from dark gray)
        cardAltBg: "#F9FAFB", // Alternative card background (gray-50)
        border: "#E5E7EB", // Border color (gray-200)
        text: {
            primary: "#111827", // Near black (changed from white)
            secondary: "#4B5563", // Gray-600 (changed from gray-300)
            accent: "#44C8F5", // Blue-500 (slightly darker for contrast)
            subtitle: "#FFBDDF", // Pink for subtitles (slightly darker)
        },
        form: {
            background: "#F9FAFB", // Gray-50 (changed from gray-900)
            border: {
                default: "#D1D5DB", // Gray-300 (changed from gray-700)
                error: "#EF4444", // Red-500
            },
            focus: "#44C8F5", // Blue-500
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
    components: {
        qrCodeForm: {
            input: (theme, hasError) => ({
                width: "100%",
                padding: "0.5rem 1rem",
                backgroundColor: theme.colors.form.background,
                color: theme.colors.text.primary,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: hasError
                    ? theme.colors.form.border.error
                    : theme.colors.form.border.default,
                borderRadius: "0.375rem",
                fontFamily: theme.typography.fontFamily.body,
                outline: "none",
                transition: "border-color 0.2s ease-in-out",
            }),
            label: (theme) => ({
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily.subtitle,
            }),
            error: (theme) => ({
                marginTop: "0.25rem",
                fontSize: "0.875rem",
                color: theme.colors.form.border.error,
                fontFamily: theme.typography.fontFamily.body,
            }),
            button: (theme) => ({
                backgroundColor: theme.colors.secondary,
                color: "black",
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "1.5rem",
                fontWeight: "700",
                fontFamily: theme.typography.fontFamily.subtitle,
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: theme.colors.primary,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s ease",
            }),
            formControlCss: (theme) => `
                .form-control:hover {
                    border-color: ${theme.colors.primary} !important;
                }
                .form-control:focus {
                    border-color: ${theme.colors.primary} !important;
                    box-shadow: 0 0 0 2px ${theme.colors.primary}33 !important;
                    outline: none !important;
                }
            `,
        },
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
