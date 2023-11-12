//! Fonksiyon, filtrelenmiş ürünleri HTML sayfasına ekleyecek
function filteredUrunleriGoster(urunObje,index) {
    const urunBilgiHTML = `
        <div class="urun-bilgi">
            <h1> Ürün ${index + 1} </h1>
            <p>${urunObje.isim}</p>
            <p>Kategori: ${urunObje.kategori}</p>
            <p>Fiyat: ${urunObje.fiyat} TL</p>
        </div>
    `;
    filteredUrunlerDiv.insertAdjacentHTML("beforeend", urunBilgiHTML); 
    //insertAdjacentHTML, HTML elemanının içine yeni HTML elemanı ekler, beforeend = Elemanın içine, içeriğin en sonuna ekler.
    // Aklında kalmış olsun ancak innerHTML += ile de ekleyebilirdik 
}

//! İndex.html'den gelen ürünleri dönüştürüyoruz.

const queryString = window.location.search;         //Geçerli urlnin sorgu parametrelerini (? den sonraki kısımı) alır.
const urlParams = new URLSearchParams(queryString); //URLSearchParams nesnesi queryString içindeki sorgu parametrelerini ayrıştırır.

// "products" olanı alıyoruz yani filtrelenmiş ürünleri alıyoruz
const filteredProductsJSON = urlParams.get("products");

// JSON dizesini JavaScript nesnesine dönüştürüyoruz
const filteredProducts = JSON.parse(decodeURIComponent(filteredProductsJSON));


//! Filtrelenmiş ürünleri 3 erli divler halinde filteredUrunleriGoster fonksiyonuna gönderiyor.
const filteredUrunlerDiv = document.getElementById("filteredUrunlerDiv");
filteredProducts.forEach((urun, index) => {
    if (index % 3 === 0) {
        // Yeni bir grup için bir div elemanı oluşturuyoruz
        const urunGrupDiv = document.createElement("div");
        urunGrupDiv.classList.add("urun-grup");

        // Oluşturulan div elemanını filteredUrunlerDiv içerisine ekliyoruz
        filteredUrunlerDiv.appendChild(urunGrupDiv);
    }

    //todo Her ürünü oluşturduğumuz urunGrupDiv içerisine ekliyoruz, Burda garip olan urunGrup divi boş bırakıp divleri sona eklememesi 
    filteredUrunleriGoster(urun, index);
});
