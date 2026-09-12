# Portfolio Andika — v2

HTML, CSS, dan JavaScript statis. Tidak perlu npm install, database, API key, atau build.

## Perubahan

- Ketiga proyek mempunyai halaman HTML sendiri, bukan dialog/modal.
- Kartu rencana chatbot portfolio diganti dengan chatbot industri OpAlpha, status Completed.
- OpAlpha hanya berupa dokumentasi; tidak ada input chat, backend chatbot, atau live demo.
- Dokumentasi proyek berisi template, UI contoh, dan tempat media yang diberi label.
- Hero tanpa gambar, tema Japanese minimalist, dan susunan kartu tetap dipertahankan.

## Menjalankan

Ekstrak ZIP dan buka `portfolio-andika/index.html` menggunakan browser modern.
Seluruh tautan memakai path relatif dan berfungsi ketika dibuka dari file lokal.

Untuk server lokal, buka terminal di folder portfolio-andika:

```bash
python -m http.server 8000
```

Di Windows dapat menggunakan `py -m http.server 8000`.
Buka http://localhost:8000 dan gunakan Ctrl+C untuk menghentikan server.
Internet hanya dibutuhkan untuk font Google dan tautan eksternal. Font sistem menjadi fallback saat offline.

## Peta file

| File | Fungsi |
|---|---|
| index.html | Homepage enam section dan tiga kartu proyek |
| styles.css | Tema dan komponen homepage bersama |
| case-study.css | Layout seluruh halaman studi kasus |
| app.js | Navigasi mobile bersama; tidak berisi chatbot atau modal |
| projects/novel-illustration/index.html | Detail SDXL + LoRA |
| projects/injection-molding-vision/index.html | Detail kamera injection molding |
| projects/opalpha-chatbot/index.html | Detail chatbot industri OpAlpha |
| assets/project-preview.png | Ilustrasi mockup lama, ditampilkan dengan CSS crop |
| assets/icodsa-certificate.pdf | Sertifikat penulis ICoDSA yang sudah diberikan |
| assets/projects/ | Folder untuk menempatkan dokumentasi asli |
| EDITING_GUIDE.md | Petunjuk mengganti prototipe dengan konten asli |

## Status konten

Status OpAlpha Completed berasal dari konfirmasi pemilik. Percakapan, angka 3/5 mesin,
contoh regex, alur teknis rinci, dan skenario pengujian di dokumentasinya adalah contoh,
bukan rekaman operasional atau hasil pengujian asli. Tidak ada klaim penggunaan LLM.

Gambar LoRA/kamera adalah ilustrasi dari mockup. Video belum dilampirkan sehingga
area video berisi penjelasan, bukan tombol play palsu. CV belum disertakan.

Sertifikat ICoDSA adalah file asli yang diberikan pemilik, bukan prototipe.

## Hosting

Unggah seluruh isi folder portfolio-andika ke hosting statis. `index.html` adalah
entrypoint; folder `projects` dan `assets` harus ikut diunggah. Tidak diperlukan
rewrite SPA. URL eksplisit `projects/nama-proyek/index.html` bekerja di hosting
statis dan saat membuka file lokal. Pada hosting yang mendukung directory index,
URL `projects/nama-proyek/` juga bisa digunakan.

ZIP ini adalah versi source untuk diedit lokal. Tidak mengubah website yang sudah online.
