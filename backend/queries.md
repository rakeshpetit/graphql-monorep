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

# Items
query getItem{
  item(where:{ id: "ck5igdls0fd3q0961cmuldltv"}) {
    title
  }
}

query getAllItems{
  items {
    title
  }
}

mutation createItem{
  createItem(title: "Title", description: "Desc", price: 10, image: "image", largeImage: "LargeImage") {
    id
    title
  }
}