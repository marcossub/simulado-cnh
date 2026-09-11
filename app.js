(() => {
'use strict';
const modules=[
 {title:'Placas, Cores e Caminhos',description:'Entenda os sinais que vão guiar você.',topic:'Sinalização'},
 {title:'Escolhas e Consequências',description:'Conheça as regras e o peso de cada decisão.',topic:'Legislação'},
 {title:'Na Direção da Segurança',description:'Antecipe riscos e pratique escolhas seguras.',topic:'Direção defensiva'},
 {title:'Cuidar, Agir e Preservar',description:'Cuide de você, do veículo e do nosso mundo.',topic:'Cuidados e prevenção'}
];
const app=document.getElementById('app');
let session=null,interval=null;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;};
const progressKey = 'meu-amor-cnh-v2-progress';
let completed = {};
try {
  const saved = JSON.parse(localStorage.getItem(progressKey) || '{}');
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) completed = saved;
} catch (_) { /* O estudo funciona mesmo sem armazenamento disponível. */ }
function done(mode, version) { return completed[`${mode}:${version}`] === true; }
function markCompleted() {
  completed[`${session.mode}:${session.version}`] = true;
  try { localStorage.setItem(progressKey, JSON.stringify(completed)); } catch (_) {}
}
function nextVersion() { return [1, 2, 3, 4].find(v => !done(session.mode, v)); }
function versionButtons(mode) {
  return `<div class="version-buttons">${[1,2,3,4].map(v => `<button class="btn secondary version-button ${done(mode,v)?'completed':''}" data-action="start" data-mode="${mode}" data-version="${v}" aria-label="${mode==='final'?'Simulado geral':'Módulo '+mode}, prova ${v}${done(mode,v)?', concluída; refazer':''}"><span>Prova ${v}</span><small>${done(mode,v)?'✓ Concluída · refazer':'Começar →'}</small></button>`).join('')}</div>`;
}
const motivations = [
  'Meu Amor, cada questão estudada é um passo na direção do seu sonho. Eu acredito em você. Continue!',
  'Meu Amor, um erro hoje pode virar um acerto amanhã. Respira, revisa com carinho e segue: estou torcendo por você!',
  'Meu Amor, sua dedicação está construindo essa conquista. Tenha orgulho do caminho e continue estudando!',
  'Meu Amor, uma pausa também faz parte do aprendizado. Descanse, volte com calma e siga em frente. Você tem minha torcida!'
];
const fmt=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
function header(){return `<header class="top"><button class="brand" data-action="home" aria-label="Voltar ao início"><span class="brand-symbol" aria-hidden="true">♡</span><span class="brand-name">Para Pâmela, <small>com amor Marcos,</small></span></button><span class="topnote">Sua próxima conquista começa aqui ♡</span></header>`;}
function footer(){return `<footer class="footer"><span>Feito com carinho, para acompanhar cada conquista sua. <span class="heart">♥</span></span><span>Material de estudo independente · Não é uma prova oficial do DETRAN.</span></footer>`;}
function focusHeading(){const h=app.querySelector('h1,h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}window.scrollTo({top:0,behavior:'instant'});}
function home() {
  clearInterval(interval);
  session = null;
  app.innerHTML = `<div class="shell">${header()}<main>
    <div class="intro"><div><div class="eyebrow">Um passo de cada vez, meu amor</div>
      <h1>Meu Amor, a próxima conquista é sua.</h1>
      <p class="muted">Quatro provas diferentes por módulo. Escolha uma e dê mais um passo rumo à sua CNH.</p></div>
      <div class="love-note">“Eu acredito em você.<br>E vou torcer por você em cada caminho.” <span aria-hidden="true">♡</span></div>
    </div>
    <div class="layout"><section aria-labelledby="modules-title">
      <div class="section-label"><h2 id="modules-title">Seu cantinho de estudos</h2><span>240 questões · 4 módulos</span></div>
      <div class="modules">${modules.map((m,i)=>`<article class="module">
        <div class="module-top"><span class="module-num">0${i+1}</span><span class="small muted">${m.topic}</span></div>
        <h3>${m.title}</h3><p>${m.description}</p>
        <div class="meta"><span>15 questões por prova</span><span>◷ 15 minutos</span></div>
        <p class="version-note">60 questões divididas em 4 provas sem repetição.</p>
        ${versionButtons(String(i+1))}
      </article>`).join('')}</div>
    </section><aside><section class="final-card"><div class="eyebrow">Todos os caminhos se encontram</div>
      <h2>Seu simulado<br>geral.</h2><p>Os quatro módulos em cada prova. São 120 questões divididas em 4 provas diferentes.</p>
      <div class="final-stats"><div><strong>30</strong><small>questões por prova</small></div><div><strong>60</strong><small>minutos</small></div></div>
      ${versionButtons('final')}
    </section><div class="aside-note"><p><strong>Errar também faz parte de aprender.</strong></p>
      <p>No final, confira a resposta correta e a explicação de cada questão.</p>
      <p>O tempo começa ao iniciar. A entrega é automática quando ele acabar.</p>
      <p>A marca de conclusão fica neste navegador, quando o armazenamento está disponível. Escolha uma prova ainda não concluída para estudar novas perguntas.</p>
    </div></aside></div>
    <details><summary>Sobre as questões e as referências</summary>
      <p>360 questões autorais: 60 em cada módulo e 120 no geral. Cada grupo tem quatro versões fixas, sem repetir perguntas entre suas versões. Os temas se complementam entre os módulos e o geral. A ordem das perguntas e das alternativas muda a cada tentativa.</p>
      <p>Conteúdo baseado nos quatro módulos do curso enviado, no Código de Trânsito Brasileiro e em orientações oficiais. As imagens das placas foram extraídas do curso e continuam nas perguntas e na correção.</p>
      <p>Os tempos de 15 e 60 minutos são deste treino. O resultado não equivale à aprovação no exame oficial. Fechar ou atualizar a página perde a tentativa em andamento.</p>
      <p>Referências: <a href="https://www.planalto.gov.br/ccivil_03/leis/l9503compilado.htm" target="_blank" rel="noopener">Código de Trânsito Brasileiro</a>, <a href="https://www.gov.br/prf/pt-br/noticias_anteriores/noticias-2020/dezembro/prf-alerta-motoristas-sobre-cuidados-ao-dirigir-durante-periodo-chuvoso" target="_blank" rel="noopener">PRF — direção na chuva</a> e <a href="https://www.gov.br/saude/pt-br/composicao/saes/samu-192" target="_blank" rel="noopener">Ministério da Saúde — SAMU 192</a>.</p>
    </details>
  </main>${footer()}</div>`;
}
function start(mode, version = 1){clearInterval(interval);const isFinal=mode==='final';const source=isFinal?window.QUESTION_BANK.final:window.QUESTION_BANK.modules.filter(q=>q.module===Number(mode));const chosen=source.filter(q=>q.version===version);if(![1,2,3,4].includes(version)||chosen.length!==(isFinal?30:15))throw new Error('Versão de prova inválida.');const questions=shuffle(chosen).map(q=>{const order=shuffle(q.options.map((text,i)=>({text,correct:i===q.correct})));return {...q,options:order.map(o=>o.text),correct:order.findIndex(o=>o.correct)};});const seconds=isFinal?3600:900;session={mode,version,questions,answers:Array(questions.length).fill(null),index:0,started:Date.now(),deadline:Date.now()+seconds*1000,duration:seconds,finished:false};renderQuestion();interval=setInterval(tick,250);focusHeading();}
function sign(q){if(!q.image)return '';const compact=!['servicos','destinos','turismo'].includes(q.image);return `<figure class="sign-box"><img class="${compact?'compact':''}" src="assets/${q.image}.png" alt="${imageAlt[q.image]||'Placa de trânsito apresentada na questão'}" width="${compact?180:400}" height="${compact?180:220}"></figure>`;}
const imageAlt={pare:'Placa vermelha octogonal com a palavra PARE',preferencia:'Placa triangular invertida, branca com borda vermelha',estacionar:'Placa circular com letra E cortada por uma faixa diagonal vermelha',parar:'Placa circular com letra E cortada por duas faixas vermelhas em X',sentido:'Placa circular com seta para cima cortada por faixa vermelha',velocidade:'Placa circular com borda vermelha e número 80 km/h',curva:'Placa amarela em losango com seta em ângulo para a direita',lombada:'Placa amarela com elevação arredondada no centro da base',escola:'Placa amarela com figuras de escolares sobre marcas de travessia',obras:'Placa alaranjada com pessoa usando uma ferramenta no solo',escorregadia:'Placa amarela com carro e marcas sinuosas atrás dos pneus',servicos:'Placa azul com símbolos de abastecimento, oficina, alimentação e estacionamento, a 500 metros',destinos:'Placa verde: Vassouras 5 km, Paraíba do Sul 57 km, Três Rios 64 km',turismo:'Placa marrom com setas, símbolos e nomes: Véu de Noiva, Mirante, Parque Cidade e Lagoa Azul'};
Object.assign(imageAlt, {
  "a1a": "Losango amarelo com seta preta em ângulo para a esquerda",
  "a2a": "Losango amarelo com seta curva para a esquerda",
  "a2b": "Losango amarelo com seta curva para a direita",
  "a3a": "Losango amarelo com seta sinuosa iniciada para a esquerda",
  "a3b": "Losango amarelo com seta sinuosa iniciada para a direita",
  "a4a": "Losango amarelo com seta em S acentuado para a esquerda",
  "a4b": "Losango amarelo com seta em S acentuado para a direita",
  "a5a": "Losango amarelo com seta em S para a esquerda",
  "a5b": "Losango amarelo com seta em S para a direita",
  "a6": "Losango amarelo com cruz preta",
  "a7a": "Losango amarelo com ramo horizontal à esquerda da linha vertical",
  "a7b": "Losango amarelo com ramo horizontal à direita da linha vertical",
  "a8": "Losango amarelo com símbolo preto em T",
  "a9": "Losango amarelo com símbolo preto em Y",
  "a10a": "Losango amarelo com ramo oblíquo à esquerda",
  "a10b": "Losango amarelo com ramo oblíquo à direita",
  "a11a": "Losango amarelo com linha vertical e dois ramos alternados em lados opostos",
  "a11b": "Losango amarelo com dois ramos laterais alternados em posições diferentes",
  "a12": "Losango amarelo com três setas circulares",
  "a13a": "Losango amarelo com linha oblíqua convergindo pela esquerda",
  "a13b": "Losango amarelo com linha oblíqua convergindo pela direita",
  "a14": "Losango amarelo com três luzes: vermelha, amarela e verde",
  "a15": "Losango amarelo com a palavra PARE",
  "a45": "Losango amarelo com as palavras RUA SEM SAÍDA",
  "a17": "Losango amarelo com três elevações na base",
  "a19": "Losango amarelo com rebaixamento arredondado na base",
  "a20a": "Losango amarelo com carro sobre rampa inclinada, voltado para baixo",
  "a20b": "Losango amarelo com carro sobre rampa inclinada, voltado para cima",
  "a21a": "Losango amarelo com duas bordas convergindo ao subir no desenho",
  "a21b": "Losango amarelo com borda esquerda avançando para o centro na parte superior",
  "a21c": "Losango amarelo com borda direita avançando para o centro na parte superior",
  "a21d": "Losango amarelo com borda esquerda afastando-se do centro na parte superior",
  "a21e": "Losango amarelo com borda direita afastando-se do centro na parte superior",
  "a23": "Losango amarelo com duas partes de ponte elevadas sobre ondas",
  "a25": "Losango amarelo com duas setas verticais em sentidos opostos",
  "a26a": "Retângulo amarelo com seta preta para a direita",
  "a26b": "Retângulo amarelo com seta preta de duas pontas opostas",
  "a27": "Losango amarelo com carro ao lado de pedras caindo de encosta",
  "a30a": "Losango amarelo com pessoa sobre uma bicicleta",
  "a32a": "Losango amarelo com figura de pessoa andando",
  "a32b": "Losango amarelo com pessoa sobre marcas de travessia",
  "a33a": "Losango amarelo com duas figuras de escolares",
  "a42a": "Losango amarelo com setas contornando um separador na parte superior",
  "a42b": "Losango amarelo com setas e separador na parte inferior",
  "a42c": "Losango amarelo com setas passando de cada lado de um separador central",
  "a43": "Losango amarelo com silhueta de avião",
  "a39": "Losango amarelo com desenho de trilhos",
  "a40": "Losango amarelo com desenho de barreira",
  "a41": "Peças amarelas cruzadas em X com contorno preto"
});
function title(){return (session.mode==='final'?'Simulado geral':modules[Number(session.mode)-1].title)+' · Prova '+session.version;}
function renderQuestion(){if(!session||session.finished)return;const {questions,answers,index}=session,q=questions[index],count=answers.filter(x=>x!==null).length;app.innerHTML=`<div class="shell">${header()}<main><div class="exam-head"><div><div class="eyebrow">${session.mode==='final'?'Os quatro módulos':`Módulo 0${session.mode}`}</div><h1>${title()}</h1><span class="small muted">Respira, meu amor. Uma questão de cada vez.</span></div><div class="timer" id="timer" role="timer" aria-label="Tempo restante"><span>Tempo restante</span><strong id="clock"></strong></div></div><div class="exam-layout"><section class="question-card" aria-labelledby="question-title"><div class="question-top"><span>Questão ${index+1} de ${questions.length}</span><span>${modules[q.module-1].topic}</span></div><progress max="${questions.length}" value="${count}" aria-label="Questões respondidas"></progress>${sign(q)}<h2 id="question-title">${escape(q.question)}</h2><fieldset class="choices"><legend class="sr-only">Escolha uma alternativa</legend>${q.options.map((o,i)=>`<label class="choice"><input type="radio" name="answer" value="${i}" ${answers[index]===i?'checked':''}><span class="choice-letter">${'ABCD'[i]}</span><span>${escape(o)}</span></label>`).join('')}</fieldset><div class="question-nav"><button class="btn secondary" data-action="prev" ${index===0?'disabled':''}>← Anterior</button>${index<questions.length-1?'<button class="btn" data-action="next">Próxima →</button>':'<button class="btn" data-action="finish">Finalizar →</button>'}</div></section><aside class="navigator"><h3>Suas questões</h3><div class="number-grid">${questions.map((_,i)=>`<button class="${answers[i]!==null?'answered ':''}${i===index?'current':''}" data-action="jump" data-index="${i}" aria-label="Questão ${i+1}${answers[i]!==null?', respondida':', em branco'}" ${i===index?'aria-current="step"':''}>${i+1}</button>`).join('')}</div><div class="legend"><span id="answered-count">${count}</span> de ${questions.length} respondidas.<br>Rosa: respondida · Borda: atual</div><p class="small muted">Você pode voltar e alterar qualquer resposta antes de finalizar.</p><button class="btn" data-action="finish">Finalizar simulado</button><button class="text-btn" data-action="home">Sair do simulado</button></aside></div><div id="time-alert" class="sr-only" role="status"></div></main>${footer()}</div>`;tick();}
function tick(){if(!session||session.finished)return;const remaining=Math.max(0,Math.ceil((session.deadline-Date.now())/1000));const clock=document.getElementById('clock');if(clock)clock.textContent=fmt(remaining);document.getElementById('timer')?.classList.toggle('urgent',remaining<=60);if(remaining<=60&&!session.warned){session.warned=true;const alert=document.getElementById('time-alert');if(alert)alert.textContent='Falta um minuto. A prova será entregue automaticamente ao terminar o tempo.';}if(remaining<=0)finish(true);}
function ask(kind){if(!session||session.finished){home();return;}tick();if(session.finished)return;const blanks=session.answers.filter(x=>x===null).length;const finishing=kind==='finish';const dialog=document.createElement('dialog');dialog.innerHTML=`<h2>${finishing?'Pronta para conferir?':'Sair desta tentativa?'}</h2><p>${finishing?blanks?`Ainda há ${blanks} ${blanks===1?'questão em branco':'questões em branco'}. Elas serão contabilizadas como não respondidas, sem acerto.`:'Todas as questões estão respondidas. Ao entregar, você poderá ver o resultado e as explicações.':'As respostas desta tentativa serão perdidas. Você pode continuar e terminar com calma.'}</p><p class="small muted">O cronômetro continua enquanto esta janela está aberta.</p><div class="actions"><button class="btn secondary" data-cancel>Continuar</button><button class="btn" data-confirm>${finishing?'Entregar agora':'Sair'}</button></div>`;document.body.append(dialog);dialog.addEventListener('close',()=>dialog.remove());dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();dialog.querySelector('[data-confirm]').onclick=()=>{dialog.close();if(finishing)finish(false);else home();};dialog.showModal();}
function finish(timedOut){if(!session||session.finished)return;session.finished=true;session.timedOut=timedOut||Date.now()>=session.deadline;session.elapsed=Math.min(session.duration,Math.max(0,Math.floor((Date.now()-session.started)/1000)));clearInterval(interval);document.querySelectorAll('dialog').forEach(d=>d.close());markCompleted();renderResults();focusHeading();}
function sourceLabel(q) {
  const source = q.source || {label: `Curso enviado · módulo ${q.module}`};
  return source.url ? `<a class="small source" href="${escape(source.url)}" target="_blank" rel="noopener">Referência: ${escape(source.label)} ↗</a>` : `<span class="small source">Referência: ${escape(source.label)}</span>`;
}
function review(q,i){const a=session.answers[i],correct=a===q.correct;return `<article class="review ${correct?'correct':'wrong'}"><span class="tag">Questão ${i+1} · ${a===null?'Não respondida':correct?'Acertou':'Vamos revisar'}</span><h3>${escape(q.question)}</h3>${sign(q)}${!correct?`<div class="answer missed"><strong>Sua resposta:</strong> ${a===null?'Você deixou esta questão em branco.':escape(q.options[a])}</div>`:''}<div class="answer right"><strong>Resposta correta:</strong> ${escape(q.options[q.correct])}</div><div class="explanation"><p><strong>Por quê?</strong> ${escape(q.explanation)}</p>${sourceLabel(q)}</div></article>`;}
function renderResults(){const {questions,answers}=session;const correct=questions.filter((q,i)=>answers[i]===q.correct).length,blank=answers.filter(a=>a===null).length,wrong=questions.length-correct-blank;const needsReview=questions.map((q,i)=>({q,i})).filter(({q,i})=>answers[i]!==q.correct);const right=questions.map((q,i)=>({q,i})).filter(({q,i})=>answers[i]===q.correct);app.innerHTML=`<div class="shell">${header()}<main><div class="result-top"><div class="eyebrow">${title()} · ${session.timedOut?'Tempo encerrado':'Tentativa concluída'}</div><h1>${correct===questions.length?'Você acertou todas, meu amor!':'Mais um passo na sua conquista. ♡'}</h1><p class="muted">${session.timedOut?'A entrega foi automática ao terminar o tempo. ':''}${needsReview.length?'Cada revisão é uma chance de aprender. Vamos entender o que ficou pelo caminho?':'Seu estudo está dando frutos. Continue praticando com carinho e atenção.'}</p></div><div class="score-summary"><div><strong>${correct}/${questions.length}</strong><small>acertos</small></div><div><strong>${Math.round(correct/questions.length*100)}%</strong><small>de aproveitamento</small></div><div><strong>${wrong}</strong><small>erradas</small></div><div><strong>${blank}</strong><small>em branco</small></div><div><strong>${fmt(session.elapsed)}</strong><small>tempo utilizado</small></div></div><blockquote class="motivation"><span aria-hidden="true">♡</span><p>${motivations[session.version-1]}</p><cite>Com amor, Marcos.</cite></blockquote>
<div class="result-actions">${nextVersion()?`<button class="btn" data-action="next-version">Começar prova ${nextVersion()} · novas perguntas →</button>`:'<p class="cycle-complete">Você concluiu as quatro provas deste grupo! Pode escolher outro módulo ou refazer uma versão para revisar.</p>'}<button class="btn secondary" data-action="retry">Refazer prova ${session.version} · mesmas perguntas</button><button class="btn secondary" data-action="home">Voltar aos módulos</button></div><h2>Aprender com cada resposta</h2>${needsReview.length?`<p class="muted">${needsReview.length} ${needsReview.length===1?'questão para revisar':'questões para revisar'}, incluindo as que ficaram em branco.</p>${needsReview.map(({q,i})=>review(q,i)).join('')}`:'<p>Nenhuma questão errada ou em branco nesta tentativa. Muito bem! ♥</p>'}${right.length?`<details><summary>Ver também as ${right.length} questões corretas e suas explicações</summary>${right.map(({q,i})=>review(q,i)).join('')}</details>`:''}</main>${footer()}</div>`;}
app.addEventListener('click',event=>{const button=event.target.closest('[data-action]');if(!button||button.disabled)return;const action=button.dataset.action;if(action==='start'){start(button.dataset.mode, Number(button.dataset.version));return;}if(action==='home'){if(session&&!session.finished)ask('exit');else{home();focusHeading();}return;}if(action==='retry'&&session?.finished){start(session.mode,session.version);return;}if(action==='next-version'&&session?.finished){const v=nextVersion();if(v)start(session.mode,v);return;}if(!session||session.finished)return;tick();if(session.finished)return;if(action==='finish')ask('finish');else if(['next','prev','jump'].includes(action)){session.index=action==='jump'?Number(button.dataset.index):session.index+(action==='next'?1:-1);renderQuestion();const h=document.getElementById('question-title');h.tabIndex=-1;h.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}});
app.addEventListener('change',event=>{if(!event.target.matches('input[name="answer"]')||!session||session.finished)return;tick();if(session.finished)return;session.answers[session.index]=Number(event.target.value);const count=session.answers.filter(x=>x!==null).length;document.getElementById('answered-count').textContent=count;app.querySelector('progress').value=count;const current=app.querySelector('.number-grid .current');current.classList.add('answered');current.setAttribute('aria-label',`Questão ${session.index+1}, respondida`);});
window.addEventListener('beforeunload',event=>{if(session&&!session.finished){event.preventDefault();event.returnValue='';}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});
home();
})();
