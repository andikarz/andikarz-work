# Panduan foto dan dokumentasi

Website tetap statis: tidak ada admin, upload online, database, atau proses build.
Untuk menambah foto, simpan file ke folder lalu edit **media-config.js**.
Buka **index.html** untuk melihat hasil. Hero tetap tanpa gambar.

## 1. Lokasi foto

| Bagian | Folder foto | Bagian konfigurasi |
|---|---|---|
| Foto diri di About | assets/photos/profile/ | profile |
| Magang Rucika | assets/photos/rucika/ | galleries["experience-rucika"] |
| Penelitian | assets/photos/research/ | galleries["experience-research"] |
| Asisten praktikum | assets/photos/teaching/ | galleries["experience-teaching"] |
| Detail LoRA | assets/projects/lora/ | galleries["project-lora"] |
| Detail kamera | assets/projects/vision/ | galleries["project-vision"] |
| Detail OpAlpha | assets/projects/opalpha/ | galleries["project-opalpha"] |

File README di folder foto hanya petunjuk. Tidak perlu dihapus.
Foto di dalam folder **tidak ditemukan secara otomatis**; setiap foto harus didaftarkan
pada `media-config.js`. Ini membuat urutan dan caption dapat diatur tanpa server.

## 2. Mengganti foto profil

Simpan foto sebagai `assets/photos/profile/andika.webp`. Di `media-config.js`, ubah:

```js
profile: {
    enabled: true,
    src: "assets/photos/profile/andika.webp",
    alt: "Foto Andika Rizki Putra Pamungkas",
    title: "Andika Rizki Putra Pamungkas",
    caption: "Tulis caption foto kamu di sini.",
    placeholder: "Profile photo",
    position: "50% 35%",
    fit: "cover"
},
```

Path **selalu dari folder utama website**, tanpa awalan `/` atau `../../`.
JavaScript menangani path homepage dan halaman detail secara otomatis.
Nama file harus sama persis, termasuk huruf besar/kecil, karena VPS Linux membedakannya.

`position` mengatur letak crop thumbnail, misalnya `"50% 20%"` untuk menaikkan fokus wajah.
Tampilan besar menampilkan seluruh foto; tidak mengikuti crop thumbnail.

## 3. Mengganti atau menambahkan foto magang

Simpan, misalnya:

- `assets/photos/rucika/kegiatan-01.webp`
- `assets/photos/rucika/kegiatan-02.webp`

Pada grup `experience-rucika`, edit `items`:

```js
items: [
    {
        src: "assets/photos/rucika/kegiatan-01.webp",
        alt: "Jelaskan apa yang terlihat pada foto pertama",
        title: "Judul dokumentasi pertama",
        caption: "Keterangan kegiatan dan kontribusi kamu yang sebenarnya.",
        position: "50% 50%",
        fit: "cover"
    },
    {
        src: "assets/photos/rucika/kegiatan-02.webp",
        alt: "Jelaskan apa yang terlihat pada foto kedua",
        title: "Judul dokumentasi kedua",
        caption: "Keterangan kegiatan pada foto kedua.",
        fit: "cover"
    }
]
```

Untuk menambah foto ketiga, tambahkan objek berikutnya, dipisahkan koma.
Urutan objek menentukan urutan foto. Jangan menghapus tanda kurung konfigurasi utama.
Cara yang sama berlaku untuk penelitian, asisten praktikum, dan proyek.

## 4. Opsi item dan galeri

| Field | Kegunaan |
|---|---|
| src | Path file. Nilai kosong `""` menampilkan placeholder tanpa request gambar |
| alt | Deskripsi isi foto untuk pembaca layar |
| title | Judul singkat di bawah foto dan tampilan besar |
| caption | Keterangan kegiatan/hasil yang benar |
| placeholder | Judul slot saat belum ada foto |
| position | Fokus crop thumbnail, default `"50% 50%"` |
| fit | `"cover"` untuk foto; `"contain"` untuk screenshot agar tidak terpotong |
| enabled | Set `false` untuk menyembunyikan satu item, profil, atau seluruh grup |

Contoh menyembunyikan satu item:

```js
{ enabled: false, src: "", title: "Foto tambahan" }
```

Contoh menyembunyikan seluruh galeri penelitian: ubah `enabled` pada grup
`experience-research` menjadi `false`. `items: []` juga menyembunyikan grup.
Menghapus objek foto tidak menghapus file fisiknya.

Placeholder netral tidak berpura-pura menjadi foto asli. Jika path salah atau gambar
tidak bisa dimuat, tampil `Photo unavailable`; periksa nama, ekstensi, dan lokasinya.

## 5. Dokumentasi pada halaman detail

Galeri baru ada di bagian Documentation di ketiga halaman proyek.
Konten, hasil LoRA, dan ilustrasi yang sudah ada tetap dipertahankan.
Galeri ini melengkapi dokumentasi lama; tidak otomatis mengganti gambar pada markup lama.

Contoh menggunakan aset LoRA yang sudah ada dalam ZIP:

```js
{
    src: "assets/projects/lora/result-02.webp",
    alt: "Deskripsi hasil generasi kedua",
    title: "Hasil generasi kedua",
    caption: "Tuliskan prompt dan konfigurasi yang benar untuk hasil ini.",
    fit: "contain"
}
```

Tautan homepage menuju detail kamera dan OpAlpha masih dalam komentar HTML, sesuai
source yang kamu kirim. Untuk mengaktifkannya ketika dokumentasi siap, buka `index.html`
dan hapus pembungkus `<!--` serta `-->` pada link View Case Study yang sesuai.
Halaman detailnya tetap bisa dibuka langsung dari folder `projects`.

## 6. Cara melihat foto

Foto yang berhasil dimuat dapat diklik untuk diperbesar. Gunakan:

- Tombol panah atau tombol keyboard kiri/kanan untuk berpindah dalam galeri yang sama.
- Escape atau tombol × untuk menutup dan kembali ke pemicu foto.
- Tombol panah dinonaktifkan jika hanya ada satu foto yang berhasil dimuat.

Placeholder tidak dapat diperbesar karena belum memiliki file foto.
Tidak ada perintah upload, login, atau data yang dikirim ke layanan lain untuk galeri.

## 7. Format dan ukuran

Gunakan JPG, PNG, atau WebP yang bisa dibuka browser. HEIC sebaiknya diekspor ke JPG/WebP.
Foto profil dengan rasio 4:5 cocok untuk slot yang disediakan. Thumbnail kegiatan memakai
rasio 4:3, sementara `fit: "contain"` menjaga screenshot tetap utuh.

Untuk menjaga website ringan, gunakan salinan foto web berukuran sekitar 1200–1600 px
pada sisi terpanjang sesuai kebutuhan, bukan file kamera puluhan megabita. Pastikan
teks screenshot tetap terbaca. Isi caption, jangan mengandalkan teks kecil di gambar.

## 8. Update ke VPS dan cache

1. Tambahkan foto dan edit `media-config.js` di repository lokal.
2. Jika gambar diganti dengan nama file sama, naikkan `assetVersion`, misalnya
   dari `"photos-1"` menjadi `"photos-2"`. Versi ini ditambahkan ke URL gambar secara otomatis.
3. Saat konfigurasi foto atau kode diubah, naikkan query versi script/CSS di **keempat HTML**
   yang berubah, misalnya `media-config.js?v=photos-2`.
4. Commit dan push, lalu pull pada folder repository yang dilayani Nginx.
5. Periksa website; jika masih versi lama, hapus cache URL terkait di Cloudflare dan reload browser.

Versi script dan `assetVersion` gambar adalah dua hal berbeda. Mengubah `assetVersion`
saja tidak membantu jika browser masih menerima file `media-config.js` lama.
Nama file baru seperti `kegiatan-03.webp` juga membantu menghindari cache gambar lama.

Paket awal ini sudah memakai query `?v=photos-1` secara konsisten untuk asset CSS/JS
pada homepage dan ketiga halaman detail. Tidak perlu mengubah konfigurasi Nginx.

## 9. File yang ditambah/diubah

Ditambah: `media-config.js`, `photo-gallery.js`, `photo-gallery.css`, `PHOTO_GUIDE.md`,
dan empat folder foto beserta README.

Diubah: empat file HTML untuk memasang slot galeri dan script/CSS; README dan
EDITING_GUIDE untuk menautkan petunjuk ini. `app.js`, CSS lama, CV, sertifikat, gambar
LoRA, serta media lain dari source kiriman dipertahankan.

## Pemeriksaan setelah mengedit

- Buka semua halaman; pastikan tidak ada error konfigurasi JavaScript.
- Coba foto profil, galeri magang, dan gambar pada halaman detail.
- Periksa caption, alt, urutan, crop, dan pembesaran foto.
- Periksa mobile serta navigasi keyboard.
- Pastikan foto kerja yang kamu pilih memang boleh ditampilkan di portfolio.
