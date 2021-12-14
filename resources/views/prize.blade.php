<!DOCTYPE html>
<html>
<head>
    
    <meta charset="utf-8"><!-- 文字化け防止 -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

</head>
 
<body>
    
    <div class="container">
        <div class="header-title-area">
            <h1 class="logo">ステージ一覧</h1>
        </div>
    </div>

    
    <div class="main">
        <div class="container">
            <h1 id="htmlIdHeianPrize"></h1>
            <h1 id="htmlIdKamakuraPrize">鎌倉・室町時代</h1>
            <h1 id="htmlIdSengokuPrize">戦国・安土桃山</h1>
            <h1 id="htmlIdEdo1Prize">江戸時代①</h1>
            <h1 id="htmlIdEdo2Prize">江戸時代②</h1>
        
        </div>
    </div>
    
    <script src="{{ asset("/js/prize.js") }}"></script>
    
</body>
</html>