import { useState } from 'react';
import { UPDATE_PROJECT } from '../mutations/projectMutation'
import { GET_PROJECT } from '../queries/projectQueries'
import { useMutation, useQuery } from '@apollo/client'

export const EditProjectForm = ({project, show, setShow} : {project: any, show: boolean, setShow:()=>void}) => {

    const [ formInput, setFormInput ] = useState({
            projectName: project.name,
            description: project.description,
            status: project.status
        })

    const [ updateProject ] = useMutation(UPDATE_PROJECT, {
        variables: {
            id: project.id,
            name: formInput.projectName,
            description: formInput.description,
            status: formInput.status 
        },
        refetchQueries: [{
            query: GET_PROJECT,
            variables: {
                id: project.id
            }
        }]
    })

  
    const handleChange = (e:React.ChangeEvent<any>) => {
        let val = e.target.value
        let inputName = e.target.name
        setFormInput(prev => ({...prev, [inputName]: val}))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!formInput.projectName || !formInput.description || !formInput.status){
            alert('Please fill in all fields')
            return
        }
        console.log(formInput)
        updateProject({
            variables: {
                id: project.id,
                name: formInput.projectName,
                description: formInput.description,
                status: formInput.status 
            }
        });

        setShow()
    }


    return (
        <div style={{display: show ? 'block' : 'none'}}>
            <div className="mt-5 shadow p-5">
                <h3>Update Project</h3>
                <form onSubmit={onSubmit}>
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
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
            </div>
        </div>
    )
}