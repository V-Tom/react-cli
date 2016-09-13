#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const program = require('commander')
const chalk = require('chalk')
const readline = require('readline')
const pkg = require('../package.json')

const applicationKey = 'React-cli'
const _exit = process.exit
process.exit = exit

/**
 * colorful logs
 * @param str
 * @returns {*}
 */

const log = (()=> {
  const colors = ['magenta', 'default', 'cyan', 'blue', 'red']
  let command = {}
  colors
    .map(item=> {
      if (item === 'default') {
        command.default = (str)=>console.log(str)
      } else {
        command[item] = (str)=>console.log(chalk[item](str))
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
    log.blue('  1、Build a factory named App')
    log.cyan(`     ${applicationKey} App`)
    log.default(' ')
    log.blue('  2、Build a factory named App and in specific folder. like ./src ')
    log.blue('      Note: specific folder ./src will convent to Path.join(__dirname,\'./src\')')
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

  emptyDirectory(path.join(__dirname, directoryPath), (empty)=> {
    if (empty) {
      createApplication(appName, directoryPath)
    } else {
      confirm('directoryPath is not empty, continue? [y/N] ', function (ok) {
        if (ok) {
          process.stdin.destroy()
          createApplication(appName, directoryPath)
        } else {
          log.red('user aborting')
          exit(1)
        }
      })
    }
  })
}


/**
 * create application
 * @param appName
 * @param directoryPath
 */
function createApplication(appName, directoryPath) {
  log.default(appName + directoryPath)
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
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(msg, function (input) {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input));
  });
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