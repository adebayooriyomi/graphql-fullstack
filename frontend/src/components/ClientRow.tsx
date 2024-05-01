import { BsFillTrash3Fill } from "react-icons/bs";
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutation'
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export const ClientRow = ({ client }: {client: any}) => {
    
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id},
        refetchQueries: [{ query: GET_CLIENTS }, {query: GET_PROJECTS}]
       
    })

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={()=>deleteClient()}>
                    <BsFillTrash3Fill />
                </button>
            </td>
        </tr>
    )
}