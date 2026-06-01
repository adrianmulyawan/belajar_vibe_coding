# Issue: Implementasi Endpoint User Profile (Melihat User yang Sedang Login)

**Tujuan:**
Mengimplementasikan fungsionalitas untuk melihat data profil user yang sedang login. Endpoint ini memerlukan autentikasi menggunakan token yang didapat dari proses login sebelumnya.

**Deskripsi Tugas untuk Junior Programmer / AI Agent:**
Silakan ikuti tahapan-tahapan di bawah ini secara berurutan untuk menyelesaikan tugas ini. Pastikan untuk membaca dengan teliti setiap spesifikasi yang diberikan.

### Tahap 1: Memahami Alur Autentikasi
Sebelum mulai mengerjakan, pahami dulu alur kerja autentikasi yang sudah ada di aplikasi ini:
1. User melakukan **login** melalui `POST /api/v1/login` dan mendapatkan sebuah **token** di response.
2. Token tersebut disimpan di tabel `sessions` di database, bersama dengan `user_id` pemiliknya.
3. Untuk mengakses endpoint yang membutuhkan autentikasi (seperti *profile*), user harus mengirimkan token tersebut melalui **Request Header**.

Jadi tugasmu di sini adalah: menerima token dari header, mencari siapa pemilik token tersebut di tabel `sessions`, lalu mengembalikan data user-nya.

### Tahap 2: Menyiapkan/Memperbarui Struktur Folder
Lanjutkan pengerjaan pada struktur folder MVC (Route-Controller-Model) yang sudah ada di folder `src/`. Kamu akan memodifikasi file-file berikut:
- **a. Route (`src/routes/user.route.ts`)**: Tambahkan HTTP routing baru untuk endpoint profile di sini.
- **b. Controller (`src/controllers/user.controller.ts`)**: Tambahkan logika/fungsi baru untuk menangani request profile. Fungsi ini bertugas membaca token dari header, memvalidasinya, dan menyusun *response* berisi data user.
- **c. Model (`src/models/user.model.ts`)**: Tambahkan fungsi untuk melakukan *query* ke database, misalnya untuk mencari sesi berdasarkan token dan mengambil data user terkait.

### Tahap 3: Membuat Endpoint User Profile
Daftarkan routing HTTP baru pada file Route dengan spesifikasi berikut:
- **Method:** `GET`
- **URL/Path:** `/api/v1/user/profile`

### Tahap 4: Menangani Request (Membaca Token dari Header)
Endpoint ini **tidak** menerima data dari Request Body. Sebagai gantinya, endpoint ini membaca token dari **Request Header** dengan format berikut:
```
Authorization: Bearer <token>
```
*Tugas di Controller:* Ambil nilai header `Authorization`, lalu ekstrak bagian token-nya (bagian setelah kata "Bearer "). Gunakan token ini untuk mencari data sesi di tabel `sessions`.

### Tahap 5: Menangani Response Sukses
Apabila token valid dan ditemukan di tabel `sessions`, ambil data user yang terhubung dengan sesi tersebut (berdasarkan `user_id`), lalu kembalikan HTTP Response ke client dengan format JSON seperti ini:
```json
{
  "status": 200,
  "message": "Success",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```
*(Gunakan HTTP Status Code: `200 OK`. **Penting:** Jangan pernah mengembalikan field `password` di response!)*

### Tahap 6: Menangani Response Gagal
Apabila token tidak dikirim, formatnya salah, atau tidak ditemukan di tabel `sessions`, kembalikan HTTP Response dengan format JSON berikut:
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
- **Sangat Penting:** Saat mengembalikan data user, pastikan kamu **tidak menyertakan field `password`** di dalam response. Hanya kembalikan data yang aman seperti `id`, `name`, dan `email`.
- Untuk mengambil nilai header di Elysia, kamu bisa menggunakan `context.headers["authorization"]` atau cara yang setara.
