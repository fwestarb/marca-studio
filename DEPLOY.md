# Publicação — 17/10/2026

- Site: https://fwestarb.github.io/marca-studio/
- Código: https://github.com/fwestarb/marca-studio
- GitHub Pages: branch main, pasta /docs.
- Sete testes automatizados aprovados, mais build de produção e revisão visual.
- Conferência pública em Edge: HTTP 200, edição refletida na prévia, ficha com animação product-enter, download real de ZIP contendo 20 arquivos e as animações solicitadas. Nenhum erro JavaScript nem resposta HTTP de erro nesse percurso.
- Editor e prévia em 390 × 844 sem transbordamento horizontal.
- Fontes, imagens e scripts servidos pelo próprio site. Arquivos exportados também testados offline na suíte.
- Evidências: verification/live-result.json, live-desktop.png e live-mobile.png.

A publicação não acrescenta vendas, pagamentos ou pedidos. Esses recursos não fazem parte desta versão.


## Atualização do formato do download

O ZIP agora inclui uma pasta superior com o nome do site. Todos os recursos e o arquivo abrir-no-vscode.code-workspace ficam dentro dela. Extraia e abra essa pasta no VS Code, ou abra o arquivo de workspace. O download contém um arquivo adicional de workspace em relação à verificação inicial acima. As duas suítes, com sete testes cada, foram executadas novamente e aprovadas, incluindo extração da nova pasta e visualização offline.
