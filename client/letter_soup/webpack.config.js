const webpack = require('webpack');

module.exports = {
  // Resto de la configuración de Webpack...
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL)
      }
    })
  ]
};