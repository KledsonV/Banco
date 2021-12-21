const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const {operation} = require('../index')

const deposit = () => {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }])
    .then(answers => {
        
        const accountName = answers.accountName
        
        if (!fs.existsSync(`Contas/${accountName}.json`)) {
            console.log(chalk.red(`Essa conta não existe!`));
            deposit()

        } else {

            inquirer.prompt([{
                name: 'valor',
                message: 'Qual o valor do seu deposito?'
            }]).then(answers => {

                const amount = answers['valor']

                addValor(accountName, amount)

                operation()
                
            }).catch(err => console.log(`Erro: ${err}`))

        }

    })
    .catch(err => console.log(`Erro: ${err}`))
}

function addValor(accountName, amount){

    const accountData = getAccount(accountName)


        accountData.Saldo = parseFloat(amount) + parseFloat(accountData.Saldo)

        fs.writeFileSync(`Contas/${accountName}.json`, JSON.stringify(accountData), function(err) {
            console.log(`Erro: ${err}`);
        })

        console.log(chalk.green(`Foi adicionado á sua conta o valor de, R$${amount}`))


}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`Contas/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

module.exports = {deposit}