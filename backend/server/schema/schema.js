//import { projects, clients } from '../sampleData.js'
import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLNonNull, GraphQLEnumType, GraphQLSchema } from 'graphql'
import Project from '../models/Project.js'
import Client from '../models/Client.js'


const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { 
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId)
            }
        }
    })
})

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: { 
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project: { 
            type: ProjectType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args){
                return Project.findById(args.id)
            }
        },
        clients: { 
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: { 
            type: ClientType,
            args: {id: {type: GraphQLID }},
            resolve(parent, args){
                return Client.findById(args.id)
            }
        }
    }
})

//Mutations 
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                email: { type: GraphQLNonNull(GraphQLString)},
                phone: { type: GraphQLNonNull(GraphQLString)}
            }, 
            resolve(parent, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                })

                return client.save()
            }
        },
        //Delete
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, args){
                try {
                    // Delete all projects associated with the client in one go
                    await Project.deleteMany({ clientId: args.id });
        
                    // Then delete the client
                    return await Client.findByIdAndDelete(args.id);
                } catch (error) {
                    console.error("Failed to delete client and its projects:", error);
                    throw new Error("Error deleting client and projects");
                }
            }
        },
        
        // Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                description: { type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({ 
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress' : { value: 'In Progress'},
                            'complete': { value: 'Completed'}
                        }
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                })

                return project.save()
            }
        },
        //Delete a Project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return Project.findByIdAndDelete(args.id)
            }
        },
        // Update a project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        }
                    })
                }
            },
            resolve(parent, args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        }
                    },
                    { new: true }
                )
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation
})

export default schema;