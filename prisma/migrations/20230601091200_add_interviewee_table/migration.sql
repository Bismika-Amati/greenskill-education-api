-- CreateTable
CREATE TABLE "Interviewee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characteristic" TEXT,

    CONSTRAINT "Interviewee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntervieweeCharacteristic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "IntervieweeCharacteristic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewRecap" ADD CONSTRAINT "InterviewRecap_intervieweeId_fkey" FOREIGN KEY ("intervieweeId") REFERENCES "Interviewee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
