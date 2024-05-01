import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { DELETE_PROJECT } from '../mutations/projectMutation'

export const DeleteProjectButton = ({projectId} : { projectId: string}) => {
    
    const navigate = useNavigate()

    const [deleteProject] = useMutation(DELETE_PROJECT, { 
        variables: { id: projectId },
        onCompleted: () => navigate('/'),
        refetchQueries: [{query: GET_PROJECTS}]
    })
    
    return(
        <button className="btn btn-danger my-2" onClick={(e)=>deleteProject()}>
            <FaTrash className='icon' /> Delete Project
        </button>   
    )
}