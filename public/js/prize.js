window.onload = function(){
    let htmlIdHeianPrize = document.getElementById("htmlIdHeianPrize");
    htmlIdHeianPrize.textContent = localStorage.getItem('heianPrize');
}