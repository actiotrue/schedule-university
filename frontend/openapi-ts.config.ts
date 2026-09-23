export default {
  input: 'http://localhost:8000/openapi.json',
  output: 'src/client',
  plugins: [
    '@hey-api/client-axios',
    {
      name: '@tanstack/react-query',
      queryKeys: {
        tags: true,
      },
    },
  ],
};
