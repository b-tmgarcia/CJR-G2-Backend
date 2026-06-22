/*
  Warnings:

  - You are about to alter the column `ordem` on the `imagens_produto` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_avaliacoes_loja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "loja_id" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "avaliacoes_loja_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "avaliacoes_loja_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "lojas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_avaliacoes_loja" ("comentario", "createdAt", "id", "loja_id", "nota", "updatedAt", "usuario_id") SELECT "comentario", "createdAt", "id", "loja_id", "nota", "updatedAt", "usuario_id" FROM "avaliacoes_loja";
DROP TABLE "avaliacoes_loja";
ALTER TABLE "new_avaliacoes_loja" RENAME TO "avaliacoes_loja";
CREATE TABLE "new_avaliacoes_produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "avaliacoes_produto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "avaliacoes_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_avaliacoes_produto" ("comentario", "createdAt", "id", "nota", "produto_id", "updatedAt", "usuario_id") SELECT "comentario", "createdAt", "id", "nota", "produto_id", "updatedAt", "usuario_id" FROM "avaliacoes_produto";
DROP TABLE "avaliacoes_produto";
ALTER TABLE "new_avaliacoes_produto" RENAME TO "avaliacoes_produto";
CREATE TABLE "new_categorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "categoria_pai_id" INTEGER,
    CONSTRAINT "categorias_categoria_pai_id_fkey" FOREIGN KEY ("categoria_pai_id") REFERENCES "categorias" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_categorias" ("categoria_pai_id", "id", "nome") SELECT "categoria_pai_id", "id", "nome" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE TABLE "new_comentarios_avaliacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "avaliacao_loja_id" INTEGER,
    "avaliacao_produto_id" INTEGER,
    "conteudo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "comentarios_avaliacao_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comentarios_avaliacao_avaliacao_loja_id_fkey" FOREIGN KEY ("avaliacao_loja_id") REFERENCES "avaliacoes_loja" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "comentarios_avaliacao_avaliacao_produto_id_fkey" FOREIGN KEY ("avaliacao_produto_id") REFERENCES "avaliacoes_produto" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_comentarios_avaliacao" ("avaliacao_loja_id", "avaliacao_produto_id", "conteudo", "createdAt", "id", "updatedAt", "usuario_id") SELECT "avaliacao_loja_id", "avaliacao_produto_id", "conteudo", "createdAt", "id", "updatedAt", "usuario_id" FROM "comentarios_avaliacao";
DROP TABLE "comentarios_avaliacao";
ALTER TABLE "new_comentarios_avaliacao" RENAME TO "comentarios_avaliacao";
CREATE TABLE "new_imagens_produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produto_id" INTEGER NOT NULL,
    "url_imagem" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    CONSTRAINT "imagens_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_imagens_produto" ("id", "ordem", "produto_id", "url_imagem") SELECT "id", "ordem", "produto_id", "url_imagem" FROM "imagens_produto";
DROP TABLE "imagens_produto";
ALTER TABLE "new_imagens_produto" RENAME TO "imagens_produto";
CREATE TABLE "new_lojas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "logo_url" TEXT,
    "banner_url" TEXT,
    "sticker_url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "lojas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_lojas" ("banner_url", "createdAt", "descricao", "id", "logo_url", "nome", "sticker_url", "updatedAt", "usuario_id") SELECT "banner_url", "createdAt", "descricao", "id", "logo_url", "nome", "sticker_url", "updatedAt", "usuario_id" FROM "lojas";
DROP TABLE "lojas";
ALTER TABLE "new_lojas" RENAME TO "lojas";
CREATE TABLE "new_produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "loja_id" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" REAL NOT NULL,
    "estoque" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "produtos_loja_id_fkey" FOREIGN KEY ("loja_id") REFERENCES "lojas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("categoria_id", "createdAt", "descricao", "estoque", "id", "loja_id", "nome", "preco", "updatedAt") SELECT "categoria_id", "createdAt", "descricao", "estoque", "id", "loja_id", "nome", "preco", "updatedAt" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
