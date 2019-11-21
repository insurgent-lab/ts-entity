import glob from 'glob'
import Jasmine from 'jasmine'

const jasmine = new Jasmine()
jasmine.loadConfigFile('./jasmine.json');

// Load specs and run tests
glob('./dist/spec/*.spec.js', function (_err, files) {
  Promise.all(
      files.map(f => import(f)
        .catch(e => {
          console.error('** Error loading ' + f + ': ')
          console.error(e)
          process.exit(1)
        }))
    )
    .then(() => jasmine.execute())
})