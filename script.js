/* var consultaCep = fetch("https://viacep.com.br/ws/01001000/json/")
   .then(resposta => resposta.json())
   .then(r => {
      if(r.erro) {
         throw Error("Esse cep não existe")
      } else {
         console.log(r)
      }
   })
   .catch(erro => console.log(erro))
   .finally(mensagem => console.log("Processamento concluído!")); */

async function buscaEndereco(cep) {
   var mensagemErro = document.getElementById("erro");
   mensagemErro.innerHTML = "";

   try {
      var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      var consultaCepConvertida = await consultaCep.json();
      var rua = document.getElementById("endereco");
      var cidade = document.getElementById("cidade");
      var bairro = document.getElementById("bairro")
      var estado = document.getElementById("estado");

      rua.value = consultaCepConvertida.logradouro;
      cidade.value = consultaCepConvertida.localidade;
      bairro.value = consultaCepConvertida.bairro;
      estado.value =  consultaCepConvertida.uf

      if (consultaCepConvertida.erro) {
         throw Error("CEP não existente!");
      }

      console.log(consultaCepConvertida);
      return consultaCepConvertida;

   } catch (erro) {
      mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
      console.log(erro)
   }
}

/* let ceps = ["01001000","01001001"];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas)); */

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));