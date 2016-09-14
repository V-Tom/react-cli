#!/usr/bin/env node


const fs = require('fs')
const path = require('path')

const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp')
const pkg = require('../package.json')

const applicationKey = 'React-cli'
const _exit = process.exit
process.exit = exit

/**
 * colorful logs
 * @param str
 * @returns {*}
 */

const log = (() => {
  const colors = ['magenta', 'default', 'cyan', 'blue', 'red']
  let command = {}
  colors
    .map(item => {
      if (item === 'default') {
        command.default = (str) => console.log(str)
      } else {
        command[item] = (str) => console.log(chalk[item](str))
      }
    })
  return command
})()

/**
 * program configure
 */
program
  .version(pkg.version)
  .description('A simple react factory command line interface application')
  .option('-d, --directory', 'The factory will generator in your specific folder')
  .usage('[options] name ')

/**
 * help wanted
 */
program
  .on('--help', function () {
    log.magenta('  Examples:')
    log.default(' ')
    log.blue('  1、Build a factory named `App`')
    log.cyan(`     ${applicationKey} App`)
    log.default(' ')
    log.blue('  2、Build a factory named `App` and in specific folder. like `./src` ')
    log.blue('      Note: specific folder `./src` will convent to Path.join(__dirname,\'./src\')')
    log.cyan(`     ${applicationKey} App -d ./src`)
  })
  .parse(process.argv)

/**
 * cli main interface
 */
if (!exit.exited) {
  main()
}


/**
 * the main interface
 */
function main() {

  var directoryPath = program.args.shift() || '.'
  var appName = path.basename(path.resolve(directoryPath))
  //https://github.com/expressjs/generator/blob/master/bin/express
  //https://github.com/tj/commander.js
  //https://github.com/sindresorhus/log-update
  //https://github.com/sindresorhus/meow

  emptyDirectory(path.join(__dirname, directoryPath), (empty) => {
    if (empty) {
      createApplication(appName, directoryPath)
    } else {
      confirm('directoryPath is not empty, continue? [y/N] ', function (ok) {
        process.stdin.destroy()
        createApplication(appName, directoryPath)
      })
    }
  })
}


/**
 * create application
 * @param appName
 * @param path
 */
function createApplication(appName, path) {

  function complete() {

  }

  mkdir(path, ()=> {

    //mkdir need direcotry
    mkdir(`${path}/src`, ()=> {

      //write reducer
      mkdir(`${path}/src/reducer`, ()=> {

      })
      //write acton
      mkdir(`${path}/src/action`, ()=> {

      })
      //write component
      mkdir(`${path}/src/component`, ()=> {

      })
      mkdir(`${path}/src/page`)
      mkdir(`${path}/src/externals`)
      mkdir(`${path}/src/config`)
      mkdir(`${path}/src/store`)
      mkdir(`${path}/src/appEntrance`)
      mkdir(`${path}/src/sylus`)

    })

  })
}

/**
 * Load template file.
 */

function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8')
}

/**
 * empty directory
 * @param path
 * @param fn
 */
function emptyDirectory(path, fn) {
  fs.access(path, fs.F_OK, function (err) {
    fn(Boolean(err))
  })
}


/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm(msg, callback) {
  inquirer.prompt([{
    type: 'confirm',
    message: msg,
    name: 'ok'
  }], function (answers) {
    answers.ok && callback()
  })
}

/**
 * Graceful exit for async STDIO
 */

function exit(code) {
  function done() {
    if (!(draining--)) _exit(code)
  }

  var draining = 0
  var streams = [process.stdout, process.stderr]

  exit.exited = true

  streams.forEach(function (stream) {
    // submit empty write request and wait for completion
    draining += 1
    stream.write('', done)
  })

  done()
}

/**
 *  Load template file sync.
 * @param name
 */

function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8')
}

/**
 * write file sync.
 * @param path
 * @param str
 * @param mode
 */

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0o0666 })
  log.blue(`write a new file in ${path}`)
}


/**
 * mkdir async with cb.
 * @param {String} path
 * @param {Function} fn
 */

function mkdir(path, fn) {
  mkdirp(path, 0o0755, function (err) {
    if (err) throw err
    log.blue(`crete a new directory in ${path}`)
    fn && fn()
  })
}
