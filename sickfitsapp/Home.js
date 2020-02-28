import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    SafeAreaView,
    Text,
    StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Config from 'react-native-config';
import Items from './Items';

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

export const HomeContext = React.createContext();


const createClient = () => {
    const endpoint = Config.END_POINT;
    const token = null;
    return new ApolloClient({
        uri: Config.ENV_NAME === 'development' ? endpoint : endpoint,
        request: operation => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include',
                },
                headers: {
                    authorization: token ? `Bearer ${token}` : '',
                },
            });
        },
    });
};


const Home = ({ navigation }) => {
    const [query, setQuery] = useState(null);
    useEffect(() => {
        console.log('useeff');
        const myQuery = ALL_ITEMS_QUERY;
        setQuery(myQuery);
    }, []);
    if (!query) {
        return null;
    }
    const client = createClient();
    return (
        <HomeContext.Provider value={{ navigation }}>
        <ApolloProvider client={client}>
            <Query query={query}>
                {({ data, error, loading }) => {
                    if (loading || error) {
                        return <ActivityIndicator size="large" color="#0000ff" />;
                    }
                    return (
                        <View style={{ flex: 1 }}>
                            <Items data={data} />
                        </View>
                    );
                }}
            </Query>
        </ApolloProvider>
        </HomeContext.Provider>
    );
};

export default Home;