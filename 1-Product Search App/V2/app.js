//! ÜRÜNLERİ OLUŞTURUYORUZ
const urunler = [
    {
        isim: "Acer Swift",
        kategori: "Teknoloji",
        fiyat: "15.475"
    },
    {
        isim: "ACER Nitro 5",
        kategori: "Teknoloji",
        fiyat: "15.475"
    },
    {
        isim: "LENOVO V15",
        kategori: "Teknoloji",
        fiyat: "10.999"
    },
    {
        isim: "LENOVO V14",
        kategori: "Teknoloji",
        fiyat: "4.399"
    },
    {
        isim: "LENOVO Ideapad",
        kategori: "Teknoloji",
        fiyat: "4.510"
    },
    {
        isim: "MacBook Pro M2 Max",
        kategori: "İmam",
        fiyat: "169.999"
    },
    {
        isim: "Apple",
        kategori: "teknoloji",
        fiyat: "16.000"
    }
];




//! İNPUTTA ARAMA İŞLEMİ
const bulInput = document.getElementById("bulInput");
let filtreliUrunler = [];
bulInput.addEventListener('input', inputaYaziYazilinca);


function inputaYaziYazilinca() {
    let kullaniciArananUrunismi = this.value;
    const urunlerContainer = document.querySelector(".urunler-container");
    //Önceden filtreleme yapıldıysa yeni filtreleme üstüne binmesin diye ekranı temizliyoruz
    while (urunlerContainer.firstChild) {
        urunlerContainer.removeChild(urunlerContainer.firstChild);
    }
    filtreliUrunler = filtreliUrunleriDoldur(urunler, kullaniciArananUrunismi);

    // Ürünleri gösterirken div oluşturup gönderiyoruz.
    filtreliUrunler.forEach((urun, index) => {
       
            const yeniUrunDiv = document.createElement("div");
            yeniUrunDiv.classList.add("urun-container");
            yeniUrunDiv.id = `urun${index + 1}`;
            document.querySelector(".urunler-container").appendChild(yeniUrunDiv);
            urunleriGoster(urun, yeniUrunDiv, index);
        
    });
}



//! Filtreli ürünler değişkene atılıp İnputta Arama İşlemine return ediliyor 
function filtreliUrunleriDoldur(urunler, kullaniciArananUrunismi) {
   return urunler.filter((urun) => {
        const nameMatches = urun.isim.toUpperCase().includes(kullaniciArananUrunismi.toUpperCase());
        const categoryMatches = urun.kategori.toUpperCase().includes(kullaniciArananUrunismi.toUpperCase());
        const priceMatches = urun.fiyat.toString().indexOf(kullaniciArananUrunismi) !== -1;
        return nameMatches || categoryMatches || priceMatches;
    });
}




//! ÜRÜNLERİ GÖSTERİYORUZ
// $ ı neden kullandık dersen, js de html kodu yazıyoruz direkt yazdırıyoruz ama ilerde temlete olarak görücez tekrardan. 
function urunleriGoster(urunObje, hedefDiv, index) {
    const urunBilgiHTML = `
    <div class="urun-bilgi">
        <h1>Ürün ${index + 1} </h1>             
        <p>Ürün İsmi: ${urunObje.isim}</p>
        <p>Kategori: ${urunObje.kategori}</p>
        <p>Fiyat: ${urunObje.fiyat} TL</p>
    </div>
`;
    hedefDiv.innerHTML = urunBilgiHTML;
}



