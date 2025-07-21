// Adiciona um ouvinte de evento ao formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

  // Captura os valores digitados nos campos de usuário e senha
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  // Verifica se os dados estão corretos (simulação de login simples)
  if (user === "admin" && pass === "123") {
    // Armazena a informação de login na sessão do navegador
    sessionStorage.setItem("loggedIn", "true");

    // Redireciona para a tela principal do sistema
    window.location.href = "sistema.html";
  } else {
    // Exibe uma mensagem de erro caso o login falhe
    alert("Usuário ou senha incorretos!");
  }
});
