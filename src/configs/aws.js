console.log(
  import.meta.env.VITE_AWS_APP_SYNC_URL,
  import.meta.env.VITE_AWS_REGION,
  import.meta.env.VITE_AWS_APP_SYNC_API_KEY
);

const config = {
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_AWS_APP_SYNC_URL,
      region: import.meta.env.VITE_AWS_REGION,
      defaultAuthMode: 'apiKey',
      apiKey: import.meta.env.VITE_AWS_APP_SYNC_API_KEY
    }
  }
};

export default config;
