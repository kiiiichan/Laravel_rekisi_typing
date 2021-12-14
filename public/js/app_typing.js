//検証ツールのコンソールにコメントを出せる。変数を出すようにしておくなど
//console.log('hello');


//ページ読みこんだタイミングで実施(全体)
        
window.onload = function(){
  /*
  localStorage.removeItem('heianPrize');
  delete localStorage.heianPrize;
  */
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });
  }

  // async/await
  async function imagePreLoad() {
      await loadImage(items[0].image);
      await loadImage(items[1].image);
      await loadImage(items[2].image);
      /*
      await loadImage(items[3].image);
      await loadImage(items[4].image);
      await loadImage(items[5].image);
      await loadImage(items[6].image);
      await loadImage(items[7].image);
      await loadImage(items[8].image);
      await loadImage(items[9].image);
      await loadImage(items[10].image);
      await loadImage(items[11].image);
      await loadImage(items[12].image);
      await loadImage(items[13].image);
      await loadImage(items[14].image);
      await loadImage(items[15].image);
      /*
      */

      image.src = "../image/start.png";  // 開始画像表示
      document.getElementById("start_button").style.visibility ="visible";
  }
  
  
  
  //ここから関数定義
  
  // 配列をシャッフル（ChallengeClass）
  let itemShuffle = (items) => {
      for (let i = items.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        // 配列の数値を入れ替える
        [items[i], items[rand]] = [items[rand], items[i]]
      }
      return items;
  };
  
  //カウントダウン（ChallengeClass）
  const countdown = function(){
      return setInterval(function(){
        drawTimer('残り：' + --TIME + '秒');
        if(TIME <= 0) finish();
      }, 1000);
  };
  

  //関数４．時間切れ終了処理（ChallengeClass）
  function finish(){
    //console.log("finish "+countdown_pid);
    clearInterval(countdown_pid);
    drawDisplay("",'正解数は' + correct_count  + '個でした！',"","../image/end.jpg");
    bgm.pause();
    finishSound.play();
    drawForm('#0D95A0');
    document.getElementById('your_type').blur();
  }
    
  function clear(){
    //console.log("clear "+countdown_pid);
    clearInterval(countdown_pid);
    bgm.pause();
    clearSound.play();
    //変数heianPrize に この文言を保存
    heianPrize = "★弥生～平安時代 制覇★";
    localStorage.setItem('heianPrize',heianPrize);
    image.src = "../image/perfect.png";  // clear画像表示
    timer.textContent = '';
    text1.textContent = TIME + '秒残しでクリア';
    text2.textContent = heianPrize ;
  //  text3.textContent = "ここをリンクにしたい" ;
    player_type.value = "";
    document.getElementById('your_type').blur();
    itemCounter.textContent = '';
    
    document.getElementById("text4").style.visibility ="visible";
    document.getElementById("text3").style.display ="none";
    
    //text1.style.fontSize = '25px';
    text2.style.fontSize = '25px';
    //text4.style.fontSize = '25px';
  }
  
  
//タイピング型判定処理（ItemClass）
  
  function typeJudge(){
    
    let input = player_type.value;
    let inputKanaa = romajiConv(input).toHiragana();//ほげほげt型
    let inputKana = inputKanaa.replace(/[^\u3040-\u309F]/g, '');//ほげほげ型
    
    //その時点での正解を出す
    let answer_kn = items[i].answer_kn[inputKana.length];//i番目の項目のkn_i文字目のひらがな
    
    inputKanaa_eiji = inputKanaa.replace(/[^0-9a-z]/gi, '');
  
    //もしEnter押されて変数kanjiが""だったらkanjiにanswer_qを入れる
    if (keycd === 13 && kanji.textContent == "" ) {
      kanji.textContent = items[i].answer_q;
      TIME = TIME - 5;
    
    //もしEnter押されて変数kanjiが""じゃなくて変数kanaが""だったらkanaにanswerを入れる
    } else if (keycd === 13 && kana.textContent == "" ) {
      kana.textContent = items[i].answer;
      TIME = TIME - 1;

    //もし入力キーが3回n続きだったら　inputのひらがなを１文字削除
    } else if (input.charAt(input.length-1) == "n" && input.charAt(input.length-2) == "n" && input.charAt(input.length-3) == "n") {
    inputKana = inputKana.slice( 0, -1 ) ;
    
    //もし入力キーがnで1個前の入力キーがnじゃなかったら　inputのひらがなを１文字削除    
    } else if (input.charAt(input.length-1) == "n" && input.charAt(input.length-2) != "n") {
    inputKana = inputKana.slice( 0, -1 ) ;
    
    //入力値が最終の答えと一致していたらJudgeに進む
    } else if (inputKanaa == items[i].answer) {
      judge();
      
    //もしinputKanaaがその時点での答えと同じならcorrect_inputにinputを保存
    } else if (inputKanaa == answer_kn) {
      correct_input = input;
      
    //もし最後がひらがなで途中に英字が入っていたらcorrect_inputに戻す
    } else if (inputKanaa.charAt(inputKanaa.length-1).replace(/[^\u3040-\u309F]/g, '').length > 0 && inputKanaa_eiji.length > 0) {
    player_type.value = correct_input ;  
    booSound.play();
    booSound.volume = 1;
    
    //もし英字が3つ続いたらcorrect_inputに戻す
    } else if (inputKanaa_eiji.length == 3) {
    player_type.value = correct_input ;
    booSound.play();
    booSound.volume = 1;

    //もし入力されたカナがその時点での答えと同じなら何もしない
    } else if (inputKana == answer_kn) {
      
    //もし入力されたカナがその時点での答えと同じでなければ      
    } else {
    player_type.value = correct_input ;
    booSound.play();
    booSound.volume = 1;
    }
    } //typeJudge終わり
    
  let initGame = () => {
    bgm.currentTime = 0;
    clearInterval(countdown_pid);
    state = true;
    TIME = 60;
    correct_count = 0;
    i = 0;
    timer.textContent = '制限時間：' + TIME + '秒';
    itemCounter.textContent = '問題数：' + items.length +'問';
    text1.textContent = "人物名をタイピングしよう";
    text2.textContent = "わからないときは";
    text3.textContent = "Enter を押してみてね";
    text1.style.fontSize = '25px';
    text2.style.fontSize = '20px';
    text3.style.fontSize = '20px';
    text1.style.color = '#000000';
    text2.style.color = '#DD372A';
    text3.style.color = '#DD372A';  
    kanji.textContent = "";
    kana.textContent = "";
  };
  
//関数６．判定処理  
  function judge(){
    
    if(!state) return; //終了後に操作できないようにする
    let input = player_type.value;
    let answer = items[i].answer;
    let inputKanaa = romajiConv(input).toHiragana();//ほげほげt型_画面表示用
    let inputKana = inputKanaa.replace(/[^\u3040-\u309F]/g, '');//ほげほげ型_判定用
    correct_input = "" ;
    kanji.textContent = "" ;
    kana.textContent = "" ;
    
    //入力値が答えと同じだったら正解、違ったら不正解をコンソールログに出力
    if(inputKana != answer){
    } else if(inputKana == answer && correct_count+1 == items.length) {
      clear();
    } else {
      correct_count = correct_count + 1 ;
      i = i+1 ;
      init_item_display();
      itemCounter.textContent = 'あと：' + (items.length-i) +'問';
    }
  }
    
  //　関数７．次の問題文を表示
  function init_item_display() {
    drawItemDisplay(i);
    drawForm('#FFFFFF');
  }

 //  関数．min-max間のランダムな整数を返す
 
 function getRandomIntInclusive(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
 }

    
  let drawDisplay = (dtext1,dtext2,dtext3,dimage) => {
    //テキスト表示部分の指定
    text1.textContent = dtext1;
    text2.textContent = dtext2;
    text3.textContent = dtext3;
    image.src = dimage;
  };
  
  let drawItemDisplay = (itemNo) => {
    text1.textContent = items[itemNo].text1;
    text2.textContent = items[itemNo].text2;
    text3.textContent = items[itemNo].text3;
    image.src = items[itemNo].image;
  };
    
  let drawTimer = (dtimer) => {    //制限時間
    timer.textContent = dtimer;
  };
    
  let drawForm = (color) => {
    player_type.value = "";
    document.getElementById('your_type').focus();
    document.getElementById('your_type').style.backgroundColor =  color; // 入力欄の色を変える
  };
    
  //スタートボタン押下時の画面初期化設定（ChallengeClass）
  let initDisplay = (TIME) => {

      drawItemDisplay(0);
      drawForm('#FFFFFF');
      drawTimer('残り：' + TIME + '秒');
      text1.style.fontSize = '';
      text2.style.fontSize = '';
      text3.style.fontSize = '';
      text1.style.color = '';
      text2.style.color = '';
      text3.style.color = '';  

  };
  
  //setintervalは一定時間ごとにこの処理をする
  //setInterval(関数function,一定時間の指定[,引数1,引数2,…])
  //0になったらfinish処理
  //1行目は　const countdown = setInterval( () => { としてもOKなはず。functionのほうが昔ながらの書き方
  
  function getKeyCode(){
      player_type.addEventListener("keypress", (e) => {        //入力キーを取得
    keycd = e.keyCode;
//    console.log('入力したキーは　'+keycd);
      })
  }
  
  function getPid() {
    countdown_pid = countdown();
//    console.log("start TIME="+TIME);
  }
  
  sound.init();
  
    //　変数定義
  let TIME;
  const image = document.getElementById("image");
  const text1 = document.getElementById("text1");
  const text2 = document.getElementById("text2");
  const text3 = document.getElementById("text3");
  const text4 = document.getElementById("text4");
  const start_button = document.getElementById("start_button");
  let items = [
    { answer_q: "卑弥呼" , answer: 'ひみこ' , answer_kn: ["","ひ","ひみ","ひみこ"] , text1: "お告げ聞く" , text2: "邪馬台国の" , text3: "女王さま" , image:"../image/01.png"},
    { answer_q: "聖徳太子" , answer: 'しょうとくたいし' , answer_kn: ["","し","しょ","しょう","しょうと","しょうとく","しょうとくた","しょうとくたい","しょうとくたいし"] , text1: "能力で" , text2: "与える冠位" , text3: "十二階" , image:"../image/02.png"},
    { answer_q: "蘇我馬子" , answer: 'そがのうまこ' , answer_kn: ["","そ","そが","そがの","そがのう","そがのうま","そがのうまこ"] , text1: "豪族で" , text2: "推古天皇の" , text3: "おじさんよ"  , image:"../image/03.png"},
/*
    { answer_q: "小野妹子" , answer: 'おののいもこ' , answer_kn: ["","お","おの","おのの","おののい","おののいも","おののいもこ"] , text1: "遣隋使" , text2: "聖徳太子に" , text3: "命じられ"  , image:"../image/04.png"},
    { answer_q: "中臣鎌足" , answer: 'なかとみのかまたり' , answer_kn: ["","な","なか","なかと","なかとみ","なかとみの","なかとみのか","なかとみのかま","なかとみのかまた","なかとみのかまたり"] , text1: "死ぬ直前" , text2: "藤原の姓を" , text3: "与えられ"  , image:"../image/05.png"},
    { answer_q: "天武天皇" , answer: 'てんむてんのう' , answer_kn: ["","て","てん","てんむ","てんむて","てんむてん","てんむてんの","てんむてんのう"] , text1: "壬申の乱" , text2: "甥に勝って" , text3: "天皇に"  , image:"../image/06.jpg"},
    { answer_q: "聖武天皇" , answer: 'しょうむてんのう' , answer_kn: ["","し","しょ","しょう","しょうむ","しょうむて","しょうむてん","しょうむてんの","しょうむてんのう"] , text1: "東大寺" , text2: "大仏造った" , text3: "天皇よ" , image:"../image/07.png"},
    { answer_q: "行基" , answer: 'ぎょうき' , answer_kn: ["","ぎ","ぎょ","ぎょう","ぎょうき"] , text1: "東大寺" , text2: "大仏造りに" , text3: "協力し" , image:"../image/08.png"},
    { answer_q: "鑑真" , answer: 'がんじん' , answer_kn: ["","が","がん","がんじ","がんじん"] , text1: "唐招提寺で" , text2: "正しい仏教" , text3: "広めたよ" , image:"../image/09.png"},
    { answer_q: "空海" , answer: 'くうかい' , answer_kn: ["","く","くう","くうか","くうかい"] , text1: "密教を" , text2: "学んで広めた" , text3: "真言宗" , image:"../image/10.png"},
    { answer_q: "菅原道真" , answer: 'すがわらのみちざね' , answer_kn: ["","す","すが","すがわ","すがわら","すがわらの","すがわらのみ","すがわらのみち","すがわらのみちざ","すがわらのみちざね"] , text1: "遣唐使" , text2: "中止提案で" , text3: "流された" , image:"../image/11.png"},
    { answer_q: "平将門" , answer: 'たいらのまさかど' , answer_kn: ["","た","たい","たいら","たいらの","たいらのま","たいらのまさ","たいらのまさか","たいらのまさかど"] , text1: "天皇家に" , text2: "逆らうヒーロー" , text3: "我新皇" , image:"../image/12.jpg"},
    { answer_q: "清少納言" , answer: 'せいしょうなごん' , answer_kn: ["","せ","せい","せいし","せいしょ","せいしょう","せいしょうな","せいしょうなご","せいしょうなごん"] , text1: "随筆の" , text2: "枕草子を" , text3: "書いた人" , image:"../image/13.png"},
    { answer_q: "藤原道長" , answer: 'ふじわらのみちなが' , answer_kn: ["","ふ","ふじ","ふじわ","ふじわら","ふじわらの","ふじわらのみ","ふじわらのみち","ふじわらのみちな","ふじわらのみちなが"] , text1: "孫３人" , text2: "天皇になり" , text3: "お金持ち" , image:"../image/14.png"},
    { answer_q: "紫式部" , answer: 'むらさきしきぶ' , answer_kn: ["","む","むら","むらさ","むらさき","むらさきし","むらさきしき","むらさきしきぶ"] , text1: "イケメンの" , text2: "源氏物語" , text3: "大人気" , image:"../image/15.jpg"},
    { answer_q: "平清盛" , answer: 'たいらのきよもり' , answer_kn: ["","た","たい","たいら","たいらの","たいらのき","たいらのきよ","たいらのきよも","たいらのきよもり"] , text1: "保元と" , text2: "平治の乱で" , text3: "源氏に勝ち" , image:"../image/16.jpg"},
*/    
    ];
  const judge_button = document.getElementById("judgement");
  const player_type = document.getElementById("your_type");
  const timer = document.getElementById("timer");
  const itemCounter = document.getElementById("itemCounter");
  const kanji = document.getElementById("kanji");
  const kana = document.getElementById("kana");
  let bgm = new Audio('../audio/bgm01.mp3');
  let typeSound = new Audio('../audio/type_sound.mp4');
  let clearSound = new Audio('../audio/clear.mp3');
  let finishSound = new Audio('../audio/finish.mp3');
  let booSound = new Audio('../audio/boo.mp3');
  let input = player_type.value;
  let inputKanaa_eiji;
  let correct_input = "";
  let countdown_pid ; 
  let correct_count;
  var i;
  let state;
  let heianPrize = "";
  let keycd;
    
  document.getElementById("start_button").style.visibility ="hidden";
  document.getElementById("text4").style.visibility ="hidden";
  image.src = "../image/loading.png";  //Loading画像表示
  initGame();//画面を読み込んだ時点でinitGame

  //画面読み込みの時点でlocalStorage の heianPrizeに値がなければ 変数heianPrizeに"未制覇"の文字を入れる 
  //そうでなければlocalStorageのheianPrizeの値を入れる
  if(!localStorage.getItem('heianPrize')) {
    heianPrize = "弥生～平安時代";
  } else {
    heianPrize = localStorage.getItem('heianPrize');
  }
 // console.log("load:"+heianPrize);
    
  //変数定義終わり

  function start(){
    initGame();//スタートボタン押下時にもinitGame
    bgm.play();
    bgm.volume = 0.5;
    getPid();
    itemShuffle(items);
    initDisplay(TIME);
  }
  
  
  imagePreLoad();
  
  start_button.addEventListener("click", () => { 
    start();
  })
  
  player_type.addEventListener("keyup", () => {
    typeJudge();
  })
  
  player_type.addEventListener("keydown", () => {  
    sound.play();
    typeSound.volume = 1;
  })

//　タイプ音を鳴らしたい  
//  https://techplay.jp/column/482
//　https://qiita.com/tonio0720/items/93e5a1a4e2671ed5f637　変数代入（オブジェクト）
//　ローカルストレージ　https://techacademy.jp/magazine/19623  
  getKeyCode();
  
}
