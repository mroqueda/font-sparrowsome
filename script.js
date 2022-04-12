// ==UserScript==
// @name         Font Sparrowsome
// @namespace    https://github.com/mroqueda/font-sparrowsome/
// @version      1.0
// @description  Oups, Font Awesome leaked
// @author       mroqueda
// @updateURL    https://raw.githubusercontent.com/mroqueda/font-sparrowsome/main/script.js
// @downloadURL  https://raw.githubusercontent.com/mroqueda/font-sparrowsome/main/script.js
// @match        https://fontawesome.com/icons/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fontawesome.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var getStyle = ()=>{
        var buttons = document.querySelectorAll('.icon-landing-nav-styles button')
        for(let button of buttons){
            if(button.style.cssText.toString().includes('--button-background:var(--white)')){
                return button.getAttribute('aria-label')
            }
        }
        return null
    }

    window.downloadIcon = () => {

        if(document.querySelectorAll('link[href^="https://site-assets.fontawesome.com/"]').length){
            var link = document.querySelectorAll('link[href^="https://site-assets.fontawesome.com/"]')[0].getAttribute('href').split('/').slice(0,-2).join('/')+'/svgs/'


            var style = getStyle() || (new URL(document.location)).searchParams.get("s")


            var icon = document.location.pathname.split('/').slice(-1)[0]
            var url = link+style+'/'+icon+'.svg'
            fetch(url)
                .then(r => {
                r.blob()
                    .then((blob)=>{
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = icon+'-'+style+'.svg';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);

                })
            })
        }
    }

    var check = () =>{
        if(document.querySelectorAll('.icon-details-svg-actions').length){
            if(!document.getElementById('sparrowButton')){
                var actionButtons = document.querySelectorAll('.icon-details-svg-actions')[0]
                actionButtons.innerHTML += `<button onclick="downloadIcon()" id="sparrowButton" style="padding:0 !important;overflow:hidden" class="icon-action-svg-download button flat compact display-inline-block padding-x-xs"><img width="64px" src="https://assets.btcv.fr/img/sparrow.png"></button>`
            }
        }
    }

    window.addEventListener("load", function(event) {
        check()
        setInterval(()=>{ check() }, 500)
    })


})();
