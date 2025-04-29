import PropTypes from "prop-types"
import { useTheme } from "../context/ThemeContext"

const AppLayout = ({ children }) => {
    const theme = useTheme()

    return (
        <div
            className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-white relative overflow-hidden"
            style={{
                backgroundColor: theme.colors.background,
                backgroundImage: `url(${theme.images.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

            <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl relative z-10">
                <header className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <img
                            src="/images/track-logo-white.svg"
                            alt="Track Logo"
                            className="h-12 md:h-16"
                        />
                    </div>
                    <h1
                        className="text-3xl md:text-4xl font-bold leading-tight"
                        style={{
                            color: theme.colors.secondary,
                            fontFamily: theme.typography.fontFamily.title,
                        }}
                    >
                        QR Code Generator
                    </h1>
                    <p
                        className="mt-2 text-sm md:text-base max-w-md mx-auto"
                        style={{
                            color: theme.background,
                            fontFamily: theme.typography.fontFamily.subtitle,
                        }}
                    >
                        Create QR codes for your projects
                    </p>
                </header>
                <main style={{ fontFamily: theme.typography.fontFamily.body }}>{children}</main>
                <footer
                    className="mt-10 md:mt-16 text-center text-sm md:text-base"
                    style={{
                        color: theme.background,
                        fontFamily: theme.typography.fontFamily.body,
                    }}
                >
                    <p>© {new Date().getFullYear()} QR Code Generator. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout
