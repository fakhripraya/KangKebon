// ==UserScript==
// @name         Kang Kebun
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://marketplace.plantvsundead.com/farm/other/*
// @icon         https://plantvsundead.com/assets/img/icon.svg
// @require      https://www.cssscript.com/demo/simple-vanilla-javascript-toast-notification-library-toastify/src/toastify.js
// @resource     REMOTE_CSS https://www.cssscript.com/demo/simple-vanilla-javascript-toast-notification-library-toastify/src/toastify.css
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    // Load remote JS
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.cssscript.com/demo/simple-vanilla-javascript-toast-notification-library-toastify/src/toastify.js",
        onload: (ev) => {
            let e = document.createElement('script');
            e.innerText = ev.responseText;
            document.head.appendChild(e);
        }
    });

    // Load remote CSS
    const remoteCss = GM_getResourceText("REMOTE_CSS");
    GM_addStyle(remoteCss);

    //Toast
    var dryWaterToast = Toastify({
        text: "Ada yang kering nih!",
        duration: 10000
    })

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
                console.log("Sudah page terakhir");
                clearInterval(interval);
            } else if (pagePass === 0) {
                console.log("Page pertama selalu dilewati");
                pagePass++;
                document.querySelectorAll('.tw-mt-6')[1].children[4].click();
            } else if (validCount === 0) {
                document.querySelectorAll('.tw-mt-6')[1].children[4].click();
            } else {
                dryWaterToast.showToast();
                console.log("Ada yang kering nih");
                clearInterval(interval);
            }
        }
    }, 2000);
})();