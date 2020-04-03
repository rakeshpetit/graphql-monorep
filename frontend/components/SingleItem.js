import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
  item(where: {id: $id }) {
    id
    title
    description
    largeImage
  }
}
`
export class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                
                {({ error, loading, data  }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>{error.message}</p>
                    return (<p>Single Item {this.props.id}</p>)
                }}
            </Query>
        )
    }
}

export default SingleItem
