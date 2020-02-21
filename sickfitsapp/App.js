/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';
import {ApolloProvider, Query} from 'react-apollo';
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

// export const AppContext = React.createContext({data: {pokemon: null}});

const App = () => {
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

// export class App {
//   static async getInitialProps({Component, ctx}) {
//     let pageProps = {};
//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }
//     pageProps.query = ctx.query;
//     return {pageProps};
//   }
//   render() {
//     const {Component, apollo, pageProps} = this.props;
//     return (
//       <>
//         <ApolloProvider client={apollo}>
//           <Component {...pageProps} />
//         </ApolloProvider>
//       </>
//     );
//   }
// }

export default App;
