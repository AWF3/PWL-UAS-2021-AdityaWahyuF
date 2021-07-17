CREATE DATABASE awf_database;

CREATE TABLE karyawan(
	idkaryawan SERIAL PRIMARY KEY,
	namakaryawan VARCHAR(255),
	email VARCHAR(255),
	alamat VARCHAR(255),
	jabatan VARCHAR(255),
);

