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

//! Ürünleri gösterirken html de div eksiğimiz varsa div oluşturup gönderiyoruz.
const divList = document.querySelectorAll(".urun-container"); // Bir dizi ve tüm divleri aldık, classları döndürüyoruz 
urunler.forEach((urun, index) => {
    if(divList[index]){
        urunleriGoster(urun, divList[index], index)
    }
    else{
        const yeniUrunDiv = document.createElement("div");
        yeniUrunDiv.classList.add("urun-container");
        yeniUrunDiv.id = `urun${index + 1}`;
        document.querySelector(".urunler-container").appendChild(yeniUrunDiv);
        urunleriGoster(urun, yeniUrunDiv, index);
    }
});


//! BUTONA TIKLANDIĞINDA ÜRÜNLERİ DOLDURUYORUZ, DOLDURURKEN AYNI ÜRÜNÜ BİRDEN FAZLA ALDIK MI KONTROL EDİYORUZ.
const bulButton = document.getElementById("bulButton");
bulButton.onclick = function () {
    const bulInput = document.getElementById("bulInput");
    let kullaniciArananUrunismi = bulInput.value;
    let filtreliUrunler = [];
    filtreliUrunleriDoldur(urunler);

    function filtreliUrunleriDoldur(urunler) {
        urunler.forEach(function (urun) {

            //Some dizi içinde en az bir elemanın koşulu sağlayıp sağlamadığını kontrol eder, güzel fonksiyon
            if (urun.isim.toUpperCase().includes(kullaniciArananUrunismi.toUpperCase())) {
                const isUrunExists = filtreliUrunler.some((filtreliUrun) => filtreliUrun.isim.toUpperCase() === urun.isim.toUpperCase() &&
                filtreliUrun.kategori.toUpperCase() === urun.kategori.toUpperCase() && filtreliUrun.fiyat === urun.fiyat);
                if (!isUrunExists) {
                    filtreliUrunler.push(urun);
                }
            }
           
            if (urun.kategori.toUpperCase().includes(kullaniciArananUrunismi.toUpperCase())) {    // string bir dizi ve includes dizilerde kullanılır.
               const isUrunExists = filtreliUrunler.some((filtreliUrun) => filtreliUrun.isim.toUpperCase() === urun.isim.toUpperCase() &&
                filtreliUrun.kategori.toUpperCase() === urun.kategori.toUpperCase() && filtreliUrun.fiyat === urun.fiyat);
                if (!isUrunExists) {
                    filtreliUrunler.push(urun);
                }
            }
            if (urun.fiyat.toString().indexOf(kullaniciArananUrunismi) != -1) {       // Eğer ürün fiyatı kullanıcıurunisminin bir parçasıysa alır .
                const isUrunExists = filtreliUrunler.some((filtreliUrun) => filtreliUrun.isim.toUpperCase() === urun.isim.toUpperCase() &&
                filtreliUrun.kategori.toUpperCase() === urun.kategori.toUpperCase() && filtreliUrun.fiyat === urun.fiyat);
                if (!isUrunExists) {
                    filtreliUrunler.push(urun);
                }
            }
        });

        //encodeURIComponent fonksiyonu , JSON dizesini url ile gönderirken uyumlu hale getirmek için kullanıyoruz.
        //JSON Verileri depolamada,aktarmada,okunmada çok etkili. O yüzden JSON Formatına çeviriyoruz.
        const queryString = encodeURIComponent(JSON.stringify(filtreliUrunler));
        window.location.href = `filtering/filtered.html?products=${queryString}`;
        // window.location.href ile sayfanın url sini değiştiriyoruz filtered.html ile .
        // ?prdoucts = kısmı ise sorgu parametresidir . Url'ye eklenen ek bilgileri alır. İsmini başka bir şey de koyabilirdik.
        // Ve biz de burda ${queryString} i gönderdik.
    }
};

