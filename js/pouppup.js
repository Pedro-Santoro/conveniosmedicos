    // 1. Pega os elementos
    var modal = document.getElementById("meuModal");
    var btn = document.getElementById("abrir-modal"); // O botão de abrir
    var span = document.getElementsByClassName("fechar-modal")[0]; // O 'x' de fechar

    // 2. Função para abrir o modal (se você usar o botão)
    if (btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    }

    // 3. Função para fechar o modal ao clicar no 'x'
    span.onclick = function() {
        modal.style.display = "none";
    }

    // 4. Função para fechar o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // 5. [OPCIONAL] Faça o modal aparecer automaticamente
    // Se quiser que ele abra 2 segundos após a página carregar, descomente o bloco abaixo:
    /*
    window.onload = function() {
        setTimeout(function() {
            modal.style.display = "block";
        }, 2000); // 2000 milissegundos = 2 segundos
    }
        */
    // 1. Pega os elementos (o resto do seu script)
    var modal = document.getElementById("meuModal");
    var btn = document.getElementById("abrir-modal"); 
    var span = document.getElementsByClassName("fechar-modal")[0]; 

    // ----------------------------------------------------
    // NOVO GATILHO DE SAÍDA (EXIT-INTENT)
    // ----------------------------------------------------
    
    // Função auxiliar para verificar/criar cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // A chave que usaremos para o cookie
    const hasShownPopup = getCookie('popupShown');

    if (!hasShownPopup) {
        // --- 1. Lógica para Desktop (Monitora o mouse) ---
        document.addEventListener('mouseout', function(e) {
            // Verifica se o movimento do mouse está saindo do topo da página
            // (e.clientY < 5 é um valor comum para detectar saída)
            if (e.clientY < 5 && e.relatedTarget == null && e.target.tagName !== 'SELECT' && e.target.tagName !== 'OPTION') {
                modal.style.display = "block";
                setCookie('popupShown', 'true', 1); // Mostra o pop-up e define o cookie por 1 dia
            }
        });

        // --- 2. Lógica para Mobile/Fallback (Tempo) ---
        // Para celulares, onde o 'mouseout' não funciona, 
        // disparamos o pop-up após 10 segundos, por exemplo, como alternativa de saída.
        setTimeout(function() {
            if (modal.style.display !== "block") { // Só abre se não estiver já aberto
                modal.style.display = "block";
                setCookie('popupShown', 'true', 1); // Define o cookie por 1 dia
            }
        }, 10000); // 10000 milissegundos = 10 segundos
    }