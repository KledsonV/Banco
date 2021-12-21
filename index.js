//Externo
const inquirer = require('inquirer')
const chalk = require('chalk')

//interno
const fs = require('fs')

//Funções
const {createAccount} = require('./functions/createAccount')
const {deposit} = require('./functions/deposit')
const {exit} = require('./functions/exit')

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
            
        } else if (action === 'Sacar') {
            
        } else if (action === 'Sair') {
            exit()
        }
        
    }).catch(err => {
        console.log(`Erro: ${err}`)
    })
}
module.exports = {operation}
operation()

