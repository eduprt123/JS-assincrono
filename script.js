// Forma utilizando promises:

// let consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
//     .then(response => response.json())
//     .then(response => {
//         if (response.error) {
//             throw Error('Esse cep não existe!')
//         } else
//             console.log(response)
//     })
//     .catch(error => console.log(error))
//     .finally(console.log('processamento concluido'));

/* Repare que cada then, vai enviar o resultado dele para o then seguinte, que por ultimo, caso exista
erro, sera capturado no catch. */


// Utilizando async  - await

async function consultaCEP(cep) {
    try {

        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existe')
        } else
            console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        console.log(erro);
    }
}

// consultaCEP();

// Utilzando promises.all para fazer varias requisições:
let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => consultaCEP(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));

// Repare que é criada uma função assincrona, que sera sua execução realizada como um codigo sincrono, graças ao
//await. Vale ressaltar que o await somente funciona com uma função assincrona.
// Para fazer a verificação de erro, utilizamos o async - await, e para checar os erros, utilizamos o try, catch,
//para capturar eventuais erros da requisição;