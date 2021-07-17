const express = require('express');
const app = express();
const port = 3000
const pool = require("./db");

app.use(express.json())
app.listen(port, () => {
  console.log(`Server Terkoneksi Ke PORT ${port}`)
})

//FUNGSI : CRUD, TAMPILKAN SEMUA TABEL, TABEL BY ID
//UPDATE DAN DELETE BY ID

//CREATE TABEL
app.post("/crud", async (req,res) => {
	try	{
		const {namakaryawan} = req.body;
		const create = await pool.query(
			"INSERT INTO karyawan (namakaryawan) VALUES ($1) RETURNING *", [namakaryawan]);
			res.json(create.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//UPDATE TABEL
app.put("/crud/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { namakaryawan } = req.body;
		const update = await pool.query("UPDATE karyawan SET namakaryawan = $1 WHERE idkaryawan = $2", 
			[namakaryawan, id]);
		res.json("Tabel Berhasil di Update!");
	} catch (err) {
		console.error(err.message);
	}
});

//DELETE TABEL
app.delete("/crud/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedata = await pool.query("DELETE FROM karyawan WHERE idkaryawan = $1", 
			[id]);
		res.json("Tabel Berhasil di Hapus!");
	} catch (err) {
		console.error(err.message);
	}
});

//TAMPILKAN SEMUA ISI DATATABEL
app.get("/crud", async (req,res) => {
	try {
		const table = await pool.query("SELECT * FROM karyawan");
		res.json(table.rows);
	} catch (err) {
		console.error(err.message);
	}
});

//TAMPILKAN DATATABEL DENGAN ID KARYAWAN
app.get("/crud/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const idk = await pool.query("SELECT * FROM karyawan WHERE idkaryawan = $1", [id]);

		res.json(idk.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

