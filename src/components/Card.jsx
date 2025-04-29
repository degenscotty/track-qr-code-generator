import PropTypes from "prop-types"

const Card = ({ children, className = "" }) => {
    return (
        <div
            className={`bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg border border-gray-100 ${className}`}
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
