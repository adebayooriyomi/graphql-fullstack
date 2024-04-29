import './App.css';
import { Header } from './components/Header'
import { Clients } from './components/Clients'
import { Projects } from './components/Projects'
import { AddClientModal } from './components/AddClientModal'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming){
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming){
            return incoming;
          },
        }
      }
    }
  }
})

const link = createHttpLink({
  uri: "http://localhost:5000/graphql"
});

const client = new ApolloClient({
  cache: cache,
  link,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Projects />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
