-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "record" JSON NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "object" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "position" JSON NOT NULL,
    "image_id" INTEGER NOT NULL,

    CONSTRAINT "object_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "object" ADD CONSTRAINT "object_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
