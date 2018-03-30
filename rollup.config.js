// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

const outputs = [
  { format: 'cjs', outputFolder: 'lib' },
  { format: 'es', outputFolder: 'es' },
  { format: 'umd', outputFolder: 'dist' },
];

module.exports = outputs.map(({ format, outputFolder }) => ({
  input: `src/index.js`,
  output: {
    name: 'reduxFun',
    format,
    file: `${outputFolder}/redux-fun.js`,
  },
  plugins: [
    nodeResolve({
      main: true,
      module: true,
      jsnext: true,
    }),

    commonjs({
      include: 'node_modules/**',
      extensions: ['.js'],
    })
  ]
}))
