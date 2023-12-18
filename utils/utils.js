require("dotenv").config();
const axios = require("axios");
const modelApiUri = `${process.env.MODEL_API_URI}/generate_json/`;
const Fuse = require("fuse.js");
const fs = require("fs/promises");

const searchingFoodRecom = (arr, words) => {
  const options = {
    includeScore: true,
    keys: [
      "name",
      "description",
      "Category",
      "Ingredients.ingredient",
      "Instructions.instruction",
    ],
    threshold: 0.6,
  };

  const myIndex = Fuse.createIndex(options.keys, arr);

  const fuse = new Fuse(arr, options, myIndex);

  const result = fuse.search(words);

  return result;
};

const searchingArticle = (arr, words) => {
  const options = {
    includeScore: true,
    keys: [
      "title",
      "content",
    ],
    // threshold: 0.7,
  };

  const myIndex = Fuse.createIndex(options.keys, arr);

  const fuse = new Fuse(arr, options, myIndex);

  const result = fuse.search(words);

  return result;
};

const datafromML = async (ageCategory) => {
  const mlApiResponse = await axios
    .get(modelApiUri + ageCategory, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((data) => { 
      return data.data.recommendations;
    });

  const data = await mlApiResponse;

  const cleanOutput = data.map((val) => {
    const ingredient = val.Ingredient.map((item) => {
      return {
        ingredient: item.replace(/"([^"]+)"/g, "$1"),
      };
    });
    const instruction = val.Instructions.map((item, index) => {
      return {
        stepOrder: index + 1,
        instruction: item.replace(/^"|"$/g, ""),
      };
    });
    
    return {
      foodRecom: {
        name: val.Name,
        description: val.Description,
        img: val.Images,
        Category: val.Category,
        agregateRating: val.AggregatedRating,
        reviewCount: val.ReviewCount,
      },
      nutritionInfo: {
        calories: val.Calories,
        fat: val.Fat,
        saturatedFat: val.SaturatedFat,
        cholesterol: val.Cholesterol,
        sodium: val.Sodium,
        carbohydrates: val.Carbohydrate,
        fiber: val.Fiber,
        sugar: val.Sugar,
        protein: val.Protein,
      },
      Ingredient: ingredient,
      Instruction: instruction,
    };
  });

  return cleanOutput;
};

const paginateFoodRecom = (array, limit) => {
  const shuffled = [...array];
  let paginated;

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  if (!limit) {
    return shuffled;
  }

  paginated = shuffled.slice(0, limit);

  return paginated;
};

// const articleDatas = [
//   {
//     author: [
//       {
//         name: "Nur Handayani Utami",
//       },
//       {
//         name: "Rofingatul Mubasyiroh",
//       },
//     ],
//     article: {
//       title:
//         "MASALAH GIZI BALITA DAN HUBUNGANNYA DENGAN INDEKS PEMBANGUNAN KESEHATAN MASYARAKAT",
//       publicationDate: "Nov 5, 2019",
//       url: "https://pgm.persagi.org/index.php/pgm/article/view/643",
//       content:
//         "Masalah gizi kurang dan gizi lebih pada balita masih menjadi tantangan dalam perbaikan kesehatan masyarakat di Indonesia. Berdasarkan hasil Riset Kesehatan Dasar (Riskesdas) 2013 telah dikembangkan Indeks Pembangunan Kesehatan Masyarakat (IPKM) yang dapat menjadi arah dalam menentukan prioritas pembangunan di bidang kesehatan. Analisis ini dilakukan untuk mengetahui peran dari IPKM dan komponenkomponen penyusunnya dengan masalah gizi balita (gizi buruk-kurang, pendek dan gemuk) di Indonesia. IPKM 2013 terdiri dari 7 indeks, yaitu kesehatan balita, kesehatan reproduksi, pelayanan kesehatan, perilaku kesehatan, penyakit tidak menular, penyakit menular, serta kesehatan lingkungan. Analisis one way anova dilakukan untuk menganalisis perbedaan rerata antara prevalensi kurang gizi berdasarkan kategori nilai IPKM, sedangkan pada analisis kegemukan dengan kategori nilai IPKM dilakukan analisis Kruskal-Wallis. Analisis hubungan antara prevalensi gizi kurang dan gizi lebih dengan IPKM dilakukan dengan menggunakan analisis regresi linear. Analisis rerata prevalensi kurang gizi menurut kelompok IPKM menunjukkan kecenderungan semakin tinggi IPKM suatu daerah semakin rendah prevalensi kurang gizi pada balita. Analisis regresi linear menunjukkan bahwa terdapat hubungan yang siknifikan antara indeks-indeks dalam IPKM dengan prevalensi gizi kurang, dimana indeks kesehatan reproduksi memberikan kontribusi yang paling besar terhadap penurunan prevalensi gizi kurang balita. Sementara analisis prevalensi kegemukan menurut kelompok IPKM menunjukkan tidak adanya perbedaan prevalensi kegemukan dengan kelompok IPKM. Analisis regresi linear juga menunjukkan hubungan yang lemah antara indeks-indeks IPKM dengan prevalensi kegemukan pada balita.",
//     },
//   },
//   {
//     author: [
//       {
//         name: "Aris Amirullah",
//       },
//       {
//         name: "Aris Try Andreas Putra",
//       },
//       {
//         name: "Aris Armeth Daud Al Kahar",
//       },
//     ],
//     article: {
//       title:
//         "Deskripsi Status Gizi Anak Usia 3 Sampai 5 Tahun Pada Masa Covid 19",
//       publicationDate: "Juli 2020",
//       url: "https://doi.org/10.37985/murhum.v1i1.3",
//       content: `Pola makan adalah cara seorang atau sekelompok orang yang memilih dan mengonsumsi makanan sebagai tanggapan terhadap pengaruh fisiologi, psikologi, budaya, dan sosial. Data di Sulawesi Utara untuk 2013 menunjukkan prevalensi status gizi BB/TB<-2SD tahun 2013 adalah 10%. Kabupaten bolaang mongondow timur berdasarkan data jumlah penderita gizi buruk setiap tahun mengalami penurunan. Pada tahun 2017 kasus gizi buruk di Boltim berjumlah 2 orang. Pada tahun 2018 kasus bertambah tiga orang, sedangkan 2019 turun menjadi satu orang. Biasanya penyakit ini menyerang anak-anak berumur 0-59 bulan. ada upaya perhatian pemerintah terkait dengan penanganan gizi buruk hingga angka peningkatan gizi balita. Metode penelitian yang digunakan adalah metode survey termaksud dalam penelitian Deskriptif. Penelitian ini di laksanakan di PAUD/TK Ekasari Buyat I. Waktu penelitian bulan Februari Sampai Mei 2020. Populasi dan sampel dalam penelitian ini berjumlah 27 orang. Gambaran status Gizi anak gizi anak usia 3 sampai 5 tahun pada masa covid di PAUD/TK Ekasari Buyat I Kabupaten Bolaang Mongondow Timur adalah berada padabatas normal. Pengetahuan orang tua tentang gizi gizi anak usia 3 sampai 5 tahun pada masa covid di PAUD/TK Ekasari Buyat I Kabupaten Bolaang Mongondow Timur sebagian besar dalam keadaan baik.`,
//     },
//   },
//   {
//     author: [
//       {
//         name: "MUKHLIDAH HANUN SIREGAR",
//       },
//       {
//         name: "RATU DIAH KOERNIAWATI",
//       },
//     ],
//     article: {
//       title:
//         "EDUKASI GIZI SEIMBANG MENGGUNAKAN APLIKASI WHATSAPP PADA SISWA MADRASAH ALIYAH DI KABUPATEN BOGOR",
//       publicationDate: "Mei 2021",
//       url: "https://doi.org/10.51878/community.v1i1.148",
//       content: `Remaja adalah kelompok daur hidup yang sangat memerlukan informasi tentang gizi seimbang. Hal ini dikarenakan, remaja mengalami masa transisi menuju dewasa yang perlu asupan gizi yang optimal agar terhindari dari masalah kesehatan. Kegiatan ini dilakukan untuk memberikan informasi gizi seimbang kepada siswa Madrasah Aliyah Daarul Fataa. Edukasi dilakukan menggunakan media sosial Whatsapp dengan mengumpulkan siswa dalam satu grup. Nilai ratarata skor pengetahuan pre dan post test yaitu 21,33 dan 49,33. Dan ditemukan bahwa skor pengetahuan pre dan post test berbeda secara signifikan (pvalue=0,000). Disimpulkan bahwa edukasi menggunakan Whatsapp efektif dalam memberikan informasi dan meningkatkan pengetahuan pada siswa Madrasah Aliyah. Kegiatan ini dapat dilakukan kembali dengan tetap mengupayakan inovasi dalam pemberian materi sehingga umpan balik peserta meningkat.`,
//     },
//   },
//   {
//     author: [
//       {
//         name: "Rindu Dwi Malateki Solihin",
//       },
//       {
//         name: "Faisal Anwar",
//       },
//       {
//         name: "Dadang Sukandar",
//       },
//     ],
//     article: {
//       title:
//         "KAITAN ANTARA STATUS GIZI, PERKEMBANGAN KOGNITIF, DAN PERKEMBANGAN MOTORIK PADA ANAK USIA PRASEKOLAH",
//       publicationDate: "Juni 2013",
//       url: "https://pgm.persagi.org/index.php/pgm/article/view/96",
//       content: `Kegagalan pertumbuhan (stunting) pada anak usia di bawah lima tahun (balita) dapat menyebabkan berbagai gangguan perkembangan, termasuk perkembangan kognitif dan motorik. Penelitian ini bertujuan untuk menganalisis kaitan antara status gizi, perkembangan kognitif dan motorik pada anak usia prasekolah. Penelitian berdesain survei ini dilakukan pada 73 anak usia 3-5 tahun di Desa Cibanteng, Kabupaten Bogor, Jawa Barat. Hasil penelitian menunjukkan bahwa sebanyak 30,2 persen anak balita berstatus gizi tergolong pendek, 98,6 persen anak memiliki berat badan lahir normal, dan 76,7 persen anak mempunyai panjang lahir normal. Tingkat perkembangan kognitif (54,8%) dan motorik halus (68,5%) anak tergolong rendah, sementara tingkat perkembangan motorik kasar anak tergolong sedang (41,1%). Faktor-faktor yang berhubungan signifikan dengan status gizi balita adalah tinggi badan ibu, tingkat kecukupan energi dan protein balita dan panjang badan lahir balita. Faktor-faktor yang berkaitan signifikan dengan tingkat perkembangan motorik kasar dan motorik halus balita adalah status gizi balita, lama mengikuti PAUD dan usia balita. Faktor-faktor yang berhubungan signifikan dengan tingkat perkembangan kognitif balita adalah status gizi balita, usia balita, lama mengikuti PAUD dan praktik pengasuhan balita oleh ibu. Tingkat kecukupan gizi balita, terutama energi dan protein, berhubungan dengan status gizi dan perkembangan mereka.`,
//     },
//   },
//   {
//     author: [
//       {
//         name: "Reska Handayani",
//       },
//     ],
//     article: {
//       title: `FAKTOR-FAKTOR YANG BERHUBUNGAN DENGAN STATUS GIZI PADA ANAK BALITA`,
//       publicationDate: "June 2017",
//       url: "https://ejournal.lldikti10.id/index.php/endurance/article/view/1742",
//       content: `Data Dinas Kesehatan Kota Padang Tahun 2012 Kecamatan Padang Timur mendapatkan urutan ke tiga dari angka kejadian status gizi berat badan sangat kurang yang terdapat di Puskesmas Seberang Padang dengan pravelensi kejadiannya yaitu 4,67%. Tujuan penelitian untuk mengetahui faktor-faktor yang berhubungan dengan status gizi pada anak balita di wilayah kerja Puskesmas Seberang Padang tahun 2014. Jenis penelitian deskriptif analitik dengan desain cross sectional. Penelitian dilakukan di RW 1 Kelurahan Seberang Padang Wilayah Puskesmas Seberang Padang pada bulan Juli sampai dengan Agustus 2014. Populasi dalam penelitian ibu yang mempunyai anak balita sebanyak 80 orang. Seluruh Populasi dijadikan sampel. Pengolahan data secara komputerisasi, dianalisa secara univariat dengan distribusi frekuensi dan bivariat menggunakan uji Chi-Square dengan pvalue < 0,05. Hasil penelitian didapatkan (63,8%) anak balita memiliki riwayat penyakit infeksi, (55,0%) pola asuh ibu tidak baik, dan (61,3%) anak balita memiliki status gizi kurang. Setelah dilakukan uji statistik ChiSquare terdapat hubungan yang bermakna antara riwayat penyakit infeksi (p value = 0,001) dan pola asuh (p value = 0,003) dengan status gizi pada anak balita. Penelitian ini menyimpulkan bahwa variabel penyakit infeksi dan pola asuh memiliki hubungan yang bermakna dengan status gizi pada anak balita.`,
//     },
//   },
// ];

module.exports = {
  paginateFoodRecom,
  datafromML,
  searchingFoodRecom,
  searchingArticle,
};
