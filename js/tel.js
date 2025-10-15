function formatarTelefone(input) {
  // 1. Remove tudo que não for dígito
  let valor = input.value.replace(/\D/g, "");

  // 2. Verifica a quantidade de dígitos para aplicar a máscara correta
  if (valor.length === 11) {
    // Máscara para celular com 9º dígito: (XX) XXXXX-XXXX
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (valor.length === 10) {
    // Máscara para telefone fixo ou celular antigo: (XX) XXXX-XXXX
    valor = valor.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  } else if (valor.length > 11) {
    // Limita para não ter mais de 11 dígitos se for digitado rápido
    valor = valor.substring(0, 11);
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (valor.length > 2) {
    // Adiciona o DDD enquanto digita
    valor = valor.replace(/^(\d{2})/, "($1) ");
  }

  // 3. Atribui o valor formatado de volta ao input
  input.value = valor;
}
