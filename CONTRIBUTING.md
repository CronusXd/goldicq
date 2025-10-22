# Guia de Contribuição

Obrigado por considerar contribuir para o projeto GoldICQ! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Código de Conduta

### Nossos Compromissos

- Ser respeitoso e inclusivo
- Aceitar críticas construtivas
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros

## 🚀 Como Contribuir

### Reportando Bugs

Antes de criar um relatório de bug, verifique se o problema já não foi reportado. Se você encontrar um bug:

1. **Use o template de issue** para bugs
2. **Descreva o problema** claramente
3. **Passos para reproduzir** o bug
4. **Comportamento esperado** vs **comportamento atual**
5. **Screenshots** se aplicável
6. **Ambiente** (navegador, SO, versão)

### Sugerindo Melhorias

Para sugerir melhorias:

1. **Verifique** se a sugestão já não existe
2. **Descreva** a melhoria detalhadamente
3. **Explique** por que seria útil
4. **Forneça exemplos** se possível

### Pull Requests

1. **Fork** o repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. **Abra** um Pull Request

#### Diretrizes para Pull Requests

- Mantenha o código limpo e bem documentado
- Siga os padrões de código existentes
- Teste suas mudanças antes de submeter
- Atualize a documentação se necessário
- Descreva claramente o que foi alterado

## 💻 Padrões de Código

### HTML
```html
<!-- Use indentação de 2 espaços -->
<div class="container">
  <h1>Título</h1>
  <p>Parágrafo</p>
</div>
```

### CSS
```css
/* Use indentação de 2 espaços */
.classe {
  property: value;
  another-property: value;
}
```

### JavaScript
```javascript
// Use indentação de 2 espaços
function minhaFuncao() {
  const variavel = 'valor';
  return variavel;
}
```

### ASP/VBScript
```vbscript
' Use indentação de 2 espaços
Function MinhaFuncao()
  Dim variavel
  variavel = "valor"
  MinhaFuncao = variavel
End Function
```

## 📝 Mensagens de Commit

Use mensagens de commit claras e descritivas:

- `feat: adiciona nova funcionalidade`
- `fix: corrige bug na página de checkout`
- `docs: atualiza documentação do README`
- `style: formata código CSS`
- `refactor: refatora função de validação`
- `test: adiciona testes para carrinho`
- `chore: atualiza dependências`

## 🔍 Processo de Review

1. Pelo menos um revisor deve aprovar o PR
2. Todos os testes devem passar
3. O código deve seguir os padrões estabelecidos
4. A documentação deve estar atualizada

## 🧪 Testes

Antes de submeter um PR:

- [ ] Teste em múltiplos navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Teste em dispositivos móveis
- [ ] Verifique a responsividade
- [ ] Teste todas as funcionalidades afetadas
- [ ] Verifique se não há erros no console

## 📚 Documentação

Ao adicionar novas funcionalidades:

- Atualize o README.md
- Adicione comentários no código
- Crie documentação técnica se necessário
- Atualize o changelog

## 🏷️ Versionamento

Seguimos o [Semantic Versioning](https://semver.org/):

- **MAJOR**: Mudanças incompatíveis na API
- **MINOR**: Novas funcionalidades compatíveis
- **PATCH**: Correções de bugs compatíveis

## 🤝 Comunidade

- Seja respeitoso e profissional
- Ajude outros contribuidores
- Compartilhe conhecimento
- Celebre sucessos

## 📞 Contato

Se tiver dúvidas sobre como contribuir:

- Abra uma issue com a tag `question`
- Entre em contato via email: dev@goldicq.com

## 🙏 Agradecimentos

Agradecemos a todos os contribuidores que ajudam a melhorar o GoldICQ!

---

**Nota**: Este guia pode ser atualizado periodicamente. Verifique sempre a versão mais recente antes de contribuir.
