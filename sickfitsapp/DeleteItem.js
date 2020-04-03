import React, {useState, useEffect} from 'react';
import {Image, View, ActivityIndicator, Text} from 'react-native';
import gql from 'graphql-tag';
import {ApolloProvider, Query} from 'react-apollo';
import {createClient} from './utils';
import {Item} from './Item';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: {id: $id}) {
      title
      description
      image
      price
    }
  }
`;
const DeleteItem = ({deleteItemId}) => {
  console.log('deleteItemId', deleteItemId);
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
      <Query query={query} variables={{id: deleteItemId}}>
        {({data, error, loading}) => {
          if (loading || error) {
            return <ActivityIndicator size="large" color="#0000ff" />;
          }
          return (
            data &&
            data.item && (
              <View style={{flex: 1, paddingVertical: 20}}>
                <View style={{flex: 2, alignItems: 'center'}}>
                  <Image
                    style={{
                      marginTop: 10,
                      marginBottom: 40,
                      height: 400,
                      width: 300,
                      flex: 0,
                    }}
                    source={{uri: data.item.image}}
                  />
                  <Text
                    style={{
                      flex: 0,
                      marginBottom: 10,
                      fontSize: 24,
                      fontWeight: 'bold',
                      alignItems: 'center',
                    }}>
                    {data.item.title}
                  </Text>
                  <Text
                    style={{
                      flex: 0,
                      marginBottom: 10,
                      fontSize: 16,
                      alignItems: 'center',
                    }}>
                    {data.item.description}
                  </Text>
                  <Text style={{flex: 0, fontSize: 18, alignItems: 'center'}}>
                    {'£' + data.item.price}
                  </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <UpdateButton deleteItemId={deleteItemId} />
                  <DeleteButton deleteItemId={deleteItemId} />
                </View>
              </View>
            )
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default DeleteItem;
