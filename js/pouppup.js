// --- Estrutura Segura para o popup.js ---

var modal = document.getElementById("meuModal");

if (modal) {
  var btn = document.getElementById("abrir-modal");
  var span = document.getElementsByClassName("fechar-modal")[0];

  if (btn) {
    btn.onclick = function () {
      modal.style.display = "block";
    };
  }

  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // 🔸 Cria um cookie diferente por página (index/sobre)
  const pageName = window.location.pathname.includes("sobre") ? "sobre" : "index";
  const cookieName = "popupShown_" + pageName;

  const hasShownPopup = getCookie(cookieName);

  if (!hasShownPopup) {
    document.addEventListener("mouseout", function (e) {
      if (
        e.clientY < 5 &&
        e.relatedTarget == null &&
        e.target.tagName !== "SELECT" &&
        e.target.tagName !== "OPTION"
      ) {
        modal.style.display = "block";
        setCookie(cookieName, "true", 1);
      }
    });

    setTimeout(function () {
      if (modal.style.display !== "block") {
        modal.style.display = "block";
        setCookie(cookieName, "true", 1);
      }
    }, 10000);
  }
}

// --- Funções auxiliares para cookie ---
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  const cname = name + "=";
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}
