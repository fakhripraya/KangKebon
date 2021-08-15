// ==UserScript==
// @name         Kang Gagak
// @namespace    http://tampermonkey.net/
// @version      1.1.14
// @description  try to take over the crow!
// @author       You
// @match        https://marketplace.plantvsundead.com/*
// @icon         https://plantvsundead.com/assets/img/icon.svg
// @updateURL    https://github.com/fakhripraya/KangKebon/raw/main/monyet-pengganggu-pvu-gagak.user.js
// @require      https://www.cssscript.com/demo/simple-vanilla-javascript-toast-notification-library-toastify/src/toastify.js
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
    var crowToast = Toastify({
        text: "Ada crow! ",
        close: true
    })

    var lastPageToast = Toastify({
        text: "Sudah page terakhir :( ",
        close: true
    })
    var checkloopgagak = true,
        prevPage = 0,
        backgroundElement;
    console.log("Loading...")

    var interval = setInterval(() => {
        var loadingGif = document.getElementsByClassName("loading-page");
        var capthaDialog = document.getElementsByClassName("v-dialog__content v-dialog__content--active");
        var bodyElement = document.getElementById("__layout").children[0].children[1].children[0];

        if (typeof (bodyElement) !== 'undefined') {
            if (bodyElement.className === "content-wrapper tw-bg-farm-mobile sm:tw-bg-farm-desktop tw-p-2") {
                if (loadingGif.length === 0) {
                    if (capthaDialog.length === 0) {
                        var curPage = document.getElementsByClassName("currentPage tw-mr-2")[0];
                        if (typeof (curPage) !== 'undefined')
                            curPage = curPage.innerText;

                        var maxPage = document.getElementsByClassName("text tw-mr-2")[1];
                        if (typeof (maxPage) !== 'undefined') {
                            maxPage = maxPage.innerText.match(/\d+/g);
                            maxPage = maxPage[0];
                        }

                        if (curPage != prevPage) {
                            var revertElement = document.getElementsByClassName("tw-p-3");
                            for (let i = 0; i < revertElement.length; i++) {
                                if (revertElement[i].style.backgroundColor == "red") {
                                    revertElement[i].style.backgroundColor = "#151721";
                                }
                                prevPage = prevPage++;
                            }
                        }

                        var validCount = 0;
                        let a = document.querySelectorAll('.crow-icon')
                        for (let index = 0; index < a.length; index++) {
                            let b = a[index];
                            if (b.getAttribute('style') == "") {
                                validCount += 1;
                                b.parentElement.parentElement.parentElement.style.backgroundColor = "red";
                                if (checkloopgagak) {
                                    b.parentElement.parentElement.parentElement.scrollIntoView({
                                        block: 'end',
                                        behavior: 'smooth'
                                    });
                                    checkloopgagak = false;
                                }
                            }
                        }

                        console.log("Current Page: " + (typeof (curPage) === 'undefined' ? 1 : curPage))
                        console.log("Total Page: " + (typeof (maxPage) === 'undefined' ? 1 : maxPage))
                        if (curPage == maxPage) {
                            if (validCount > 0) {
                                dryWaterToast.showToast();
                                console.log("Ada crow!");
                            }

                            lastPageToast.showToast();
                            console.log("Sudah page terakhir");
                            clearInterval(interval);
                        } else if (validCount === 0) {
                            if (capthaDialog.length === 0) {
                                document.querySelectorAll('.tw-mt-6')[1].children[4].click();
                                prevPage = curPage;
                                checkloopgagak = true;

                            }
                        } else {
                            crowToast.showToast();
                            console.log("Ada crow!");
                        }
                    }
                }
            }
        }
    }, 2000);
})();
