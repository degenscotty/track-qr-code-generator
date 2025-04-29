import PropTypes from "prop-types"

const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl">
                <header className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <svg
                            className="w-12 h-12 md:w-16 md:h-16 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M3 3h6v6H3V3zm0 18v-6h6v6H3zm12 0v-6h6v6h-6zm0-12V3h6v6h-6z" />
                            <path d="M7 7h2v2H7zm0 8h2v2H7zm8 0h2v2h-2zm0-8h2v2h-2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        QR Code Generator
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-gray-600 max-w-md mx-auto">
                        Create professional QR codes for your projects with a customizable print
                        layout
                    </p>
                </header>
                <main className="md:px-4">{children}</main>
                <footer className="mt-10 md:mt-16 text-center text-sm md:text-base text-gray-500">
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
