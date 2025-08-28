-- CreateTable
CREATE TABLE "visitors" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isBadActor" BOOLEAN NOT NULL DEFAULT false,
    "page" TEXT NOT NULL,
    "sessionId" TEXT,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_summary" (
    "id" SERIAL NOT NULL,
    "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "badActors" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guestbook" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "location" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guestbook_pkey" PRIMARY KEY ("id")
);
