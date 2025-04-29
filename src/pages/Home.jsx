import { useState } from "react"
import QRCodeForm from "../components/QRCodeForm"
import Card from "../components/Card"
import { generateQRCodeAndPrint } from "../utils/qrCodeGenerator"
import { useTheme } from "../context/ThemeContext"

const Home = () => {
    const theme = useTheme()
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerateQR = async (formData) => {
        const { projectName, projectLink, projectDescription } = formData

        try {
            setIsGenerating(true)
            await generateQRCodeAndPrint(projectLink, projectName, projectDescription)
        } catch (error) {
            console.error("Error generating QR code:", error)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <>
            <Card>
                <h2
                    className="text-xl font-semibold mb-6"
                    style={{
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.title,
                    }}
                >
                    Create a New QR Code
                </h2>
                <QRCodeForm onGenerateQR={handleGenerateQR} />

                {isGenerating && (
                    <div className="mt-4 flex justify-center">
                        <div
                            className="inline-flex items-center px-4 py-2 text-sm leading-5 font-medium"
                            style={{ color: theme.colors.primary }}
                        >
                            <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                style={{ color: theme.colors.primary }}
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Generating QR code...
                        </div>
                    </div>
                )}
            </Card>

            <div className="mt-6">
                <Card
                    className="border-gray-700"
                    style={{ backgroundColor: theme.colors.cardAltBg }}
                >
                    <h3
                        className="text-lg font-medium mb-2"
                        style={{
                            color: theme.colors.text.primary,
                            fontFamily: theme.typography.fontFamily.subtitle,
                        }}
                    >
                        How It Works
                    </h3>
                    <ol
                        className="list-decimal list-inside text-sm space-y-2"
                        style={{
                            color: theme.colors.text.secondary,
                            fontFamily: theme.typography.fontFamily.body,
                        }}
                    >
                        <li>Enter your project details in the form above</li>
                        <li>Click "Generate QR Code" to create your custom QR code</li>
                        <li>A printable page will open in a new tab</li>
                        <li>Save as PDF or print directly from your browser</li>
                    </ol>
                </Card>
            </div>
        </>
    )
}

export default Home
