import React, { useState, useEffect } from 'react'
import { Image, View, ActivityIndicator, Text } from 'react-native'
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import { createClient } from './utils'
import { Item } from './Item'
import DeleteButton from './DeleteButton'

const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
  item(where:{ id: $id}) {
    title
    description
    image
  }
}
`
const DeleteItem = ({ deleteItemId }) => {
    console.log('deleteItemId', deleteItemId)
    const [query, setQuery] = useState(null);
    useEffect(() => {
        setQuery(SINGLE_ITEM_QUERY);
    }, []);
    if (!query) {
        return null;
    }
    const client = createClient();
    return (
        <ApolloProvider client={client}>
            <Query query={query} variables={{ id: deleteItemId }}>
                {({ data, error, loading }) => {
                    if (loading || error) {
                        return <ActivityIndicator size="large" color="#0000ff" />;
                    }
                    return (
                        data && data.item && <View style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ flex: 0, marginTop: 50, alignItems: 'center' }}>{data.item.title}</Text>
                            <Image style={{ 
                                marginTop: 10, height: 400, width: 300, flex: 0,
                                }} source={{ uri: data.item.image }} />
                            <Text style={{ flex: 0, alignItems: 'center' }}>{data.item.description}</Text>
                            <DeleteButton deleteItemId={deleteItemId}/>
                        </View>
                    );
                }}
            </Query>
        </ApolloProvider>
    )
}

export default DeleteItem
