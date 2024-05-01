import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner'
import { ClientInfo } from '../components/ClientInfo'
import { DeleteProjectButton } from '../components/DeleteProjectButton'
import { EditProjectForm } from '../components/EditProjectForm'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'

export const Project = () => {
    const [ show, setShow ] = useState<boolean>(false)
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_PROJECT, 
        { variables: { id } }
    )

    const handleShowEditForm = () => {
        setShow(!show)
    }

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong</p>

    return(
        <div>
            {!loading && !error && (
                <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-light btn-sm  d-inline ms-auto">
                        Back
                    </Link>
                    <h3>{data.project.name}</h3>
                    <p>{data.project.description}</p>
                    <h5>Project Status</h5>
                    <p>{data.project.status}</p>
                    <ClientInfo client={data.project.client} />

                    <EditProjectForm project={data.project} show={show} setShow={handleShowEditForm}/>
                    <hr/>
                    <div className="d-flex justify-content-between ms-auto w-100">
                        <button className="btn btn-info my-2" onClick={handleShowEditForm}>
                            Edit Project
                        </button>
                        <DeleteProjectButton projectId={data.project.id} />
                    </div>
                </div>
            )}
        </div>
    )
}