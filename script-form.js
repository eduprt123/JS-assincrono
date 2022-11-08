async function consultaCEP(cep) {
    try {

        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existe')
        } else
            console.log((consultaCEPConvertida));
        preencheOsDados(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        console.log(erro);
    }
}


function realizaConsultaPeloCep() {
    let cep = document.getElementById('cep');
    cep.addEventListener('focusout', () => consultaCEP(cep.value));
}

function preencheOsDados(consulta) {
    let cidade = document.getElementById('cidade');
    let logradouro = document.getElementById('endereco');
    let estado = document.getElementById('estado');
    let bairro = document.getElementById('bairro');

    cidade.value = consulta.localidade;
    logradouro.value = consulta.logradouro;
    estado.value = consulta.uf;

    bairro.value = consulta.bairro ? consulta.bairro : `${consulta.localidade} (cidade)`;
}

realizaConsultaPeloCep();