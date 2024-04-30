

export const ProjectCard = ({ project }: {project: any}) => {
    return (
        <div className="col-md-4">
            <a className="card mb-3 text-decoration-none shadow-sm" href={`/projects/${project.id}`}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{project.name}</h5>
                    </div>
                    <p className="small">Status: <b>{project.status}</b></p>
                </div>
                
            </a>
        </div>
    )
}