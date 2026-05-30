# Issue: Implementasi Endpoint Registrasi User Baru

**Tujuan:**
Mengimplementasikan fungsionalitas registrasi untuk user baru, mencakup pembuatan tabel database, pembuatan struktur folder yang rapi, dan pembuatan endpoint API untuk menerima data registrasi.

**Deskripsi Tugas untuk Junior Programmer / AI Agent:**
Silakan ikuti tahapan-tahapan di bawah ini secara berurutan untuk menyelesaikan tugas ini. Pastikan untuk membaca dengan teliti setiap spesifikasi yang diberikan.

### Tahap 1: Persiapan Database (Membuat Tabel `user`)
Langkah pertama adalah menyiapkan tempat penyimpanan data. Buatlah sebuah tabel baru di database dengan nama `user`.
Berikut adalah spesifikasi kolom yang wajib dibuat:
- `id`: Tipe data `integer`, jadikan sebagai `primary key`, dan set ke `auto increment`.
- `name`: Tipe data `varchar(100)`, tidak boleh kosong (`not null`).
- `email`: Tipe data `varchar(50)`, harus unik (`unique`) agar tidak ada email ganda, dan tidak boleh kosong (`not null`).
- `password`: Tipe data `varchar(100)`, tidak boleh kosong (`not null`). **Penting:** Pada tahap implementasi, pastikan password ini di-hash (misal menggunakan bcrypt) sebelum disimpan ke database. Jangan pernah menyimpan password dalam bentuk teks asli (plain text).
- `created_at`: Tipe data `timestamp`, set nilai default-nya menjadi waktu saat data dibuat (`default current_timestamp`).
- `updated_at`: Tipe data `timestamp`, set nilai default-nya menjadi waktu saat data dibuat/diubah (`default current_timestamp`).

### Tahap 2: Menyiapkan Struktur Folder
Agar kode proyek kita rapi dan mudah di-maintain, kita akan memisahkan tanggung jawab (separation of concerns). Buatlah struktur folder dan file berikut di dalam direktori `src/`:
- **a. Route (`src/routes/user.route`)**: File ini bertugas hanya untuk mendaftarkan HTTP routing. Arahkan URL yang diminta ke controller yang tepat.
- **b. Controller (`src/controllers/user.controller`)**: File ini adalah otak/logika dari aplikasi kita. Di sini, kamu bertugas menangani request dari user, memvalidasi input, memanggil fungsi di model, dan meracik response yang akan dikembalikan ke user.
- **c. Model (`src/models/user.model`)**: File ini bertugas murni untuk berkomunikasi dengan database. Semua perintah query SQL (seperti INSERT user baru) diletakkan di sini.

### Tahap 3: Membuat Endpoint Registrasi
Daftarkan routing HTTP (di dalam folder route) untuk endpoint pendaftaran user baru dengan spesifikasi berikut:
- **Method:** `POST`
- **URL/Path:** `/api/v1/register`

### Tahap 4: Menangani Request (Input dari User)
Endpoint yang kamu buat harus mampu menerima dan membaca data berbentuk JSON dari Request Body dengan format persis seperti ini:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "secretpassword"
}
```
*Tugas di Controller:* Tangkap nilai `name`, `email`, dan `password` dari request body ini untuk diproses lebih lanjut.

### Tahap 5: Menangani Response Sukses
Apabila proses penyimpanan data ke database berhasil dilakukan, kembalikan HTTP Response ke client dengan format JSON seperti ini:
```json
{
  "status": 201,
  "message": "Success"
}
```
*(Gunakan HTTP Status Code: `201 Created` untuk menandakan data berhasil dibuat)*

### Tahap 6: Menangani Response Gagal
Apabila terjadi kegagalan pada proses registrasi, misalnya karena **email yang dimasukkan sudah terdaftar** di dalam tabel, tangkap error tersebut dan kembalikan HTTP Response dengan format JSON berikut:
```json
{
  "status": 400,
  "message": "Failed",
  "error": "Email already exists"
}
```
*(Gunakan HTTP Status Code: `400 Bad Request`)*

---
**Catatan Tambahan untuk Implementator:**
- Jangan lupa untuk membungkus logikamu menggunakan `try-catch` block (atau mekanisme error handling lainnya) agar aplikasi tidak crash jika terjadi error yang tidak terduga.
- Ingat kembali untuk melakukan hashing pada password di bagian Controller sebelum mengirimnya ke Model!
