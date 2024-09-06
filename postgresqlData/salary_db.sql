-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/xLERwD
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "job" (
    "job_id" VARCHAR(250)   NOT NULL,
    "work_year" VARCHAR(250)   NOT NULL,
    "employee_residence" VARCHAR(250)   NOT NULL,
    "experience_level" VARCHAR(250)   NOT NULL,
    "employment_type" VARCHAR(250)   NOT NULL,
    "company_size" VARCHAR(250)   NOT NULL,
    "title_id" INT   NOT NULL,
    "location_id" VARCHAR(250)   NOT NULL,
    CONSTRAINT "pk_job" PRIMARY KEY (
        "job_id"
     )
);

CREATE TABLE "job_title" (
    "title_id" INT   NOT NULL,
    "job_title" VARCHAR(250)   NOT NULL,
    CONSTRAINT "pk_job_title" PRIMARY KEY (
        "title_id"
     )
);

CREATE TABLE "location" (
    "location_id" VARCHAR(250)   NOT NULL,
    "company_location" VARCHAR(250)   NOT NULL,
    CONSTRAINT "pk_location" PRIMARY KEY (
        "location_id"
     )
);

CREATE TABLE "salary" (
    "job_id" VARCHAR(250)   NOT NULL,
    "salary_in_usd" INT   NOT NULL
);

ALTER TABLE "job" ADD CONSTRAINT "fk_job_title_id" FOREIGN KEY("title_id")
REFERENCES "job_title" ("title_id");

ALTER TABLE "location" ADD CONSTRAINT "fk_location_location_id" FOREIGN KEY("location_id")
REFERENCES "job" ("location_id");

ALTER TABLE "salary" ADD CONSTRAINT "fk_salary_job_id" FOREIGN KEY("job_id")
REFERENCES "job" ("job_id");

