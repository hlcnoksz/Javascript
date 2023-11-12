//! ÜRÜNLERİ OLUŞTURUYORUZ
const urunler = [
    {
        id: "obje1",
        isim: "Acer Swift",
        kategori: "Teknoloji",
        fiyat: "15.475"
    },
    {
        id: "obje2",
        isim: "ACER Nitro 5",
        kategori: "Teknoloji",
        fiyat: "15.475"
    },
    {
        id: "obje3",
        isim: "LENOVO V15",
        kategori: "Teknoloji",
        fiyat: "10.999"
    },
    {
        id: "obje4",
        isim: "LENOVO V14",
        kategori: "Teknoloji",
        fiyat: "4.399"
    },
    {
        id: "obje5",
        isim: "LENOVO Ideapad",
        kategori: "Teknoloji",
        fiyat: "4.510"
    },
    {
        id: "obje6",
        isim: "MacBook Pro M2 Max",
        kategori: "İmam",
        fiyat: "169.999"
    },
    {
        id: "obje7",
        isim: "Apple",
        kategori: "teknoloji",
        fiyat: "16.000"
    }
];

const urunlerContainer = document.querySelector(".urunler-container");

//! AÇILIŞTA TÜM ÜRÜNLERİ GÖSTERME
window.addEventListener('DOMContentLoaded', sayfaYuklendiginde)
function sayfaYuklendiginde() {
    divOlusturma(urunler);
}




//! BOŞ DİV OLUŞTURMA
function divOlusturma(gelenUrunler) {
    //* Gelenurunlere göre boş div oluşturuyoruz
    gelenUrunler.forEach((gelenUrun) => {
        const yeniUrunDiv = document.createElement("div");
        yeniUrunDiv.classList.add("urun-container");

        const gelenUrunIndex = parseInt(gelenUrun.id.replace("obje", ""));
        yeniUrunDiv.id = `urun${gelenUrunIndex}`;
        document.querySelector(".urunler-container").appendChild(yeniUrunDiv);

        const eslestiMi = isFavorite(gelenUrun);
          
        urunleriGoster(gelenUrun, yeniUrunDiv, gelenUrunIndex, eslestiMi);
    });
}




//! FAVORİ URUNLER DİZİSİNDE GELEN URUN VARMI
function isFavorite(urun) {
    return favoriUrunler.some(favori => (
        favori.isim === urun.isim &&
        favori.kategori === urun.kategori &&
        favori.fiyat === urun.fiyat
    ));
}




//! ÜRÜNLERİ GÖSTERİYORUZ
function urunleriGoster(urunObje, hedefDiv, index, eslestiMi) {

    const urunBilgiHTML = `
    <div class="urun-bilgi">
        <h1>Ürün ${index} </h1>             
        <p>Ürün İsmi: ${urunObje.isim}</p>
        <p>Kategori: ${urunObje.kategori}</p>
        <p>Fiyat: ${urunObje.fiyat} TL</p>
    </div>
    `;


    const urunButtons = document.createElement("div");
    urunButtons.classList.add("urun-buttons");

    const sepeteEkleButton = document.createElement("button");
    sepeteEkleButton.id = `sepeteEkleButton${index}`;
    sepeteEkleButton.classList.add("sepeteEkleButton");
    sepeteEkleButton.textContent = "Sepete Ekle";

    const i = document.createElement("i");
    i.id = `favori${index}`;
    i.classList.add("fa-solid", "fa-heart-circle-plus", "fa-beat", "galpcikler");

    if (eslestiMi) {
        i.style.color = "red";
        i.classList.remove("fa-beat");
    }

    urunButtons.appendChild(sepeteEkleButton);
    urunButtons.appendChild(i);

    hedefDiv.innerHTML += urunBilgiHTML;
    hedefDiv.appendChild(urunButtons);
}