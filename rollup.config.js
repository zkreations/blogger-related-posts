import { babel } from '@rollup/plugin-babel'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'umd',
    name: 'RelatedPosts'
  },
  plugins: [
    babel({
      babelHelpers: 'bundled'
    })
  ]
}
