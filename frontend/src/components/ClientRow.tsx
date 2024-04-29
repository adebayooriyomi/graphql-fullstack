import { BsFillTrash3Fill } from "react-icons/bs";
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutation'
import { GET_CLIENTS } from "../queries/clientQueries";

export const ClientRow = ({ client }: {client: any}) => {
    
    const [ deleteClient ] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id},
        update(cache, { data: { deleteClient }}){
            const { clients } = cache.readQuery<any>({
                query: GET_CLIENTS
            })
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter((client: any) => client.id !== deleteClient.id )}
            })
        }
        //refetchQueries: [{ query: GET_CLIENTS }]
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