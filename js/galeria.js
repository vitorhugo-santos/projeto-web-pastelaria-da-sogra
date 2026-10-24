/* Página Galeria — filtros e ampliação de fotografias.
   Fotos definidas em dados-galeria.js (arquivo do pacote de imagens). */
(() => {
    "use strict";

    const grade = document.getElementById("pg-grade");
    const total = document.getElementById("pg-total");
    const modal = document.getElementById("pg-modal");
    const imagemModal = document.getElementById("pg-modal-imagem");
    const tituloModal = document.getElementById("pg-modal-titulo");
    const descricaoModal = document.getElementById("pg-modal-descricao");
    const contadorModal = document.getElementById("pg-modal-contador");
    const fechar = document.getElementById("pg-fechar");
    const anterior = document.getElementById("pg-anterior");
    const proxima = document.getElementById("pg-proxima");
    const filtros = [...document.querySelectorAll(".pg-filtro")];

    if (!grade || !modal || typeof FOTOS_GALERIA === "undefined" || !Array.isArray(FOTOS_GALERIA)) {
        if (grade) grade.textContent = "Não foi possível carregar as fotografias. Confira o arquivo js/dados-galeria.js.";
        return;
    }

    const fotos = FOTOS_GALERIA;
    const nomesCategorias = {
        produtos: "Pastéis", ambiente: "Ambiente", fachada: "Fachada e exterior", detalhes: "Detalhes"
    };
    let fotosFiltradas = [...fotos];
    let indiceAberto = 0;
    let botaoAnteriorFoco = null;

    function atualizarModal() {
        const foto = fotosFiltradas[indiceAberto];
        if (!foto) return;
        imagemModal.src = foto.arquivo;
        imagemModal.alt = foto.alt;
        tituloModal.textContent = nomesCategorias[foto.categoria] || "Fotografia";
        descricaoModal.textContent = foto.legenda;
        contadorModal.textContent = `Foto ${indiceAberto + 1} de ${fotosFiltradas.length}`;
    }

    function abrirFoto(indice, botao) {
        indiceAberto = indice;
        botaoAnteriorFoco = botao;
        atualizarModal();
        modal.showModal();
        fechar.focus();
    }

    function mudarFoto(delta) {
        if (!modal.open || fotosFiltradas.length === 0) return;
        indiceAberto = (indiceAberto + delta + fotosFiltradas.length) % fotosFiltradas.length;
        atualizarModal();
    }

    function renderizar() {
        const fragmento = document.createDocumentFragment();
        fotosFiltradas.forEach((foto, indice) => {
            const cartao = document.createElement("figure");
            cartao.className = "pg-card";

            const botao = document.createElement("button");
            botao.className = "pg-card-botao";
            botao.type = "button";
            botao.setAttribute("aria-label", `Ampliar: ${foto.alt}`);

            const imagem = document.createElement("img");
            imagem.src = foto.miniatura;
            imagem.alt = foto.alt;
            imagem.loading = "lazy";
            imagem.decoding = "async";

            const ampliar = document.createElement("span");
            ampliar.className = "pg-ampliar";
            ampliar.textContent = "+";
            ampliar.setAttribute("aria-hidden", "true");

            botao.append(imagem, ampliar);
            botao.addEventListener("click", () => abrirFoto(indice, botao));

            const legenda = document.createElement("figcaption");
            legenda.className = "pg-card-legenda";
            const categoria = document.createElement("span");
            categoria.className = "pg-card-categoria";
            categoria.textContent = nomesCategorias[foto.categoria] || "Galeria";
            const descricao = document.createElement("p");
            descricao.textContent = foto.legenda;
            legenda.append(categoria, descricao);
            cartao.append(botao, legenda);
            fragmento.appendChild(cartao);
        });
        grade.replaceChildren(fragmento);
        total.textContent = `${fotosFiltradas.length} ${fotosFiltradas.length === 1 ? "fotografia" : "fotografias"}`;
    }

    filtros.forEach(botao => {
        botao.addEventListener("click", () => {
            const categoria = botao.dataset.categoria;
            fotosFiltradas = categoria === "todos" ? [...fotos] : fotos.filter(foto => foto.categoria === categoria);
            filtros.forEach(filtro => {
                const ativo = filtro === botao;
                filtro.classList.toggle("ativo", ativo);
                filtro.setAttribute("aria-pressed", String(ativo));
            });
            renderizar();
        });
    });

    fechar.addEventListener("click", () => modal.close());
    anterior.addEventListener("click", () => mudarFoto(-1));
    proxima.addEventListener("click", () => mudarFoto(+1));

    modal.addEventListener("keydown", (evento) => {
        if (evento.key === "ArrowRight") { evento.preventDefault(); mudarFoto(1); }
        if (evento.key === "ArrowLeft") { evento.preventDefault(); mudarFoto(-1); }
        // O diálogo nativo já trata o Esc e impede interação com a página ao fundo.
    });

    modal.addEventListener("click", (evento) => {
        // Permite fechar clicando fora da caixa, no fundo escurecido.
        if (evento.target !== modal) return;
        const r = modal.getBoundingClientRect();
        if (evento.clientX < r.left || evento.clientX > r.right || evento.clientY < r.top || evento.clientY > r.bottom) {
            modal.close();
        }
    });

    modal.addEventListener("close", () => {
        if (botaoAnteriorFoco && botaoAnteriorFoco.isConnected) botaoAnteriorFoco.focus();
    });

    renderizar();
})();
