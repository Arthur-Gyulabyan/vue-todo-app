import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { Amplify } from 'aws-amplify';
import { setupApollo } from './configs/apollo';
import awsConfig from './configs/aws';
import store from './store';
import './assets/main.css';
import App from './App.vue';

Amplify.configure(awsConfig);

const vuetify = createVuetify({
  components,
  directives
});

const app = createApp(App);
setupApollo(app);

app.use(store).use(vuetify).mount('#app');
