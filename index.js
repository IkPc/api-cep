const cepField = document.getElementById('cep');
const rua = document.getElementById('street');
const numero = document.getElementById('number');
const bairro = document.getElementById('neighborhood');
const cidade = document.getElementById('city');
const estado = document.getElementById('state');

cepField.addEventListener('change', () => {
  let cepValue = cepField.value;
  console.log('CEP Value:', cepValue);

  if (/\d{5}-?\d{3}/.test(cepValue)) {
    getCep(cepValue);
  } else {
    alert("CEP inválido!");
  }
});

function getCep(cep) {
  console.log('Fetching data for CEP:', cep); 
  let url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url)
    .then(res => res.json())
    .then(cepInfo => {
      console.log('CEP Info:', cepInfo);
      if (cepInfo.erro) {
        alert("Erro ao buscar o CEP.");
      } else {
        rua.value = cepInfo.logradouro;
        bairro.value = cepInfo.bairro;
        cidade.value = cepInfo.localidade;
        estado.value = cepInfo.uf;
        numero.focus();
      }
    })
    .catch(error => {
      alert("Erro ao buscar o CEP.");
    });
}
