const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const {operation} = require('../index')

const buildAccount = () => {

    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da sua conta!'
    }]).then(answers => {

        const accountName = answers.accountName

        if (!fs.existsSync('Contas')) {

            fs.mkdirSync('Contas')

        }

        if (fs.existsSync(`Contas/${accountName}.json`)) {

            console.log(chalk.bgRed.black('Conta Existente, Por favor digite outro nome...'))

            buildAccount()

        } else {

            fs.writeFileSync(`Contas/${accountName}.json`, '{"Saldo": 0}', function (err) {
                console.log(err)
            })

            console.log(chalk.bgGreen.black(`Bem-Vindo ${accountName}, sua conta foi criada com Sucesso!!!`))

            operation()

        }


    }).catch(err => {
        console.log(`Erroooooo : ${err}`);
    })
}

module.exports = {buildAccount}