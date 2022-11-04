-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,
    "slug" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "category_id" INTEGER,
    "discount_id" INTEGER,
    "image_url" TEXT,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Product_category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discount" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("category_id", "created_at", "desc", "discount_id", "id", "image_url", "name", "price", "slug", "updated_at") SELECT "category_id", "created_at", "desc", "discount_id", "id", "image_url", "name", "price", "slug", "updated_at" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_category_id_key" ON "Product"("category_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
