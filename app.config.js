import "dotenv/config";

const apiUrl = process.env.API_BASE_URL;

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      apiUrl: apiUrl,
    },
  };
};
