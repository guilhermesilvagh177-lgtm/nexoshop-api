# Nexo Shop API — base segura para publicação

Esta é apenas uma API inicial para testar a hospedagem. Ela **não processa pagamentos nem calcula frete**.

## Arquivos
- `server.js`: endpoints de saúde e catálogo de demonstração; checkout e frete ficam bloqueados intencionalmente.
- `.env.example`: exemplo de configuração, sem segredos.
- `.gitignore`: impede adicionar `.env` e `node_modules`.

## Antes de vender
1. Revisar nomes, preços e catálogo com o responsável pela loja.
2. Integrar a API oficial do Melhor Envio, com OAuth, cotação real, validação de CEP/dimensões e tratamento de erros.
3. Integrar InfinitePay conforme documentação atual, criando cobranças no servidor e validando a confirmação/autenticidade do pagamento.
4. Guardar pedidos em banco de dados; não usar memória do processo como registro de vendas.
5. Atualizar o frontend para chamar a API e tratar erros.
6. Testar pagamento aprovado, recusado, cancelado, reembolso e falha de frete.
7. Configurar `FRONTEND_URL` no serviço de hospedagem para a URL exata do site publicado.

## Publicação de teste
- Runtime: Node
- Build command: `npm install`
- Start command: `npm start`
- Environment: `FRONTEND_URL=https://SEU-USUARIO.github.io/nexoshop-site`

Não coloque senhas, tokens ou chaves de API no GitHub. Configure segredos somente no painel privado do serviço de hospedagem.
