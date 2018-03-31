// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

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

    babel({
      exclude: 'node_modules/**',
    }),

    commonjs({
      include: 'node_modules/**',
      extensions: ['.js'],
    })
  ]
}))
