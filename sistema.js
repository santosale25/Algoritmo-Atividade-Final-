// Verifica se o usuário está logado; se não estiver, redireciona para a tela de login
if (sessionStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

// Classe que representa um item cadastrado
class Item {
  constructor(nome, descricao, categoria) {
    this.nome = nome;
    this.descricao = descricao;
    this.categoria = categoria;
  }
}

// Array que armazenará todos os itens cadastrados
let itens = [];

// Referências aos elementos do DOM
const form = document.getElementById("itemForm");
const inputNome = document.getElementById("itemName");
const inputDescricao = document.getElementById("itemDescription");
const inputCategoria = document.getElementById("itemCategory");
const lista = document.getElementById("itemList");
const inputBusca = document.getElementById("searchInput");

// Função chamada ao enviar o formulário para cadastrar um novo item
function cadastrarItem(event) {
  event.preventDefault(); // Evita o recarregamento da página

  // Coleta e limpa os valores dos campos
  const nome = inputNome.value.trim();
  const descricao = inputDescricao.value.trim();
  const categoria = inputCategoria.value.trim();

  // Verifica se todos os campos foram preenchidos
  if (!nome || !descricao || !categoria) {
    alert("Preencha todos os campos.");
    return;
  }

  // Cria um novo objeto da classe Item e o adiciona ao array
  const novoItem = new Item(nome, descricao, categoria);
  itens.push(novoItem);

  form.reset();           // Limpa o formulário
  exibirItens(itens);     // Atualiza a lista exibida na tela
}

// Função que exibe a lista de itens cadastrados
const exibirItens = (listaItens) => {
  lista.innerHTML = ""; // Limpa o conteúdo da lista anterior

  // Se a lista estiver vazia, exibe uma mensagem
  if (listaItens.length === 0) {
    lista.innerHTML = "<li>Nenhum item encontrado.</li>";
    return;
  }

  // Para cada item, cria um elemento <li> com a nova estrutura e botão de remover
  listaItens.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="item-info">
        <strong>${item.nome}</strong>
        <span>${item.descricao} - <em>${item.categoria}</em></span>
      </div>
      <button class="remove-btn" data-index="${index}">Remover</button>
    `;

    lista.appendChild(li); // Adiciona o item à lista na tela
  });

  // Adiciona um evento de clique para cada botão de "Remover"
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", removerItem);
  });
};

// Função que realiza a busca por nome ou categoria
function buscarItens() {
  const termo = inputBusca.value.trim().toLowerCase(); // Captura o termo digitado e normaliza

  // Se o campo estiver vazio, exibe todos os itens
  if (!termo) {
    exibirItens(itens);
    return;
  }

  // Filtra os itens com base no nome ou categoria
  const resultado = itens.filter((item) => {
  return (
    item.nome.toLowerCase().includes(termo) ||
    item.descricao.toLowerCase().includes(termo) ||
    item.categoria.toLowerCase().includes(termo)
  );
});

  // Exibe os resultados da busca
  exibirItens(resultado);
}

// Função que remove um item da lista
function removerItem(event) {
  const index = event.target.dataset.index; // Obtém o índice do item a ser removido
  if (index !== undefined) {
    itens.splice(index, 1);   // Remove o item do array
    exibirItens(itens);       // Atualiza a lista exibida
  }
}

// Adiciona os ouvintes de eventos
form.addEventListener("submit", cadastrarItem);    // Envio do formulário
inputBusca.addEventListener("input", buscarItens); // Busca em tempo real
