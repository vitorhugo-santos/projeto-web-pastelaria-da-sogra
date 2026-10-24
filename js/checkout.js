/* ============================================================
   CHECKOUT ACADÊMICO — PASTELARIA DA SOGRA
   Apenas simulação local. Não há fetch, backend nem pagamentos.
   Depende de js/script.js para o carrinho (carregado antes).
============================================================ */
(() => {
    "use strict";

    const CHAVE = "pastelariaDaSograCarrinho";
    const ZONA = "America/Sao_Paulo";
    const HORA_ABERTURA = 18 * 60;
    const HORA_FECHAMENTO = 23 * 60;
    const ANTECEDENCIA = 30; // Apenas para horários futuros simulados.
    const $ = (id) => document.getElementById(id);
    const form = $("form-checkout");
    if (!form) return;

    const ui = {
        lista: $("lista-carrinho"),
        areaCarrinho: $("bloco-carrinho"),
        areaCheckout: $("checkout-secao"),
        areaVazia: $("checkout-vazio"),
        areaSucesso: $("checkout-sucesso"),
        resumoFinal: $("checkout-resumo-final"),
        tituloSucesso: $("checkout-sucesso-titulo"),
        total: $("checkout-total"),
        botao: $("checkout-finalizar"),
        erro: $("checkout-erro"),
        endereco: $("checkout-endereco"),
        rua: $("checkout-rua"),
        numero: $("checkout-numero"),
        bairro: $("checkout-bairro"),
        complemento: $("checkout-complemento"),
        telefone: $("checkout-telefone"),
        nome: $("checkout-nome"),
        momentoAgora: form.querySelector('input[name="momento"][value="agora"]'),
        momentoAgendado: form.querySelector('input[name="momento"][value="agendado"]'),
        horario: $("checkout-aviso-horario"),
        agendamento: $("checkout-agendamento"),
        dia: $("checkout-data"),
        hora: $("checkout-hora"),
        troco: $("checkout-troco"),
        trocoValor: $("checkout-valor-troco")
    };
    let concluida = false;
    let campoComErro = null;
    let descricaoAnterior = null;
    let mensagemDeCampo = null;

    // Mantém cada aviso ao lado do campo e preserva suas dicas acessíveis.
    function limparErroCampo() {
        if (!campoComErro) return;
        campoComErro.removeAttribute("aria-invalid");
        if (descricaoAnterior === null) campoComErro.removeAttribute("aria-describedby");
        else campoComErro.setAttribute("aria-describedby", descricaoAnterior);
        if (mensagemDeCampo) mensagemDeCampo.remove();
        campoComErro = null;
        descricaoAnterior = null;
        mensagemDeCampo = null;
    }

    function movimentoRolagem() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant" : "smooth";
    }

    const moeda = (centavos) => new Intl.NumberFormat("pt-BR", {
        style: "currency", currency: "BRL"
    }).format(centavos / 100);

    function obterItens() {
        try {
            const lido = JSON.parse(localStorage.getItem(CHAVE) || "[]");
            if (!Array.isArray(lido)) return [];
            return lido.filter((item) =>
                item && typeof item.nome === "string" && item.nome.trim() &&
                Number.isInteger(Number(item.quantidade)) && Number(item.quantidade) > 0 &&
                Number.isFinite(Number(item.preco)) && Number(item.preco) > 0
            ).map((item) => ({
                nome: item.nome.trim(),
                quantidade: Number(item.quantidade),
                precoCentavos: Math.round(Number(item.preco) * 100)
            }));
        } catch (_erro) {
            return [];
        }
    }

    const totalCentavos = (itens) => itens.reduce(
        (soma, item) => soma + item.precoCentavos * item.quantidade, 0
    );

    function horarioSorocaba(data = new Date()) {
        const partes = new Intl.DateTimeFormat("en-US", {
            timeZone: ZONA, year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", hourCycle: "h23"
        }).formatToParts(data);
        const valores = Object.fromEntries(partes.map((p) => [p.type, p.value]));
        const ano = Number(valores.year), mes = Number(valores.month), dia = Number(valores.day);
        const diaSemana = new Date(Date.UTC(ano, mes - 1, dia)).getUTCDay();
        return {
            ano, mes, dia, diaSemana,
            data: `${valores.year}-${valores.month}-${valores.day}`,
            minutos: Number(valores.hour) * 60 + Number(valores.minute)
        };
    }

    function abertoAgora(local) {
        return local.diaSemana !== 1 && local.minutos >= HORA_ABERTURA && local.minutos < HORA_FECHAMENTO;
    }

    function horariosDoDia(dataISO, local) {
        const horarios = [];
        for (let minutos = HORA_ABERTURA; minutos < HORA_FECHAMENTO; minutos += 30) {
            if (dataISO === local.data && minutos < local.minutos + ANTECEDENCIA) continue;
            const hh = String(Math.floor(minutos / 60)).padStart(2, "0");
            const mm = String(minutos % 60).padStart(2, "0");
            horarios.push(`${hh}:${mm}`);
        }
        return horarios;
    }

    function diasDisponiveis(local) {
        const dias = [];
        for (let deslocamento = 0; deslocamento <= 7; deslocamento++) {
            const utc = new Date(Date.UTC(local.ano, local.mes - 1, local.dia + deslocamento));
            if (utc.getUTCDay() === 1) continue; // Segunda-feira fechada.
            const data = [utc.getUTCFullYear(), String(utc.getUTCMonth() + 1).padStart(2, "0"),
                String(utc.getUTCDate()).padStart(2, "0")].join("-");
            const horarios = horariosDoDia(data, local);
            if (!horarios.length) continue;
            const rotulo = new Intl.DateTimeFormat("pt-BR", {
                timeZone: "UTC", weekday: "long", day: "2-digit", month: "2-digit"
            }).format(utc);
            dias.push({data, rotulo, horarios});
        }
        return dias;
    }

    function preencherHorarios(dias) {
        const atual = ui.hora.value;
        const selecionado = dias.find((d) => d.data === ui.dia.value);
        ui.hora.replaceChildren(new Option("Selecione um horário", ""));
        if (!selecionado) return;
        selecionado.horarios.forEach((h) => ui.hora.add(new Option(h, h)));
        if (selecionado.horarios.includes(atual)) ui.hora.value = atual;
        else ui.hora.value = selecionado.horarios[0];
    }

    function atualizarHorario() {
        const agora = horarioSorocaba();
        const aberto = abertoAgora(agora);
        ui.momentoAgora.disabled = !aberto;
        if (!aberto && ui.momentoAgora.checked) ui.momentoAgendado.checked = true;
        ui.horario.textContent = aberto
            ? "A pastelaria está no horário de atendimento. Você pode simular um pedido para agora ou escolher outro horário."
            : "Fora do horário de atendimento (ter.–dom., 18h–23h). Para continuar, escolha um horário futuro simulado.";

        const disponiveis = diasDisponiveis(agora);
        const diaAnterior = ui.dia.value;
        ui.dia.replaceChildren(new Option("Selecione um dia", ""));
        disponiveis.forEach((d) => ui.dia.add(new Option(d.rotulo, d.data)));
        ui.dia.value = disponiveis.some((d) => d.data === diaAnterior) ? diaAnterior : (disponiveis[0]?.data || "");
        preencherHorarios(disponiveis);

        const agendado = ui.momentoAgendado.checked;
        ui.agendamento.hidden = !agendado;
        ui.dia.required = agendado;
        ui.hora.required = agendado;
    }

    function atualizarModalidade() {
        const entrega = form.elements.modalidade.value === "entrega";
        ui.endereco.hidden = !entrega;
        [ui.rua, ui.numero, ui.bairro].forEach((campo) => {
            campo.required = entrega;
            campo.disabled = !entrega;
        });
        ui.complemento.disabled = !entrega;
    }

    function atualizarPagamento() {
        const dinheiro = form.elements.pagamento.value === "dinheiro";
        ui.troco.hidden = !dinheiro;
        ui.trocoValor.disabled = !dinheiro;
        if (!dinheiro) ui.trocoValor.value = "";
    }

    function atualizarCarrinho() {
        if (concluida) return;
        const itens = obterItens();
        const vazio = itens.length === 0;
        ui.areaCarrinho.hidden = vazio;
        ui.areaVazia.hidden = !vazio;
        ui.areaCheckout.hidden = vazio;
        ui.botao.disabled = vazio;
        ui.total.textContent = moeda(totalCentavos(itens));
        ui.erro.hidden = true;
        ui.erro.textContent = "";
        limparErroCampo();
    }

    function falha(mensagem, campo = null) {
        limparErroCampo();
        ui.erro.hidden = true;
        ui.erro.textContent = "";

        const recipiente = campo?.closest(".checkout-campo");
        if (campo && recipiente) {
            const aviso = document.createElement("p");
            aviso.id = `${campo.id}-erro`;
            aviso.className = "checkout-erro-campo";
            aviso.textContent = mensagem;
            recipiente.appendChild(aviso);

            descricaoAnterior = campo.getAttribute("aria-describedby");
            campo.setAttribute("aria-describedby",
                [descricaoAnterior, aviso.id].filter(Boolean).join(" "));
            campo.setAttribute("aria-invalid", "true");
            campoComErro = campo;
            mensagemDeCampo = aviso;
        } else {
            // Somente para erros que não possam ser ligados a um campo específico.
            ui.erro.textContent = mensagem;
            ui.erro.hidden = false;
        }

        const destino = campo || ui.erro;
        destino.focus({preventScroll: true});
        destino.scrollIntoView({behavior: movimentoRolagem(), block: "center"});
    }

    function adicionarCampo(dl, titulo, valor) {
        const dt = document.createElement("dt");
        dt.textContent = titulo;
        const dd = document.createElement("dd");
        dd.textContent = valor;
        dl.append(dt, dd);
    }

    function exibirComprovante(itens, dados) {
        ui.resumoFinal.replaceChildren();
        const dl = document.createElement("dl");
        adicionarCampo(dl, "Cliente", dados.nome);
        adicionarCampo(dl, "Modalidade", dados.entrega ? "Entrega simulada" : "Retirada simulada no balcão");
        if (dados.entrega) adicionarCampo(dl, "Endereço demonstrativo", dados.endereco);
        adicionarCampo(dl, "Quando", dados.quando);
        adicionarCampo(dl, "Pagamento escolhido", dados.pagamento + " (simulado)");
        ui.resumoFinal.append(dl);

        const lista = document.createElement("ul");
        lista.className = "checkout-resumo-itens";
        itens.forEach((item) => {
            const li = document.createElement("li");
            const produto = document.createElement("span");
            produto.textContent = `${item.quantidade} × ${item.nome}`;
            const preco = document.createElement("strong");
            preco.textContent = moeda(item.precoCentavos * item.quantidade);
            li.append(produto, preco);
            lista.append(li);
        });
        const total = document.createElement("div");
        total.className = "checkout-comprovante-total";
        const titulo = document.createElement("span");
        titulo.textContent = "Total demonstrativo";
        const valor = document.createElement("strong");
        valor.textContent = moeda(totalCentavos(itens));
        total.append(titulo, valor);
        ui.resumoFinal.append(lista, total);
    }

    form.addEventListener("change", (evento) => {
        const nome = evento.target.name;
        if (nome === "modalidade") atualizarModalidade();
        if (nome === "pagamento") atualizarPagamento();
        if (nome === "momento") atualizarHorario();
        if (nome === "data") preencherHorarios(diasDisponiveis(horarioSorocaba()));
    });

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        ui.erro.hidden = true;
        limparErroCampo();
        const itens = obterItens();
        if (!itens.length) {
            atualizarCarrinho();
            return falha("Adicione ao menos um produto antes de finalizar.");
        }

        const nome = ui.nome.value.trim();
        if (nome.length < 3) return falha("Informe um nome de pelo menos três caracteres.", ui.nome);
        const telefone = ui.telefone.value.replace(/\D/g, "");
        if (telefone.length !== 10 && telefone.length !== 11) {
            return falha("Informe um telefone com DDD (10 ou 11 dígitos).", ui.telefone);
        }
        const entrega = form.elements.modalidade.value === "entrega";
        if (entrega) {
            for (const campo of [ui.rua, ui.bairro]) {
                if (campo.value.trim().length < 2) {
                    return falha("Preencha este campo com pelo menos dois caracteres.", campo);
                }
            }
            if (!ui.numero.value.trim()) {
                return falha("Informe o número do imóvel (pode ter um dígito).", ui.numero);
            }
        }

        // Revalida o relógio e o dia em cada finalização, nunca confia só no estado da interface.
        const agora = horarioSorocaba();
        const imediato = ui.momentoAgora.checked;
        if (imediato && !abertoAgora(agora)) {
            atualizarHorario();
            return falha("O atendimento está fechado agora. Selecione um horário futuro para simular.");
        }
        if (!imediato) {
            const opcoes = diasDisponiveis(agora);
            const dia = opcoes.find((d) => d.data === ui.dia.value);
            if (!dia || !dia.horarios.includes(ui.hora.value)) {
                const campoInvalido = !dia ? ui.dia : ui.hora;
                atualizarHorario();
                return falha("Esse dia ou horário não está disponível. Selecione uma opção válida.", campoInvalido);
            }
        }

        const pagamento = form.elements.pagamento.value;
        if (!["pix", "cartao", "dinheiro"].includes(pagamento)) return falha("Escolha a forma de pagamento demonstrativa.");
        if (pagamento === "dinheiro" && ui.trocoValor.value !== "") {
            const valorTroco = Number(ui.trocoValor.value);
            if (!Number.isFinite(valorTroco) || ui.trocoValor.validity.badInput ||
                ui.trocoValor.validity.stepMismatch ||
                valorTroco < totalCentavos(itens) / 100) {
                return falha("Informe um valor válido para troco, igual ou maior que o total.", ui.trocoValor);
            }
        }

        const endereco = [ui.rua.value.trim(), ui.numero.value.trim(), ui.bairro.value.trim(), ui.complemento.value.trim()]
            .filter(Boolean).join(", ");
        const quando = imediato ? "Para agora (simulado)" : `${ui.dia.selectedOptions[0].textContent}, às ${ui.hora.value} (simulado)`;
        exibirComprovante(itens, {nome, entrega, endereco, quando,
            pagamento: {pix: "Pix", cartao: "Cartão", dinheiro: "Dinheiro"}[pagamento]});

        // Nenhum dado pessoal é persistido. Somente o carrinho anterior é apagado ao concluir.
        localStorage.removeItem(CHAVE);
        if (typeof atualizarContadorCarrinho === "function") atualizarContadorCarrinho();
        if (typeof exibirCarrinho === "function") exibirCarrinho();
        form.reset();
        concluida = true;
        ui.areaCarrinho.hidden = true;
        ui.areaCheckout.hidden = true;
        ui.areaVazia.hidden = true;
        ui.areaSucesso.hidden = false;
        ui.tituloSucesso.focus({preventScroll: true});
        ui.areaSucesso.scrollIntoView({behavior: "smooth", block: "start"});
    });

    if (ui.lista) {
        // Os botões +, − e Remover já são controlados por js/script.js.
        ui.lista.addEventListener("click", () => setTimeout(atualizarCarrinho, 0));
    }
    window.addEventListener("storage", (evento) => {
        if (evento.key === CHAVE) atualizarCarrinho();
    });
    window.addEventListener("pageshow", atualizarCarrinho);
    // O aviso permanece junto ao campo até que a pessoa comece a corrigi-lo.
    function aoEditarCampo(evento) {
        if (evento.target === campoComErro) limparErroCampo();
        if (!ui.erro.hidden) ui.erro.hidden = true;
    }
    form.addEventListener("input", aoEditarCampo);
    form.addEventListener("change", aoEditarCampo);

    atualizarModalidade();
    atualizarPagamento();
    atualizarHorario();
    atualizarCarrinho();
    setInterval(() => { if (!concluida) atualizarHorario(); }, 60_000);
})();
