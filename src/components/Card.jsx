import PropTypes from "prop-types"
import { useTheme } from "../context/ThemeContext"

const Card = ({ children, className = "" }) => {
    const theme = useTheme()

    return (
        <div
            className={`p-6 md:p-8 lg:p-10 rounded-lg shadow-lg backdrop-blur-sm ${className}`}
            style={{
                backgroundColor: `${theme.colors.cardBg}ee`,
                borderColor: theme.colors.border,
                borderWidth: "1px",
                borderStyle: "solid",
            }}
        >
            {children}
        </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default Card
