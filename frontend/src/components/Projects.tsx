import { Spinner } from './Spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { ProjectCard } from './ProjectCard'

export const Projects = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS)
    console.log(data)

    if(loading) return <Spinner />
    if(error) return <p>Something Went Wrong</p>

    return(
        <div>
            {data.projects.length > 0 ? (
                <div className="row mt-4">
                    {data.projects.map((project: any) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : ( <p>No Project</p> )}
        </div>
    )
}