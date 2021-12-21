const chalk = require('chalk')

const exit = () => {
    console.log(chalk.bgCyan.black('Obrigado por usar o nosso sistema bancário!!!'));
    process.exit()
}

module.exports = {exit}