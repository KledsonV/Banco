const chalk = require('chalk')
const {buildAccount} = require('./buildAccount')

const createAccount = (callback) => {
    console.log(chalk.bgGreen.black('Obrigado por estar ao nosso lado <3'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'));

    buildAccount(callback)
}

module.exports = {createAccount}