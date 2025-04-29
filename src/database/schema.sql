CREATE DATABASE store_cosmeticos;
\c store_cosmeticos;

CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR (100) NOT NULL,
    pais_origem TEXT
);

CREATE TABLE cosmeticos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR (100) NOT NULL,
    preco DECIMAL(10,2),
    marca_id INTEGER REFERENCES marcas(id) ON DELETE CASCADE
);

INSERT INTO marcas (nome, pais_origem) VALUES
    ('Natura', 'Brasil'),
    ('O Boticário', 'Brasil'),
    ('Lancome', 'França'),
    ('Avon', 'Estados Unidos');

INSERT INTO cosmeticos (nome, preco, marca_id) VALUES
    ('Creme Hidratante', 29.90, 1),
    ('Perfume Floratta', 89.90, 2),
    ('Base Líquida', 49.90, 3),
    ('Batom Vermelho', 24.90, 4);
