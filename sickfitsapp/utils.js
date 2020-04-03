import Config from 'react-native-config';
import ApolloClient from 'apollo-boost';

export const createClient = () => {
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
