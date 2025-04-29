const validApiKey = "VQbvo2vIImk18VtDyoDm50pItAVO0Z";

module.exports = (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (apiKey === validApiKey) {
        next(); // Chave válida, prossiga
    } else {
        res.status(401).json({ error: "API Key inválida" }); // Chave inválida
    }
};
