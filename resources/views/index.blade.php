<!DOCTYPE html>
<html>
<head>
  
    <meta charset="utf-8"> <!-- 文字化け防止 -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

</head>
 
<body>
    
    <div class="container">
        <div class="header-title-area">
            <h1 class="logo">歴史人物タイピング</h1>
            <h2 class="text-sub">弥生～平安時代編</h2>
            <button type="button" id="start_button" onClick="alert('音が鳴りますがよろしいですか？');">START！</button>
        </div>
    </div>
    
    <div class="main">
      
      <div class="container">
        
        <div class="flex_wrap">

          <div class="left-contents">
            <div class="card-contents">
                <div class="illust">
                  <img id="image">
                </div>
            </div>
          </div>

          <div class="right-contents">
            <div class="card-contents">
              <h1 id="text1"></h1>
              <h1 id="text2"></h1>
              <h1 id="text3"></h1>
              <h1 id="text4"><a href = "/prize">ステージ一覧</a></h1>
            </div>
          </div>

        </div>
        
        <p id="kana"></p>
        <h1 id="kanji"></h1>
        <input type="url" id="your_type">
    
        <div class="counter">
            <h2 id="timer"></h2> 
            <h2 id="itemCounter"></h2>
        </div>
    
      </div>
      
    </div>
    
    <script src="{{ asset("https://cdn.jsdelivr.net/npm/@koozaki/romaji-conv@2.0.14/dist/romaji-conv.js") }}"></script>
    <script src="{{ asset("/js/sound.js") }}"></script>
    <script src="{{ asset("/js/app_typing.js") }}"></script>

</body>
</html>