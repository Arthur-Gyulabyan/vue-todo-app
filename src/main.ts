import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { Amplify } from 'aws-amplify';
import { setupApollo } from './configs/apollo.js';
import store from './store';
import './assets/main.css';
import App from './App.vue';

const config = {
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_AWS_APP_SYNC_URL,
      region: 'eu-north-1',
      defaultAuthMode: 'apiKey',
      apiKey: import.meta.env.VITE_AWS_APP_SYNC_API_KEY
    }
  }
};

Amplify.configure(config);

// const httpLink = new HttpLink({
//   uri: import.meta.env.VITE_AWS_APP_SYNC_URL,
//   headers: {
//     'x-api-key': import.meta.env.VITE_AWS_APP_SYNC_API_KEY
//   }
// });
//
// const link = ApolloLink.from([
//   createSubscriptionHandshakeLink(
//     {
//       url: import.meta.env.VITE_AWS_APP_SYNC_URL,
//       region: import.meta.env.VITE_AWS_REGION,
//       auth: {
//         type: 'API_KEY',
//         apiKey: import.meta.env.VITE_AWS_APP_SYNC_API_KEY
//       }
//     },
//     httpLink
//   )
// ]);
//
// const apolloClient = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// });

const vuetify = createVuetify({
  components,
  directives
});

const app = createApp(App);
setupApollo(app);

app.use(store).use(vuetify).mount('#app');
