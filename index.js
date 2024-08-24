const form = document.forms['address'];
const cepField = form['cep'];
const rua = form['street'];
const bairro = form['neighborhood'];
const estado = form['state'];
const cidade = form['city'];
  
cepField.addEventListener('blur', () => {
    let cep = cepField.value
  
    if (/\d{5}-?\d{3}/.test(cep)) {
      loadCepInfo(cep)
    } else {
      showCepError()
    }
})

function getCep() {
    let cep = document.querySelector('#cep').value
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    let data = fetch(url)
        .then(res => res.json())
        /*.then(cepInfo => {
            
        })*/
        .catch(error => {
            showCepError()
            return {erro: true}
        })
        if(data.erro) {
            cleanAddressFields()
        } else {
            rua.value = data.logradouro
            bairro.value = data.bairro
            cidade.value = data.localidade
            estado.value = data.uf

            numberField.focus()
            cleanCepError()
        }
}
