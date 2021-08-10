var maxWater = 60;
var maxPage = document.getElementsByClassName("text tw-mr-2")[1];

if (typeof (maxPage) !== 'undefined') {
    maxPage = maxPage.innerText.match(/\d+/g);
    maxPage = maxPage[0];
}

var pagePass = 0;
console.log("Loading...")

var interval = setInterval(() => {
    var loadingGif = document.getElementsByClassName("loading-page");
    if (loadingGif.length === 0) {
        var curPage = document.getElementsByClassName("currentPage tw-mr-2")[0];

        if (typeof (curPage) !== 'undefined')
            curPage = curPage.innerText;

        var validCount = 0;
        var waterParent = document.getElementsByClassName("tw-absolute tool-icon");
        for (let i = 0; i < waterParent.length; i++) {
            if (waterParent[i].src === "https://marketplace.plantvsundead.com/_nuxt/img/water@3x.d5ca50d.png") {
                console.log(waterParent[i].parentElement.children[2].innerText)
                if (waterParent[i].parentElement.children[2].innerText < maxWater) {
                    validCount++
                }
            }
        }

        console.log("Current Page: " + (typeof (curPage) === 'undefined' ? 1 : curPage))
        console.log("Total Page: " + (typeof (maxPage) === 'undefined' ? 1 : maxPage))
        if (curPage == maxPage) {
            console.log("Sudah page terakhir"); clearInterval(interval);
        } else if (pagePass === 0) {
            console.log("Page pertama selalu dilewati"); pagePass++; document.querySelectorAll('.tw-mt-6')[1].children[4].click();
        } else if (validCount === 0) {
            document.querySelectorAll('.tw-mt-6')[1].children[4].click();
        } else {
            console.log("Ada yang kering nih"); clearInterval(interval);
        }
    }
}, 2000);