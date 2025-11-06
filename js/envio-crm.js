document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-popup");
  const origemInput = document.getElementById("origem_site");

  if (!form || !origemInput) return;

  const hostname = window.location.hostname;
  const url = window.location.href;
  let redirectUrl;

  origemInput.value = hostname;

  // Define o redirecionamento conforme o domínio
  redirectUrl =
    url.includes("convenios.planosdesaudephs.com.br") ? "https://convenios.planosdesaudephs.com.br/sucesso.html" :
    url.includes("empresa.planosdesaudephs.com.br") ? "https://empresa.planosdesaudephs.com.br/obrigado.html" :
    url.includes("saude.planosdesaudephs.com.br") ? "https://saude.planosdesaudephs.com.br/obrigado.html" :
    url.includes("clinicas.planosdesaudephs.com.br") ? "https://clinicas.planosdesaudephs.com.br/obrigado.html" :
    url.includes("planosdesaudephs.com.br") ? "https://planosdesaudephs.com.br/obrigado.html" :
    "https://planosdesaudephs.com.br/";

  // Cria uma mensagem visual
  const msg = document.createElement("div");
  msg.id = "mensagem-envio";
  msg.textContent = "Enviando seus dados...";
  msg.style.position = "fixed";
  msg.style.top = "0";
  msg.style.left = "0";
  msg.style.width = "100%";
  msg.style.background = "#0d6efd";
  msg.style.color = "#fff";
  msg.style.textAlign = "center";
  msg.style.padding = "10px";
  msg.style.fontSize = "16px";
  msg.style.zIndex = "9999";
  msg.style.display = "none";
  document.body.appendChild(msg);

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    msg.style.display = "block";
    msg.textContent = "Enviando seus dados...";

    const dados = new FormData(form);

    try {
      const resposta = await fetch("https://crm.planosdesaudebrj.com.br/recebe_leads.php", {
        method: "POST",
        body: dados
      });

      const texto = (await resposta.text()).trim();
      console.log("Status do CRM:", resposta.status);
      console.log("Texto de resposta:", texto);

      // ⚙️ Aqui está a mudança importante:
      if (resposta.ok || texto.toLowerCase().includes("ok")) {
        msg.textContent = "Cadastro enviado com sucesso! Redirecionando...";
      } else {
        msg.textContent = "Envio concluído, mas resposta inesperada. Redirecionando...";
      }

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);
    } catch (erro) {
      console.error("Erro no envio para o CRM:", erro);
      msg.textContent = "Erro no envio, redirecionando...";
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1200);
    }
  });
});
