import { FaEnvelope, FaIdBadge, FaPhone } from 'react-icons/fa'


export const ClientInfo = ({ client }: {client: any}) => {
    return(
        <div className="mb-3">
            <h5 className="mt-5">Client Information</h5>
            <ul className="list-group">
                <li className="list-group-item">
                    <FaIdBadge className="icon" />
                    {client.name}
                </li>
                <li className="list-group-item">
                    <FaEnvelope className="icon" />
                    {client.email}
                </li>
                <li className="list-group-item">
                    <FaPhone className="icon" />
                    {client.phone}
                </li>
            </ul>
        </div>
    )
}