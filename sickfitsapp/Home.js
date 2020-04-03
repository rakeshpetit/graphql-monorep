import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Items from './Items';
import {HomeStackContext} from './HomeStack';
import {createClient} from './utils';

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Home = ({navigation}) => {
  const [query, setQuery] = useState(null);
  const {setNavigation} = useContext(HomeStackContext);
  useEffect(() => {
    setQuery(ALL_ITEMS_QUERY);
    setNavigation(navigation);
  }, []);
  if (!query) {
    return null;
  }
  console.log('refreshed');
  const client = createClient();
  return (
    <ApolloProvider client={client}>
      <Query query={query}>
        {({data, error, loading}) => {
          if (loading || error) {
            return <ActivityIndicator size="large" color="#0000ff" />;
          }
          return (
            <View style={{flex: 1}}>
              <Items data={data} />
            </View>
          );
        }}
      </Query>
    </ApolloProvider>
  );
};

export default Home;
