import { Link } from 'react-router-dom'
import { FaExclamation } from 'react-icons/fa'


export const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 vh-100">
            <FaExclamation className="text-danger" size="10em" />
            <h1>404 - Page Not Found</h1>
            <p className="lead">Sorry, this page does not exist</p>
            <Link to='/' className="btn btn-primary">Go Back</Link>
        </div>
    )
}