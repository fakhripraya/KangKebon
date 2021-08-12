// ==UserScript==
// @name         Kang Kebun
// @namespace    http://tampermonkey.net/
// @version      1.0.10
// @description  try to take over the world!
// @author       You
// @match        https://marketplace.plantvsundead.com/farm/other/*
// @icon         https://plantvsundead.com/assets/img/icon.svg
// @updateURL    https://github.com/fakhripraya/KangKebon/raw/main/monyet-pengganggu-pvu.user.js
// @require      https://cdn.jsdelivr.net/npm/toastify-js
// @resource     REMOTE_CSS https://raw.githubusercontent.com/fakhripraya/KangKebon/main/toast.css
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
        text: "Ada yang kering nih! ",
        close: true
    })

    var lastPageToast = Toastify({
        text: "Sudah page terakhir :( ",
        close: true
    })

    var maxWater = 60;

    console.log("Loading...")

    var interval = setInterval(() => {
        var loadingGif = document.getElementsByClassName("loading-page");
        var capthaWindow = document.getElementsByClassName("tw-m-auto exclamation");
        var bodyElement = document.getElementById("__layout").children[0].children[1].children[0];

        if (typeof (bodyElement) !== 'undefined') {
            if (bodyElement.className === "content-wrapper tw-bg-farm-mobile sm:tw-bg-farm-desktop tw-p-2") {
                if (loadingGif.length === 0) {
                    if (typeof (capthaWindow) !== 'undefined') {
                        var curPage = document.getElementsByClassName("currentPage tw-mr-2")[0];
                        if (typeof (curPage) !== 'undefined')
                            curPage = curPage.innerText;

                        var maxPage = document.getElementsByClassName("text tw-mr-2")[1];
                        if (typeof (maxPage) !== 'undefined') {
                            maxPage = maxPage.innerText.match(/\d+/g);
                            maxPage = maxPage[0];
                        }

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
                            if (validCount > 0) {
                                dryWaterToast.showToast();
                                console.log("Ada yang kering nih");
                            }

                            lastPageToast.showToast();
                            console.log("Sudah page terakhir");
                            clearInterval(interval);
                        } else if (validCount === 0) {
                            document.querySelectorAll('.tw-mt-6')[1].children[4].click();
                        } else {
                            dryWaterToast.showToast();
                            console.log("Ada yang kering nih");
                        }
                    }
                }
            }
        }
    }, 2000);
})();