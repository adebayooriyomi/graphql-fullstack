import {useState} from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutation'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQueries'
import { ADD_PROJECT } from '../mutations/projectMutation'

export const AddProjectModal = () => {
    const [ formInput, setFormInput ] = useState({
        projectName: '',
        description: '',
        clientId: '',
        status: 'new'
    })

    const [ addProject ] = useMutation(ADD_PROJECT,{
        variables: { 
            name: formInput.projectName,
            description: formInput.description,
            clientId: formInput.clientId, 
            status: formInput.status
        },
        update(cache, { data: { addProject }}){
            const { projects } = cache.readQuery<any>({ query: GET_PROJECTS })
            cache.writeQuery( {
                query: GET_PROJECTS,
                data: { projects: projects.concat([addProject])}
            })
        }
    })

    // Get Clients 
    const { loading, error, data } = useQuery(GET_CLIENTS);


    const handleChange = (e:React.ChangeEvent<any>) => {
        let val = e.target.value
        let inputName = e.target.name
        setFormInput(prev => ({...prev, [inputName]: val}))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(formInput.projectName === "" || formInput.description === "" || formInput.clientId === '' || formInput.status === ""){
            alert('Please fill in all fields')
            return
        }

        addProject({
            variables: {
                name: formInput.projectName,
                description: formInput.description,
                clientId: formInput.clientId,
                status: formInput.status
            }
        });
        setFormInput({projectName:'', description: '', clientId: '', status: '' })
    }

    return (
        <div>    
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                <span className="icon"><FaList /></span>
                <span>Add New Project</span>
            </button>
            <div className="modal fade" id="addProjectModal" tabIndex={-1} aria-labelledby="addProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addProjectModalLabel">New Project</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="modal-body">
                    
                        <div className="col-md-4 w-100 mb-2">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name="projectName" value={formInput.projectName} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 w-100 mb-2">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" name="description" value={formInput.description} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 w-100 mb-2">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" name="status" value={formInput.status} onChange={handleChange}>
                                <option value="new">Not Started</option>
                                <option value="progress">In Progress</option>
                                <option value="complete">Completed</option>
                            </select>
                        </div>
                        <div className="col-md-4 w-100 mb-2">
                            <label htmlFor="client" className="form-label">Client</label>
                           <select className="form-select" name="clientId" value={formInput.clientId} onChange={handleChange}>
                                <option value="">Select Client</option>
                                {data && data.clients.map((client: any)=> 
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                )}
                           </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}