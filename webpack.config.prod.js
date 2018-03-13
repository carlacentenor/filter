const { resolve } = require('path');

// Importamos webpack
const webpack = require('webpack');
// Importamos los plugins que habiamos instalado y los declaramos
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    context:  resolve(__dirname, 'src'),
    entry: './index.js', // archivo de entrada
    output: { // archivos de salida
      filename: 'app.min.js', // archivo de salida
      path: resolve(__dirname, 'public'), // ruta donde va a estar el archivo
      publicPath: ''
    },
    module: {
        rules: [
          {
            test: /\.js$/, // todos los `js`
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader', // ignoramos archivos dentro de node_modules
              options: {
                // Config babel
                presets: [ 
                  'env',
                  'react', // Babel preestablecido para todos los complementos de React
                  'react-boilerplate'
                ]
              }
            }
          },
          {
            test: /\.css$/, // todos los archivos `css`
            exclude: /node_modules/,
            use: [
              { loader: 'style-loader' }, // Se creará un tag 'style
              { loader: 'css-loader' } // Le injetamos el 'css'
            ]
          }
        ]
      },
      plugins: [
        // concatena los modulos importados
        //  cocatena todos los plugins en uno solo y los ejecuta, antes se ejecutaba cada uno y no era óptimo
        new webpack.optimize.ModuleConcatenationPlugin(),
        // inyecta el codigo dentro del `index.html`
        //  Genera el html que se mostrará
        new HtmlWebpackPlugin({
          template: resolve(__dirname, 'public', 'index.html'),
          filename: 'index.html',
        }),
        // optimizacion 1
        new webpack.optimize.OccurrenceOrderPlugin(),
        // Migrar webpack 1 a webpack 2, para algunos loaders que no soportan  versiones actuales
        new webpack.LoaderOptionsPlugin({ // lee las diferencias aquí: https://webpack.js.org/guides/migrating/
          minimize: true, 
          debug: false
        }),
        // Minifica el JS
        new webpack.optimize.UglifyJsPlugin({
          beautify: false
        }),
        // definimos variable global de entorno de producción. Se para cargar configuraciones separadas de desarrollo y producción
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
      ]
}

