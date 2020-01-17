# Write your query or mutation here
# Mutations
mutation {
  createUser(data: {
    name: "Rakesh"
    email: "rakesh@awesome.net"
  }){
    name
    email
  }
}

# Query
query {
    users(where: {
        name_contains: "rak"
    }) {
        id
        name
    }
}