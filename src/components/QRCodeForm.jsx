import { useState } from "react"
import PropTypes from "prop-types"
import { useTheme } from "../context/ThemeContext"

const QRCodeForm = ({ onGenerateQR }) => {
    const theme = useTheme()
    const [projectName, setProjectName] = useState("")
    const [projectLink, setProjectLink] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [isFormValid, setIsFormValid] = useState(true)
    const [errors, setErrors] = useState({})

    const validateUrl = (url) => {
        // If URL doesn't start with http:// or https://, add https://
        let urlToCheck = url
        if (!url.match(/^https?:\/\//i)) {
            urlToCheck = `https://${url}`
        }

        try {
            const parsedUrl = new URL(urlToCheck)
            return {
                isValid: true,
                url: urlToCheck,
            }
        } catch (e) {
            return {
                isValid: false,
                url: urlToCheck,
            }
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
        } else {
            const { isValid, url } = validateUrl(projectLink)
            if (!isValid) {
                newErrors.projectLink = "Please enter a valid URL"
            } else {
                // Update the projectLink with the properly formatted URL
                setProjectLink(url)
            }
        }

        if (!projectDescription) {
            newErrors.projectDescription = "Project description is required"
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            setIsFormValid(true)
            // Use the formatted URL when submitting
            const { url } = validateUrl(projectLink)
            onGenerateQR({
                projectName,
                projectLink: url,
                projectDescription,
            })
        } else {
            setIsFormValid(false)
        }
    }

    // Get component styles from theme
    const inputStyles = (fieldName) => theme.components.qrCodeForm.input(theme, errors[fieldName])
    const labelStyles = theme.components.qrCodeForm.label(theme)
    const errorStyles = theme.components.qrCodeForm.error(theme)
    const buttonStyles = theme.components.qrCodeForm.button(theme)

    // Create a style element to inject CSS for hover/focus states
    const createStyleElement = () => {
        return <style>{theme.components.qrCodeForm.formControlCss(theme)}</style>
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {createStyleElement()}
            <div>
                <label htmlFor="projectName" style={labelStyles}>
                    Project Name
                </label>
                <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    style={inputStyles("projectName")}
                    className="form-control"
                    aria-required="true"
                />
                {errors.projectName && (
                    <p style={errorStyles} role="alert">
                        {errors.projectName}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="projectLink" style={labelStyles}>
                    Project Website URL
                </label>
                <input
                    type="text"
                    id="projectLink"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="Enter URL (e.g., google.com)"
                    style={inputStyles("projectLink")}
                    className="form-control"
                    aria-required="true"
                />
                {errors.projectLink && (
                    <p style={errorStyles} role="alert">
                        {errors.projectLink}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="projectDescription" style={labelStyles}>
                    Project Description
                </label>
                <textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your project"
                    rows="4"
                    style={inputStyles("projectDescription")}
                    className="form-control"
                    aria-required="true"
                />
                {errors.projectDescription && (
                    <p style={errorStyles} role="alert">
                        {errors.projectDescription}
                    </p>
                )}
            </div>

            <button
                type="submit"
                style={buttonStyles}
                aria-label="Generate QR code"
                className="hover:bg-white hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mt-2 md:mt-4"
            >
                GENERATE A QR CODE
            </button>
        </form>
    )
}

QRCodeForm.propTypes = {
    onGenerateQR: PropTypes.func.isRequired,
}

export default QRCodeForm
