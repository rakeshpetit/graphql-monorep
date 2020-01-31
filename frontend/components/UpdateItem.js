import React, { Component } from 'react'
import Form from './styles/Form'
import Error from './ErrorMessage'
import Router from 'next/router'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'

const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
  item(where:{ id: $id}) {
    id
    title
    description
    price
  }
}
`

const UPDATE_ITEM_MUTATION = gql`
mutation UPDATE_ITEM_MUTATION(
    $id: ID!,
    $title: String
    $description: String
    $price: Int
) {
    updateItem(
        id: $id,
        title: $title
        description: $description
        price: $price
    ) {
        id
        title
        description
        price
    }
}
`
export default class UpdateItem extends Component {
    state = {}
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val })
    }
    uploadFile = async e => {
        console.log('Uploading file...')
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'sickfits')
        const res = await fetch('https://api.cloudinary.com/v1_1/dcrbjmmo4/image/upload', {
            method: 'POST',
            body: data
        })
        const file = await res.json()
        console.log('file', file)
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        })
    }
    updateItem = async (e, updateItemMutation) => {
        e.preventDefault()
        const res = await updateItemMutation({
            variables: {
                id: this.props.id,
                ...this.state
            }
        });
        console.log(res)
        // Router.push({
        //     pathname: '/item',
        //     query: { id: res.data.createItem.id }
        // })
    }

    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
                {({ data, loading }) => {
                    if (loading) return <p>Loading...</p>
                    if (!data.item) return <p>No item found for id {this.props.id}</p>
                    return (
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                            {(updateItem, { loading, error }) => (<Form onSubmit={e => this.updateItem(e, updateItem)}>
                                <Error error={error} />
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <label htmlFor="title">
                                        Title
                    <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            placeholder="Title"
                                            defaultValue={data.item.title}
                                            onChange={this.handleChange}
                                            required />
                                    </label>
                                    <label htmlFor="price">
                                        Price
                    <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            placeholder="Price"
                                            defaultValue={data.item.price}
                                            onChange={this.handleChange}
                                            required />
                                    </label>
                                    <label htmlFor="description">
                                        Description
                    <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            placeholder="Ente a description"
                                            defaultValue={data.item.description}
                                            onChange={this.handleChange}
                                            required />
                                    </label>
                                    <button type="submit">Save Changes</button>
                                </fieldset>
                            </Form>
                            )}
                        </Mutation>)
                }}
            </Query>
        )
    }
}

export { UPDATE_ITEM_MUTATION }