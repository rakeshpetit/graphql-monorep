import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './Home'
import { HomeStackContext } from './HomeStack'

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`

const DeleteButton = ({ deleteItemId }) => {
    const { navigation } = useContext(HomeStackContext)
    const update = (cache, { data: { item } }) => {
        navigation.navigate('Home')
    }
    return (
        <Mutation mutation={DELETE_ITEM_MUTATION} variables={{ id: deleteItemId }} update={update}
            refetchQueries={() => {
                // console.log("refetchQueries", product.id)
                return [{
                    query: ALL_ITEMS_QUERY,
                }];
            }}>
            {(deleteItem, { error }) => (
                <Button title="Delete" onPress={() => {
                    deleteItem()
                }} />
            )}
        </Mutation>
    )
}

export default DeleteButton
