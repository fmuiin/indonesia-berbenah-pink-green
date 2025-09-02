# Brave Pink & Hero Green Filter

Aplikasi Next.js untuk mengubah warna foto dengan filter tritone menggunakan warna-warna yang bermakna: **Brave Pink**, **Hero Green**, dan **Resistance Blue**.

## 🇮🇩 Solidaritas SalingJaga - Mengapa Aplikasi Ini Dibuat

Aplikasi ini dibuat sebagai bentuk **solidaritas dan dukungan** terhadap gerakan **SalingJaga** masyarakat Indonesia. Di tengah situasi yang penuh tantangan, kita menyaksikan bagaimana seluruh lapisan masyarakat Indonesia menunjukkan keberanian dan keteguhan dalam memperjuangkan nilai-nilai yang mereka yakini.

### 🎨 Warna dan Maknanya

- **Brave Pink (#E44C99)**: Terinspirasi dari keberanian Ibu Ana yang dengan berani berdiri di depan aparat, memperjuangkan apa yang dia percaya. Bukti bahwa seluruh lapisan masyarakat berhak lantang bersuara dan tidak takut menyampaikan pendapat mereka.

- **Hero Green (#01A923)**: Terinspirasi dari helm Affan, melambangkan harapan dan kekuatan yang tumbuh dari kehilangan. Warna ini mengingatkan kita bahwa dari setiap kehilangan, tumbuh harapan baru dan kekuatan untuk terus berjuang.

- **Resistance Blue (#0D1E91)**: Melambangkan kekuatan kolektif dan keteguhan dalam menghadapi tantangan. Warna ini merepresentasikan solidaritas masyarakat yang bersatu dalam menghadapi berbagai ujian.

### 💪 Pesan Solidaritas

Aplikasi ini bukan sekadar tool untuk mengubah warna foto, tetapi juga sebagai **medium ekspresi solidaritas** dan **dukungan moral** bagi mereka yang berani bersuara. Setiap foto yang diubah dengan filter ini menjadi simbol dukungan terhadap:

- **Hak untuk bersuara** tanpa takut
- **Solidaritas** antar sesama warga negara
- **Harapan** akan masa depan yang lebih baik
- **Kekuatan kolektif** dalam menghadapi tantangan

Mari kita ramaikan timeline dengan **Brave Pink & Hero Green**, share beragam konten, dan suarakan suara kita sendiri melalui dua warna yang penuh makna ini.

## ✨ Fitur

- 📸 Upload foto dengan drag & drop atau file picker
- 🎨 Preview asli dan hasil filter secara berdampingan
- 🎛️ Kontrol slider untuk mengatur posisi mid-tone
- 🎨 Kontrol warna kustom untuk shadow, mid, dan highlight
- 💾 Download hasil sebagai PNG
- 📱 Responsif dan cepat (proses di client-side)
- ⚡ Real-time preview saat mengubah pengaturan

## 🚀 Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka [http://localhost:3000](http://localhost:3000) di browser

## 🛠️ Teknologi

- **Next.js** - React framework
- **React** - UI library
- **TailwindCSS** - Styling
- **Canvas API** - Image processing
- **react-dropzone** - File upload

## 📁 Struktur Project

```
├── components/
│   ├── UploadDropzone.jsx    # Komponen upload dengan drag & drop
│   ├── ImagePreview.jsx      # Preview gambar asli dan hasil
│   └── Controls.jsx          # Kontrol filter dan download
├── pages/
│   ├── _app.js              # App wrapper
│   └── index.js             # Halaman utama
├── utils/
│   └── tritone.js           # Algoritma filter tritone
├── styles/
│   └── globals.css          # Global styles dan TailwindCSS
└── package.json
```

## 🎯 Cara Penggunaan

1. **Upload Foto**: Drag & drop atau klik untuk memilih file gambar
2. **Lihat Preview**: Gambar asli dan hasil filter akan muncul berdampingan
3. **Atur Filter**: 
   - Gunakan slider untuk mengubah posisi mid-tone
   - Klik "Show Advanced" untuk mengubah warna kustom
4. **Download**: Klik tombol "Download Result" untuk menyimpan hasil

## 🔧 Algoritma Tritone

Filter menggunakan algoritma tritone yang membagi tonal range menjadi tiga bagian:
- **Shadow** → **Mid** (transisi dari Resistance Blue ke Brave Pink)
- **Mid** → **Highlight** (transisi dari Brave Pink ke Hero Green)

Setiap pixel dihitung berdasarkan luminance dan dipetakan ke warna yang sesuai menggunakan linear interpolation.

## 📝 Catatan

- Aplikasi memproses gambar di client-side menggunakan Canvas API
- Gambar otomatis di-resize maksimal 1200px untuk performa optimal
- Mendukung format: JPG, PNG, GIF, WebP
- Semua proses dilakukan di browser tanpa mengirim data ke server

## 🤝 Kontribusi

Silakan buka issue atau pull request jika ada saran atau bug yang ditemukan. Kami juga terbuka untuk kontribusi yang dapat meningkatkan aplikasi ini sebagai medium solidaritas.

## 📢 Cara Berpartisipasi

1. **Gunakan aplikasi** untuk mengubah foto Anda dengan filter Brave Pink & Hero Green
2. **Share hasilnya** di media sosial dengan hashtag #SalingJaga #BravePink #HeroGreen
3. **Tag teman-teman** untuk ikut berpartisipasi dalam gerakan solidaritas ini
4. **Spread the message** tentang pentingnya solidaritas dan dukungan sesama

## 🌟 Dukungan untuk Masyarakat Indonesia

Aplikasi ini dibuat dengan semangat **SalingJaga** - saling menjaga, saling mendukung, dan saling menguatkan. Di tengah berbagai tantangan yang dihadapi bangsa Indonesia, kita perlu terus mengingat bahwa:

- **Kita semua berhak bersuara** tanpa takut
- **Solidaritas** adalah kekuatan terbesar kita
- **Harapan** selalu ada di setiap situasi
- **Bersama-sama** kita bisa menghadapi segala tantangan

## 📱 Media Sosial

Gunakan hashtag berikut saat membagikan hasil filter:
- `#SalingJaga`
- `#BravePink`
- `#HeroGreen`
- `#ResistanceBlue`
- `#SolidaritasIndonesia`

---

**Dibuat dengan ❤️ untuk mendukung suara yang berani, harapan yang kuat, dan solidaritas yang tak pernah padam**

*"Bersama kita kuat, bersama kita bisa, bersama kita SalingJaga"* 🇮🇩
