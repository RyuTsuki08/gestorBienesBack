-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Example" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ambientes" (
    "idambiente" SERIAL NOT NULL,
    "nombreambiente" TEXT,
    "idunidaddetrabajo" INTEGER DEFAULT 0,
    "trial041" CHAR(1),

    CONSTRAINT "ambientes_pkey" PRIMARY KEY ("idambiente")
);

-- CreateTable
CREATE TABLE "public"."bienes" (
    "inventario" TEXT NOT NULL,
    "descripción" TEXT,
    "idsubgrupo" INTEGER DEFAULT 0,
    "idsección" INTEGER DEFAULT 0,
    "valor" DOUBLE PRECISION DEFAULT 0,
    "idunidaddetrabajo" INTEGER DEFAULT 0,
    "idambiente" INTEGER DEFAULT 0,
    "factura" TEXT,
    "fechafactura" TIMESTAMP(6),
    "fechaincorporación" TIMESTAMP(6),
    "desincorporado" BOOLEAN NOT NULL DEFAULT false,
    "robado" BOOLEAN NOT NULL DEFAULT false,
    "chatarra" BOOLEAN NOT NULL DEFAULT false,
    "fechadesincorporación" TIMESTAMP(6),
    "vidaútil" INTEGER,
    "valorderecuparación" INTEGER,
    "valordedepreciación" INTEGER,
    "faltante" BOOLEAN NOT NULL DEFAULT false,
    "esperafactura" BOOLEAN NOT NULL DEFAULT false,
    "inoperativo" BOOLEAN NOT NULL DEFAULT false,
    "otrosmemo" TEXT,
    "fuerademural" BOOLEAN NOT NULL DEFAULT false,
    "observaciones" TEXT,
    "códigop" TEXT,
    "vehículo" BOOLEAN NOT NULL DEFAULT false,
    "maquinaria" BOOLEAN NOT NULL DEFAULT false,
    "marcador grupal" BOOLEAN NOT NULL DEFAULT false,
    "mantenimiento" BOOLEAN NOT NULL DEFAULT false,
    "esrecolector" BOOLEAN NOT NULL DEFAULT false,
    "moto" BOOLEAN NOT NULL DEFAULT false,
    "inspección" BOOLEAN NOT NULL DEFAULT false,
    "fechainspeccion" TIMESTAMP(6),
    "iddependencias" INTEGER,
    "deteriorado" BOOLEAN NOT NULL DEFAULT false,
    "codigopresupuestario" TEXT,
    "sc" BOOLEAN NOT NULL DEFAULT false,
    "valorsoberano" DOUBLE PRECISION,
    "trial054" CHAR(1),
    "obsoleto" BOOLEAN,
    "denuncia" TEXT,
    "fechadenuncia" TIMESTAMP(6),
    "asignado" TEXT,

    CONSTRAINT "bienes_pkey" PRIMARY KEY ("inventario")
);

-- CreateTable
CREATE TABLE "public"."dependencias" (
    "iddependencias" SERIAL NOT NULL,
    "dependencia" TEXT,
    "trial048" CHAR(1),

    CONSTRAINT "dependencias_pkey" PRIMARY KEY ("iddependencias")
);

-- CreateTable
CREATE TABLE "public"."grupo" (
    "idgrupo" SERIAL NOT NULL,
    "nombregrupo" TEXT,
    "trial061" CHAR(1),

    CONSTRAINT "grupo_pkey" PRIMARY KEY ("idgrupo")
);

-- CreateTable
CREATE TABLE "public"."imagenes" (
    "id" SERIAL NOT NULL,
    "inventario" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "imagenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sección" (
    "idsección" SERIAL NOT NULL,
    "nombresección" TEXT,
    "idsubgrupo" INTEGER,
    "trial067" CHAR(1),

    CONSTRAINT "sección_pkey" PRIMARY KEY ("idsección")
);

-- CreateTable
CREATE TABLE "public"."subgrupo" (
    "idsubgrupo" SERIAL NOT NULL,
    "nombresubgrupo" TEXT,
    "trial064" CHAR(1),

    CONSTRAINT "subgrupo_pkey" PRIMARY KEY ("idsubgrupo")
);

-- CreateTable
CREATE TABLE "public"."transferencias" (
    "idtransferencia" SERIAL NOT NULL,
    "inventario" TEXT,
    "idunidaddetrabajoorigen" INTEGER,
    "idambienteorigen" INTEGER,
    "idunidaddetrabajodestino" INTEGER,
    "idambientedestino" INTEGER,
    "fechatransferencia" TIMESTAMP(6),
    "imprimir" BOOLEAN NOT NULL DEFAULT true,
    "procesar" BOOLEAN NOT NULL DEFAULT false,
    "trial070" CHAR(1),

    CONSTRAINT "transferencias_pkey" PRIMARY KEY ("idtransferencia")
);

-- CreateTable
CREATE TABLE "public"."unidad de trabajo" (
    "idunidaddetrabajo" SERIAL NOT NULL,
    "unidaddetrabajo" TEXT,
    "localización" TEXT,
    "júpiter" TEXT,
    "teléfono" TEXT,
    "trial051" CHAR(1),

    CONSTRAINT "unidad de trabajo_pkey" PRIMARY KEY ("idunidaddetrabajo")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."bienes" ADD CONSTRAINT "bienes_iddependencias_fkey" FOREIGN KEY ("iddependencias") REFERENCES "public"."dependencias"("iddependencias") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bienes" ADD CONSTRAINT "bienes_idunidaddetrabajo_fkey" FOREIGN KEY ("idunidaddetrabajo") REFERENCES "public"."unidad de trabajo"("idunidaddetrabajo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."imagenes" ADD CONSTRAINT "imagenes_inventario_fkey" FOREIGN KEY ("inventario") REFERENCES "public"."bienes"("inventario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sección" ADD CONSTRAINT "sección_idsubgrupo_fkey" FOREIGN KEY ("idsubgrupo") REFERENCES "public"."subgrupo"("idsubgrupo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transferencias" ADD CONSTRAINT "transferencias_inventario_fkey" FOREIGN KEY ("inventario") REFERENCES "public"."bienes"("inventario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transferencias" ADD CONSTRAINT "transferencias_idambienteorigen_fkey" FOREIGN KEY ("idambienteorigen") REFERENCES "public"."ambientes"("idambiente") ON DELETE SET NULL ON UPDATE CASCADE;
