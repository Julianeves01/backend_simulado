const PDFDocument = require("pdfkit");

/**
 * Função para gerar um relatório PDF.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {Array} data - Dados a serem incluídos no relatório.
 * @param {String} title - Título do relatório.
 */
const generatePdfReport = (res, data, title) => {
    try {
        const doc = new PDFDocument();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename=${title.replace(/\s+/g, "_").toLowerCase()}.pdf`);

        doc.pipe(res);

        // Cabeçalho do relatório
        doc.fontSize(18).text(title, { align: "center" });
        doc.moveDown();

        // Adiciona os dados ao relatório
        data.forEach((item, index) => {
            // Garante que o item seja um objeto válido
            if (typeof item === "string") {
                try {
                    item = JSON.parse(item);
                } catch (e) {
                    console.error("Erro ao analisar item JSON:", e);
                    item = {};
                }
            }

            doc
                .fontSize(12)
                .text(`${index + 1}. Nome: ${item.nome || "Não informado"}`)
                .text(`   Preço: R$ ${typeof item.preco === "number" ? item.preco.toFixed(2) : "0.00"}`)
                .text(`   Marca: ${item.marca_nome || "Não informada"}`)
                .moveDown();
        });

        doc.end();

        // Tratamento de erros no fluxo do PDF
        doc.on('error', (err) => {
            console.error("Erro ao gerar PDF:", err);
            if (!res.headersSent) {
                res.status(500).send("Erro ao gerar o PDF.");
            }
        });
    } catch (error) {
        console.error("Erro ao gerar relatório PDF:", error);
        res.status(500).json({ message: "Erro ao gerar relatório PDF." });
    }
};

module.exports = { generatePdfReport };