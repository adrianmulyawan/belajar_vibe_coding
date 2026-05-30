# Issue: Implementasi Endpoint Login User

**Tujuan:**
Mengimplementasikan fungsionalitas login untuk user, mencakup pembuatan tabel database untuk melacak sesi (session), dan pembuatan endpoint API untuk autentikasi kredensial.

**Deskripsi Tugas untuk Junior Programmer / AI Agent:**
Silakan ikuti tahapan-tahapan di bawah ini secara berurutan untuk menyelesaikan tugas ini. Pastikan untuk membaca dengan teliti setiap spesifikasi yang diberikan.

### Tahap 1: Persiapan Database (Membuat Tabel `sessions`)
Buatlah sebuah tabel baru di database dengan nama `sessions`. Tabel ini akan menyimpan riwayat sesi login user.
Berikut adalah spesifikasi kolom yang wajib dibuat:
- `id`: Tipe data `integer`, jadikan sebagai `primary key`, dan set ke `auto increment`.
- `user_id`: Tipe data `integer`, merupakan `foreign key` yang mereferensikan kolom `id` pada tabel `users`. Kolom ini tidak boleh kosong (`not null`).
- `created_at`: Tipe data `timestamp`, set nilai default-nya menjadi waktu saat data dibuat (`default current_timestamp`).
- `updated_at`: Tipe data `timestamp`, set nilai default-nya menjadi waktu saat data dibuat/diubah (`default current_timestamp`).

### Tahap 2: Menyiapkan/Memperbarui Struktur Folder
Lanjutkan pengerjaan pada struktur folder MVC (Route-Controller-Model) yang sudah ada di folder `src/`. Kamu bisa memodifikasi file yang sudah ada:
- **a. Route (`src/routes/user.route.ts`)**: Tambahkan HTTP routing baru untuk login di sini.
- **b. Controller (`src/controllers/user.controller.ts`)**: Tambahkan logika/fungsi baru untuk menangani request login. Fungsi ini bertugas memvalidasi request, mengecek *password*, menghasilkan/membuat token, dan menyusun *response*.
- **c. Model (`src/models/user.model.ts`)**: Tambahkan fungsi untuk melakukan *query* terkait sesi, misalnya untuk *INSERT* data sesi baru ke tabel `sessions`.

### Tahap 3: Membuat Endpoint Login
Daftarkan routing HTTP baru pada file Route dengan spesifikasi berikut:
- **Method:** `POST`
- **URL/Path:** `/api/v1/login`

### Tahap 4: Menangani Request (Input dari User)
Endpoint harus mampu menangkap dan membaca data berformat JSON dari Request Body persis seperti format ini:
```json
{
  "email": "johndoe@example.com",
  "password": "secretpassword"
}
```

### Tahap 5: Menangani Response Sukses (Login Berhasil)
Apabila user mengirim email yang terdaftar dan password yang cocok, lakukan pembuatan data di tabel `sessions`, lalu kembalikan HTTP Response ke client dengan format JSON seperti ini:
```json
{
  "status": 200,
  "message": "Success",
  "token": "token"
}
```
*(Catatan: Nilai pada field "token" dapat berupa token sesi statis sederhana, UUID, atau JWT token sesuai instruksi tambahan nantinya. Gunakan HTTP Status Code: `200 OK`)*

### Tahap 6: Menangani Response Gagal (Login Gagal)
Apabila terjadi kegagalan (misal: email tidak ditemukan, atau password salah), kembalikan HTTP Response dengan format JSON berikut:
```json
{
  "status": 400,
  "message": "Failed",
  "error": "Invalid credentials"
}
```
*(Gunakan HTTP Status Code: `400 Bad Request`)*

---
**Catatan Tambahan untuk Implementator:**
- Jangan lupa menggunakan `try-catch` block untuk melakukan penanganan *error*.
- **Sangat Penting:** Saat memverifikasi password, gunakan fungsi komparasi/verifikasi bawaan sistem (seperti `Bun.password.verify` jika menggunakan Bun) untuk membandingkan password teks murni dengan hash yang ada di database. Jangan melakukan perbandingan string biasa!
