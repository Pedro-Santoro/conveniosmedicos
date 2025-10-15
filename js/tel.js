function formatarTelefone(input) {
  // 1. Remove tudo que não for dígito
  let valor = input.value.replace(/\D/g, "");

  // 2. Limita o tamanho máximo para 11 (Celular)
  if (valor.length > 11) {
    valor = valor.substring(0, 11);
  }

  // 3. Aplica o formato completo (Celular com 11 dígitos)
  if (valor.length === 11) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  // 4. Aplica o formato completo (Fixo com 10 dígitos)
  else if (valor.length === 10) {
    valor = valor.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }

  // 5. Formatação Intermediária (Quando o usuário ainda está digitando)

  // Se não for o tamanho final (10 ou 11) nem o início (<= 2)
  else if (valor.length > 2) {
    // Aplica o formato de Fixo/Intermediário (XX) XXXX-XXX...
    if (valor.length > 6) {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{1,4})$/, "($1) $2-$3");
    }

    // Aplica o formato de Celular Intermediário (XX) XXXXX-XX...
    else if (valor.length > 7 && valor.charAt(2) === "9") {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{1,4})$/, "($1) $2-$3");
    }

    // Apenas o DDD: (XX) XXX...
    else {
      valor = valor.replace(/^(\d{2})/, "($1) ");
    }
  }

  // 6. Atribui o valor formatado de volta ao input
  input.value = valor;
}
