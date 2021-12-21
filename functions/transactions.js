const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

// Depositar Valor //

const deposit = (callback) => {


    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }])
        .then(answers => {

            const accountName = answers.accountName

            if (!fs.existsSync(`Contas/${accountName}.json`)) {
                console.log(chalk.red(`Essa conta não existe!`));
                callback()

            } else {

                inquirer.prompt([{
                    name: 'valor',
                    message: 'Qual o valor do seu deposito?'
                }]).then(answers => {

                    const amount = answers['valor']

                    if (!amount) {
                        console.log(chalk.bgRed.black(`Ocorreu um erro, Tente mais tarde!`))
                        callback()

                    } else {

                        addValor(accountName, amount)

                        callback()
                    }

                }).catch(err => console.log(`Erro: ${err}`))

            }

        })
        .catch(err => console.log(`Erro: ${err}`))
}

// Adicionar Valor //

function addValor(accountName, amount) {

    const accountData = getAccount(accountName)


    accountData.Saldo = parseFloat(amount) + parseFloat(accountData.Saldo)

    fs.writeFileSync(`Contas/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(`Erro: ${err}`);
    })

    console.log(chalk.bgGreen.black(`Foi adicionado á sua conta o valor de, R$${amount}`))

}

// Consultar Saldo //

const consultBalance = (callback) => {

    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }])
        .then(answers => {

            const accountName = answers.accountName

            if (!fs.existsSync(`Contas/${accountName}.json`)) {
                console.log(chalk.bgRed.black('Essa conta que você informou não existe, Tente outra!'))
                consultBalance()
            }

            const accountData = getAccount(accountName)

            console.log(chalk.bgCyan.black(`O saldo da sua conta é R$${accountData.Saldo}`));
            callback()

        })
        .catch(err => {
            console.log(`Erro: ${err}`)
        })
}

// Sacar Dinheiro //

const withdraw = (callback) => {

    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da conta em que deseja fazer o saque?'
    }])
        .then(answers => {

            const accountName = answers.accountName

            if (!fs.existsSync(`Contas/${accountName}.json`)) {

                console.log(chalk.bgRed.black('Conta inexistente, tente outra!'))

                return withdraw()
            }

            inquirer.prompt([{
                name: 'amount',
                message: 'Qual o valor que deseja sacar?'
            }])
                .then(answers => {

                    const accountData = getAccount(accountName)

                    if (!answers.amount) {
                        console.log((chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')))
                        return callback()
                    }

                    if (accountData.Saldo < answers.amount) {
                        console.log(chalk.bgRed.black('Valor indisponivel.'))
                        return withdraw()
                    }

                    accountData.Saldo = parseFloat(accountData.Saldo) - parseFloat(answers.amount)

                    fs.writeFileSync(`Contas/${accountName}.json`,
                        JSON.stringify(accountData),
                        function (err) {
                            console.log(err);
                        })

                    console.log(chalk.bgGreen.black(`Foi realizado um saque de R$${answers.amount} da sua conta bancaria!`));
                    return callback()

                })
                .catch(err => {
                    console.log(`Erro: ${err}`);
                })

        })
        .catch(err => {
            console.log(`Erro: ${err}`);
        })


}


// Pegar Conta //

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`Contas/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}


module.exports = { consultBalance, deposit, withdraw }