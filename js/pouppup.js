// --- Estrutura Segura para o pouppup.js ---

// 1. Pega o elemento principal do modal
var modal = document.getElementById("meuModal");

// 2. Checa se o modal realmente existe nesta página
if (modal) {
  // SE O MODAL EXISTE, execute TODO o código

  // Pega os outros elementos APENAS se o modal existir
  var btn = document.getElementById("abrir-modal");
  var span = document.getElementsByClassName("fechar-modal")[0];

  // 2. Função para abrir o modal (se você usar o botão)
  if (btn) {
    btn.onclick = function () {
      modal.style.display = "block";
    };
  }

  // 3. Função para fechar o modal ao clicar no 'x'
  // *Adicionei uma checagem de 'span' aqui também para segurança*
  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }

  // 4. Função para fechar o modal ao clicar fora dele
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // 5. [OPCIONAL] O BLOCO DE CÓDIGO DO NOVO GATILHO DE SAÍDA (Tudo aqui dentro)
  // *Todo o restante do seu código (cookies, mouseout, setTimeout)
  // deve vir aqui dentro do 'if (modal) { ... }'*

  const hasShownPopup = getCookie("popupShown");

  if (!hasShownPopup) {
    // Lógica de Desktop (Monitora o mouse)
    document.addEventListener("mouseout", function (e) {
      if (
        e.clientY < 5 &&
        e.relatedTarget == null &&
        e.target.tagName !== "SELECT" &&
        e.target.tagName !== "OPTION"
      ) {
        modal.style.display = "block";
        setCookie("popupShown", "true", 1); // Mostra o pop-up e define o cookie por 1 dia
      }
    });

    // Lógica para Mobile/Fallback (Tempo)
    setTimeout(function () {
      if (modal.style.display !== "block") {
        modal.style.display = "block";
        setCookie("popupShown", "true", 1); // Define o cookie por 1 dia
      }
    }, 10000); // 10 segundos
  }
  // As funções de Cookie devem ser definidas antes de serem usadas.
}
// Fim do bloco if (modal)
// A checagem de `if (modal)` garante que o script falhará silenciosamente em páginas sem o pop-up,
// sem quebrar o código nas páginas que o pop-up existe.
