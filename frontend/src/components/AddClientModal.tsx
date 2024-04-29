import {useState} from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutation'
import { GET_CLIENTS } from '../queries/clientQueries'

export const AddClientModal = () => {
    const [ formInput, setFormInput ] = useState({
        clientName: '',
        email: '',
        phone: ''
    })

    const [ addClient ] = useMutation(ADD_CLIENT,{
        variables: { 
            name: formInput.clientName,
            email: formInput.email,
            phone: formInput.phone },
        update(cache, { data: { addClient }}){
            const { clients } = cache.readQuery<any>({ query: GET_CLIENTS })
            cache.writeQuery( {
                query: GET_CLIENTS,
                data: { clients: clients.concat([addClient])}
            })
        }
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        let inputName = e.target.name
        setFormInput(prev => ({...prev, [inputName]: val}))
        
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(formInput.clientName === "" || formInput.clientName === "" || formInput.phone === ''){
            alert('Please fill in all fields')
            return
        }

        addClient({
            variables: {
                name: formInput.clientName,
                email: formInput.email,
                phone: formInput.phone
            }
        });
        setFormInput({clientName:'', email: '', phone: ''})
    }

    return (
        <div>    
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <span className="icon"><FaUser /></span>
                <span>Add New Client</span>
            </button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="modal-body">
                    
                        <div className="col-md-4 w-100 mb-2">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name="clientName" value={formInput.clientName} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 w-100 mb-2">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={formInput.email} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 w-100 mb-2">
                            <label htmlFor="email" className="form-label">Phone</label>
                            <input type="number" className="form-control" name="phone" value={formInput.phone} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Submit</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}