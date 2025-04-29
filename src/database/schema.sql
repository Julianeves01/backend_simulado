CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR (100) NOT NULL,
    descricao TEXT
);

CREATE TABLE cosmeticos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR (100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2),
    foto TEXT,
    marca_id INTEGER REFERENCES marcas(id)
);