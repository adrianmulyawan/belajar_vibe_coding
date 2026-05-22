# Project Setup: Bun + Elysia JS + Drizzle + MySQL

## Deskripsi Tugas
Tugas ini bertujuan untuk menginisialisasi proyek backend baru di folder ini menggunakan runtime Bun, framework web Elysia JS, Drizzle ORM, dan database MySQL.

## Instruksi High-Level
Silakan ikuti langkah-langkah berikut untuk mengimplementasikan proyek:

1. **Inisialisasi Proyek Bun:**
   - Inisialisasi proyek baru menggunakan Bun di direktori ini untuk membuat struktur dasar (seperti `package.json` dan `tsconfig.json`).

2. **Instalasi Dependensi Utama:**
   - Instal **Elysia JS** sebagai framework backend.
   - Instal **Drizzle ORM** beserta driver **MySQL** yang sesuai (misalnya `mysql2`).
   - Instal tools tambahan untuk database seperti `drizzle-kit` (sebagai dependensi development).

3. **Setup Konfigurasi Database:**
   - Siapkan file konfigurasi koneksi Drizzle ke database MySQL.
   - Gunakan file `.env` untuk menyimpan kredensial koneksi database secara aman.

4. **Inisialisasi Aplikasi (Entry Point):**
   - Buat file utama untuk menjalankan server (misalnya `src/index.ts`).
   - Konfigurasikan instance Elysia JS dan hubungkan dengan instance Drizzle.

5. **Pembuatan Endpoint Verifikasi:**
   - Buat sebuah route dasar (misalnya `GET /`) yang mengembalikan pesan sederhana untuk memastikan server berjalan.
   - Pastikan aplikasi dapat berjalan dengan lancar menggunakan runtime Bun.
