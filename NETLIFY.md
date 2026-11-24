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
- Saat ini data aplikasi dan pesan demo disimpan di `localStorage` browser. Deploy membuat webapp dapat dibuka melalui internet, tetapi **tidak** menyinkronkan data antara anggota tim atau perangkat. Login, database bersama, dan chat real-time memerlukan layanan backend tersendiri.
- Alamat Netlify baru bisa dibuat setelah Anda masuk ke akun Netlify dan membuat/menghubungkan site. Jangan bagikan data sensitif melalui versi demo ini.
