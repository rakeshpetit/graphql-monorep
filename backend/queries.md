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

mutation createDog{
  createDog(name: "Boo boo") {
    name
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

query getAllDogs{
  dogs {
    name
  }
}