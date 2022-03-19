const path = require("path");

module.exports = {
  components: 'src/components/**/index.tsx',
  styleguideComponents: {
    Wrapper: `${__dirname}/src/debug/Wrapper`
  },
  serverPort: parseInt(process.env.PORT || 8080),
}