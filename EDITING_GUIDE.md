> **Pembaruan foto:** Foto profil dan galeri kegiatan/proyek sekarang diatur melalui `media-config.js`. Baca [PHOTO_GUIDE.md](PHOTO_GUIDE.md) untuk mengganti placeholder, menambah foto, dan menangani cache.

# Panduan mengganti dokumentasi contoh

## 1. Ubah teks dan status

Edit HTML langsung. Tidak ada CMS atau konten yang dimuat melalui fetch.

- Homepage: `index.html`.
- LoRA: `projects/novel-illustration/index.html`.
- Kamera: `projects/injection-molding-vision/index.html`.
- OpAlpha: `projects/opalpha-chatbot/index.html`.

Setiap halaman memiliki anchor overview, contribution, approach, documentation,
evaluation, dan learning. Pertahankan ID tersebut agar daftar isi tetap berfungsi.
Teks header/footer diulang di setiap HTML; perbarui seluruhnya bila navigasi berubah.

## 2. Ganti gambar proyek

Simpan screenshot asli di folder yang sesuai, misalnya:

- `assets/projects/lora/result-01.webp`
- `assets/projects/vision/screenshot-01.webp`
- `assets/projects/opalpha/chat-01.webp`

Di halaman detail, gunakan path relatif dua tingkat ke atas:

```html
<figure>
  <img class="actual-media"
       src="../../assets/projects/opalpha/chat-01.webp"
       alt="Pertanyaan status mesin dan jawaban chatbot OpAlpha"
       loading="lazy">
  <figcaption>Jelaskan kondisi, pertanyaan, dan respons pada screenshot asli.</figcaption>
</figure>
```

Contoh di atas memerlukan file asli yang kamu tambahkan. Jangan menyalin tag tanpa aset.
Ganti blok `oa-document`, `prompt-result`, `vision-figure`, atau `media-placeholder`
yang relevan. Komentar `EDIT` di HTML menunjukkan contoh lokasi penggantian.

Untuk thumbnail homepage, gunakan `assets/projects/...` tanpa `../../`.
Aset lama menggunakan `.image-window`, `.story-window`, dan `.vision-window` untuk
memotong mockup penuh. Saat menggunakan gambar standalone, hapus wrapper crop itu
atau ganti dengan img biasa dan CSS berikut:

```css
.project-art > .thumbnail {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Gunakan `class="thumbnail"` pada img homepage. Jangan menerapkan aturan crop mockup
lama ke screenshot asli.

## 3. Tambahkan video kamera

Simpan `demo.mp4` dan `poster.webp` di `assets/projects/vision/`.
Ganti seluruh blok `video-placeholder` dengan:

```html
<figure>
  <video class="actual-media" controls preload="metadata"
         poster="../../assets/projects/vision/poster.webp">
    <source src="../../assets/projects/vision/demo.mp4" type="video/mp4">
    Browser tidak mendukung pemutar video ini.
  </video>
  <figcaption>Ringkasan pengujian: kondisi normal, produk tertahan, dan respons sistem.</figcaption>
</figure>
```

Tidak perlu autoplay. Tambahkan subtitle jika penjelasan audio diperlukan untuk
memahami video. Ganti keterangan dengan apa yang benar-benar terjadi dalam demo.

## 4. Isi evaluasi dan arsitektur

- Ganti `Not added yet`, `Not recorded here`, dan `Not documented yet` dengan hasil nyata.
- Angka pada percakapan adalah data dummy; ganti atau pertahankan label data dummy.
- Regex `berapa.*mesin.*aktif` hanya contoh, bukan klaim aturan produksi.
- Sesuaikan alur OpAlpha dengan implementasi asli. Jangan menambahkan integrasi database,
  classifier, atau komponen lain yang tidak digunakan.
- Jelaskan peranmu pada fitur chatbot, bukan seluruh aplikasi OpAlpha.
- Jika belum mempunyai metrik kuantitatif, pakai observasi kualitatif yang dapat dibuktikan.

Hapus banner `Documentation prototype` hanya setelah semua bagian yang ingin
kamu tampilkan sudah diganti dan diverifikasi. Jika sebagian masih contoh,
pertahankan label pada bagian tersebut. Status Completed untuk OpAlpha tidak
berarti bahan dokumentasi contoh adalah bukti hasil asli.

## 5. Pemeriksaan setelah diedit

1. Buka homepage dan ketiga View Case Study.
2. Coba Back to Projects, daftar isi, Next Case Study, serta menu mobile.
3. Periksa gambar, video, sertifikat, dan tautan kontak.
4. Periksa tampilan HP dan zoom browser 200%.
5. Pastikan tidak ada placeholder yang terlihat seperti data hasil asli.

Tidak ada chatbot interaktif di paket ini; seluruh percakapan contoh adalah HTML statis.
