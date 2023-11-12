//! İNPUTTA ARAMA İŞLEMİ
const bulInput = document.getElementById("bulInput");
let filtreliUrunler = [];

bulInput.addEventListener('input', inputaYaziYazilinca);

function inputaYaziYazilinca() {
    let arananUrunismi = bulInput.value;
    urunlerContainer.innerHTML = "";
    filtreliUrunler = filtreliUrunleriDoldur(urunler, arananUrunismi);
    divOlusturma(filtreliUrunler);
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
