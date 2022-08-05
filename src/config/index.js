const env = process.env;

const variables = {
  API: {
    LIVE_SERVER: env.REACT_APP_LIVE_SERVER_API,
    STORAGE: env.REACT_APP_STORAGE_API,
  },
};

export default variables;
