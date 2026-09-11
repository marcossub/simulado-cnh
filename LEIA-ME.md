# Meu Amor — Simulados CNH

Para Pâmela, com amor Marcos,

Site estático, em português, feito para estudar com carinho. Não é uma prova oficial do DETRAN.

## Perfil, revisão e bilhetinhos — nova atualização

Abra **Meu perfil ♡**, no topo do site, para acompanhar Pâmela:

- Resumo de provas concluídas, acertos, erros e questões em branco.
- Desempenho de cada módulo e indicação daquele com menor proporção de acertos. Módulos sem respostas ficam identificados como sem dados.
- Gráfico das últimas 12 provas, com identificação do módulo ou geral e da versão.
- Histórico com data, tipo de tentativa, acertos, erros, questões em branco e acesso à correção completa.
- Revisões de erros aparecem no histórico, mas não entram no cálculo do desempenho dos simulados. Isso evita inflar a evolução com perguntas já revisadas.
- Bilhetinhos românticos de Marcos, desbloqueados pela primeira prova, uma prova sem erros, quatro versões de um grupo, revisão de todas as pendências e conclusão das 20 provas. Cada conquista tem um bilhete único, guardado no perfil.

### Revisar só os erros

Questões erradas e em branco entram nas pendências. Cada rodada contém até 15 questões e dura 15 minutos. Ao acertar, a questão sai das pendências; se errar novamente, ela permanece. Quando há mais de 15 pendências, as perguntas já tentadas vão ao fim da fila, permitindo revisar as demais. As imagens de placas continuam aparecendo e cada resultado mantém o gabarito explicado.

### Salvar e retomar

Respostas, ordem das alternativas e posição são salvas automaticamente. Use **Salvar e voltar ao início** ou **Meu perfil** para sair da tela da prova sem perder a tentativa. Ao retornar, use **Continuar de onde parei**.

O prazo original continua contando mesmo com a página fechada. Se ele já tiver acabado, o site entrega a prova e mostra a correção ao ser aberto. Uma prova salva deve ser concluída antes de começar outra, para evitar perder respostas. Histórico e conquistas são registrados apenas uma vez por tentativa.

O perfil continua compatível com a hospedagem estática no GitHub Pages: os dados ficam neste navegador e dispositivo, sem cadastro ou servidor. Não há sincronização entre celular e computador. Limpar os dados do site pode apagar o perfil. Quando o navegador impedir o salvamento, o site mostra um aviso e permite continuar na página aberta.

O histórico detalhado começa a partir desta atualização. As marcas de conclusão antigas são preservadas, mas resultados de tentativas anteriores não podem ser reconstruídos porque não eram armazenados.

## Banco de questões preservado

- 60 questões em cada um dos quatro módulos: quatro provas fixas de 15 questões, com 15 minutos por prova.
- 120 questões no simulado geral: quatro provas fixas de 30 questões, com 60 minutos por prova.
- 360 perguntas no total e 20 provas disponíveis no menu.
- As quatro versões de um mesmo grupo não repetem perguntas entre si. Os temas se complementam entre os módulos e o geral.
- Perguntas e alternativas são embaralhadas ao iniciar, preservando o gabarito.
- As questões de reconhecimento de placas continuam com imagens, inclusive na correção.
- Ao finalizar, cada erro e cada questão em branco mostram resposta correta e explicação. As questões acertadas também podem ser revisadas.
- Cada resultado contém uma mensagem motivacional com assinatura de Marcos.
- A entrega acontece automaticamente ao terminar o prazo, inclusive ao voltar de outra aba depois do prazo.
- O menu marca as provas concluídas no navegador, quando o armazenamento está disponível. O botão de novas perguntas sugere uma versão ainda não concluída.
- Ao completar as quatro versões, o site informa a conclusão; refazer uma versão é uma escolha explícita para revisar as mesmas perguntas.
- Removidos os botões de leitura e os arquivos PDF. O site funciona sem eles.

## Atualizar seu GitHub Pages

1. Extraia este ZIP no computador.
2. Entre na pasta `site-pah` extraída. Os arquivos `index.html`, `app.js`, `questions.js` e `style.css` devem ficar juntos.
3. No repositório que já publica o seu site, substitua esses quatro arquivos e atualize a pasta `assets` com todas as imagens deste pacote. Preserve a estrutura de pastas.
4. Se o repositório antigo ainda tiver os quatro PDFs em `assets`, pode removê-los: esta versão não usa esses arquivos.
5. Faça o commit e espere a publicação do GitHub Pages terminar.
6. Abra o endereço do site e atualize a página. Se ainda aparecer a versão anterior, use Ctrl+F5 no computador ou recarregue sem cache.

Envie os arquivos extraídos, não o ZIP. O `index.html` deve continuar no diretório configurado como origem do GitHub Pages. Nenhuma nova hospedagem ou dependência é necessária. Este pacote não altera seu repositório automaticamente.

## Abrir e editar no VS Code

Use **Arquivo → Abrir Pasta** e escolha `site-pah`.

- `index.html`: estrutura inicial, título da aba e carregamento dos arquivos.
- `style.css`: cores, tipografia, cartões e aparência romântica.
- `app.js`: menu, perfil, histórico, retomada, revisão dos erros, quatro versões, cronômetros, correção e bilhetinhos.
- `questions.js`: banco completo de perguntas, alternativas, gabaritos, imagens e referências, formatado para edição.
- `assets`: imagens das placas extraídas do material enviado.

O HTML inicial é curto porque o JavaScript monta as telas dentro de `<div id="app"></div>`.

Para experimentar localmente, abra `index.html` no navegador. Também é possível usar um servidor estático de sua preferência. Não há instalação, etapa de compilação nem backend.

## Estrutura de cada questão

`module`: módulo de origem (1 a 4).
`version`: prova fixa (1 a 4).
`question`: enunciado.
`options`: quatro alternativas.
`correct`: índice da alternativa correta, começando em zero.
`explanation`: explicação exibida na correção.
`image`: nome do PNG em `assets`, sem a extensão; vazio quando não se aplica.
`source`: identificação da referência, com endereço público quando disponível.

Para editar uma pergunta, mantenha quatro alternativas diferentes e o índice correto correspondente. Não altere a distribuição de 15/30 por versão sem adaptar o app.

## Referências

Questões autorais elaboradas para estudo com base nos quatro módulos enviados:

1. Placas, Cores e Caminhos.
2. Escolhas e Consequências.
3. Na Direção da Segurança.
4. Cuidar, Agir e Preservar.

Consultas complementares em fontes oficiais:

- [Código de Trânsito Brasileiro, texto compilado](https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm): regras de circulação, infrações, pontuação e penalidades. Os itens com regras legais específicas identificam o artigo correspondente.
- [Polícia Rodoviária Federal: cuidados no período chuvoso](https://www.gov.br/prf/pt-br/noticias_anteriores/noticias-2020/dezembro/prf-alerta-motoristas-sobre-cuidados-ao-dirigir-durante-periodo-chuvoso): prevenção e reação à aquaplanagem.
- [Ministério da Saúde: SAMU 192](https://www.gov.br/saude/pt-br/composicao/saes/samu-192): acionamento e informações ao atendimento de urgência.

As questões não são apresentadas como reprodução de banco oficial de exames. Os tempos são os solicitados para este treino e não representam regras de uma prova oficial.

## Progresso e limites

O progresso é guardado somente neste navegador e dispositivo. Ele não sincroniza entre celular e computador; pode desaparecer ao limpar os dados ou em navegação privada. Mesmo sem armazenamento, as quatro versões continuam disponíveis.

A tentativa é salva automaticamente quando o navegador permite. Fechar a página não pausa o cronômetro: a retomada respeita o prazo original. Começar outra prova exige concluir a que já está salva.

## Verificações realizadas

Conferidos os 360 enunciados, as contagens das 20 provas, a ausência de repetição entre versões do mesmo grupo, os caminhos das imagens e a preservação do gabarito após embaralhar. Verificada a lógica de correção para acertos, erros, questões em branco, entrega por tempo e conclusão das quatro versões, inclusive quando o armazenamento local está bloqueado.

Também foram verificadas a retomada com a mesma ordem de perguntas e alternativas, a entrega após expiração fora da página, a ausência de duplicação no histórico, a separação de revisões no cálculo do desempenho, a rotação de pendências e a liberação única dos bilhetes de conquista.
