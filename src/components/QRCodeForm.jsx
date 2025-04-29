import { useState } from "react"
import PropTypes from "prop-types"

const QRCodeForm = ({ onGenerateQR }) => {
    const [projectName, setProjectName] = useState("")
    const [projectLink, setProjectLink] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [isFormValid, setIsFormValid] = useState(true)
    const [errors, setErrors] = useState({})

    const validateUrl = (url) => {
        try {
            const parsedUrl = new URL(url)
            return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"
        } catch (e) {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}

        if (!projectName) {
            newErrors.projectName = "Project name is required"
        }

        if (!projectLink) {
            newErrors.projectLink = "Project URL is required"
        } else if (!validateUrl(projectLink)) {
            newErrors.projectLink = "Please enter a valid URL (including http:// or https://)"
        }

        if (!projectDescription) {
            newErrors.projectDescription = "Project description is required"
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            setIsFormValid(true)
            onGenerateQR({ projectName, projectLink, projectDescription })
        } else {
            setIsFormValid(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
                <label
                    htmlFor="projectName"
                    className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2"
                >
                    Project Name
                </label>
                <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className={`w-full px-4 py-2 md:py-3 border ${
                        errors.projectName ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base`}
                    aria-required="true"
                />
                {errors.projectName && (
                    <p className="mt-1 text-sm md:text-base text-red-500" role="alert">
                        {errors.projectName}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="projectLink"
                    className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2"
                >
                    Project Website URL
                </label>
                <input
                    type="url"
                    id="projectLink"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="https://example.com"
                    className={`w-full px-4 py-2 md:py-3 border ${
                        errors.projectLink ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base`}
                    aria-required="true"
                />
                {errors.projectLink && (
                    <p className="mt-1 text-sm md:text-base text-red-500" role="alert">
                        {errors.projectLink}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="projectDescription"
                    className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2"
                >
                    Project Description
                </label>
                <textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your project"
                    rows="4"
                    className={`w-full px-4 py-2 md:py-3 border ${
                        errors.projectDescription ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base`}
                    aria-required="true"
                />
                {errors.projectDescription && (
                    <p className="mt-1 text-sm md:text-base text-red-500" role="alert">
                        {errors.projectDescription}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-3 md:py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium md:text-lg rounded-md shadow transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2 md:mt-4"
                aria-label="Generate QR code"
            >
                Generate QR Code
            </button>
        </form>
    )
}

QRCodeForm.propTypes = {
    onGenerateQR: PropTypes.func.isRequired,
}

export default QRCodeForm
