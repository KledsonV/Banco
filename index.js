//Externo
const inquirer = require('inquirer')
const chalk = require('chalk')

//interno
const fs = require('fs')

//Funções
const {createAccount} = require('./functions/createAccount')
const {deposit, withdraw} = require('./functions/D_C_S')
const {exit} = require('./functions/exit')
const {consultBalance} = require('./functions/D_C_S')


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
            createAccount()
        } else if (action === 'Depositar') {
            deposit()
        } else if (action === 'Consultar Saldo') {
            consultBalance()
        } else if (action === 'Sacar') {
            withdraw()
        } else if (action === 'Sair') {
            exit()
        }
        
    }).catch(err => {
        console.log(`Erro: ${err}`)
    })
}
operation()
module.exports = {operation}

