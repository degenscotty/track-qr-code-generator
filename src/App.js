import AppLayout from "./layouts/AppLayout"
import Home from "./pages/Home"
import "./App.css"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
    return (
        <ThemeProvider>
            <AppLayout>
                <Home />
            </AppLayout>
        </ThemeProvider>
    )
}

export default App
