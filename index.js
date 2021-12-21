//Externo
const inquirer = require('inquirer')
const chalk = require('chalk')

//interno
const fs = require('fs')

//Funções
const {createAccount} = require('./functions/createAccount')
const {deposit, withdraw} = require('./functions/transactions')
const {exit} = require('./functions/exit')
const {consultBalance} = require('./functions/transactions')


const operation = () => {
    
    
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Qual o seu proximo passo?',
        choices: [
            'Criar Conta',
            'Depositar',
            'Consultar Saldo',
            'Sacar',
            'Sair'
        ]
    }]).then(answers => {
        
        const action = answers['action']
        
        if (action === 'Criar Conta') {
            createAccount(operation)
        } else if (action === 'Depositar') {
            deposit(operation)
        } else if (action === 'Consultar Saldo') {
            consultBalance(operation)
        } else if (action === 'Sacar') {
            withdraw(operation)
        } else if (action === 'Sair') {
            exit()
        }
        
    }).catch(err => {
        console.log(`Erro: ${err}`)
    })
}
operation()
module.exports = {operation}

