# Publikasikan Ruang Marketing di Netlify
Aplikasi ini adalah situs statis Vite. Netlify membangun proyek dengan `npm run build` dan menerbitkan folder `dist`, sesuai pengaturan di `netlify.toml`.

## Cara yang disarankan: hubungkan repositori Git
1. Buat repositori GitHub baru dan kosong untuk proyek ini. Jangan menambahkan README atau lisensi saat membuatnya.
2. Dari terminal di folder proyek, jalankan:

   ```bash
   git init
   git add .
   git commit -m "Siapkan aplikasi marketing"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```

   Ganti URL remote dengan URL repositori Anda. Jika proyek sudah menjadi repositori Git, jangan jalankan `git init` lagi; tambahkan remote dan push perubahan yang diperlukan.

3. Masuk atau daftar di Netlify, lalu pilih **Add new site** > **Import an existing project**.
4. Hubungkan GitHub, pilih repositori, lalu periksa pengaturan build:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `22` (sudah ditentukan di `netlify.toml`)
5. Pilih **Deploy**. Setelah proses selesai, Netlify memberikan alamat publik `*.netlify.app`. Nama situs bisa diubah melalui pengaturan Site configuration jika nama yang diinginkan tersedia.
6. Setiap push ke branch `main` akan memicu build dan deploy berikutnya.

## Cara deploy manual lewat Netlify CLI
1. Instal Node.js di komputer Anda, buka terminal di folder proyek, lalu jalankan `npm install`.
2. Masuk ke akun Netlify melalui CLI:

   ```bash
   npx netlify-cli login
   ```

3. Jalankan deploy pratinjau pertama kali:

   ```bash
   npx netlify-cli deploy --build
   ```

   CLI akan meminta Anda membuat site atau memilih site, kemudian memberi URL draft untuk diperiksa.

4. Jika pratinjau benar, terbitkan ke URL utama:

   ```bash
   npm run deploy:netlify
   ```

   Perintah itu menerbitkan folder `dist` ke production site yang sudah terhubung di CLI.

## Yang perlu diketahui
- Paket gratis Netlify memiliki batas kuota dan ketentuan yang dapat berubah. Periksa batas terbaru pada halaman pricing Netlify sebelum dipakai.
- Data aplikasi disimpan di database Supabase (gratis hingga 500 MB) + fallback `localStorage` saat offline. Semua tim bisa akses data yang sama dari perangkat mana pun.
- Alamat Netlify baru bisa dibuat setelah Anda masuk ke akun Netlify dan membuat/menghubungkan site.

## Setup Supabase (database + backend)
Aplikasi menggunakan Supabase untuk database bersama. Langkah:

1. **Daftar di [supabase.com](https://supabase.com/)** (gratis, pakai Google/GitHub).
2. **Buat project baru** (pilih region terdekat, misal `Singapore` atau `Tokyo`).
3. **Jalankan skema database**: buka tab **SQL Editor**, paste isi `supabase/schema.sql`, klik **Run**.
4. **Ambil credentials**: masuk ke **Settings > API**, catat:
   - `Project URL` (format `https://xxx.supabase.co`)
   - `anon public key` (berawalan `eyJ...`)
5. **Set env vars di Netlify**:
   - Buka [app.netlify.com](https://app.netlify.com/) > pilih site Anda.
   - **Site configuration** > **Environment variables** > tambahkan:
     - `VITE_SUPABASE_URL` = Project URL
     - `VITE_SUPABASE_ANON_KEY` = anon key
   - Klik **Redeploy** atau push ulang untuk build baru.
6. **(Opsional) Aktifkan Auth**: Supabase Dashboard > Authentication > pilih metode login (email, Google, dll).

### Mode lokal (tanpa Supabase)
Jika `VITE_SUPABASE_URL` belum di-set, aplikasi fallback ke `localStorage` browser. Data tidak sinkron antar perangkat.

## Struktur backend
- `supabase/schema.sql` — skema database + RLS policy
- `src/lib/supabase.js` — client Supabase
- `src/lib/api.js` — operasi CRUD (tasks, posts, projects, sales, messages)
