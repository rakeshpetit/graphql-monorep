import React, { Component } from 'react'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const CREATE_ITEM_MUTATION = gql`
mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String!
    $largeImage: String!
) {
    createItem(
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
    ) {
        id
    }
}
`
export default class CreateItem extends Component {
    state = {
        title: 'Cool shoes',
        description: 'Shoes that look cool',
        image: '',
        largeImage: '',
        price: 20,
    }
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
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (<Form onSubmit={async e => {
                    e.preventDefault()
                    const res = await createItem();
                    console.log(res)
                }}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                        <label htmlFor="file">
                            Image
                    <input
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Upload an image"
                                onChange={this.uploadFile}
                                required />
                            {this.state.image && <img src={this.state.image} alt="Upload preview" />}
                        </label>
                        <label htmlFor="title">
                            Title
                    <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                value={this.state.title}
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
                                value={this.state.price}
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
                                value={this.state.description}
                                onChange={this.handleChange}
                                required />
                        </label>
                        <button type="submit">Submit</button>
                    </fieldset>
                </Form>
                )}
            </Mutation>
        )
    }
}

export { CREATE_ITEM_MUTATION }