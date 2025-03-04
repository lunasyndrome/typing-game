'use strict';
// 定数定義
// 残り時間表示エリア
const time_area = document.getElementById('time');

// 正答数表示エリア
const score_area = document.getElementById('score');

// ゲームエリア
const game_area = document.getElementById('game_area');

// リスタートボタン
const restart_btn = document.getElementById('restart');

// 単語リスト
const words = [
  'fruit',
  'apple',
  'banana',
  'peach',
  'strawberry',
  'grape',
  'orange',
  'melon',
  'pineapple',
  'cherry',
  'lemon',
  'watermelon',
  'vegetable',
  'tomato',
  'carrot',
  'onion',
  'potato',
  'cucumber',
  'lettuce',
  'cabbage',
  'corn',
  'mushroom',
  'nut',
  'broccoli',
  'radish',
  'zucchini',
  'breakfast',
  'lunch',
  'dinner',
  'rice',
  'miso',
  'soup',
  'noodle',
  'bread',
  'jam',
  'egg',
  'fish',
  'curry',
  'ramen',
  'sandwich',
  'spaghetti',
  'pizza',
  'hamburger',
  'salad',
  'pie',
  'chicken',
  'corn',
  'sausage',
  'beefsteak',
  'omelet',
  'fish',
  'namul',
  'dessert',
  'cake',
  'chocolate',
  'donut',
  'popcorn',
  'daifuku',
  'pudding',
  'parfait',
  'gum',
  'snack',
  'water',
  'milk',
  'juice',
  'coffee',
  'tea',
  'soda'
];

// 変数定義
// 残り時間
let time = 30;
// 正答数
let score = 0;

// 現在出題されている単語をspan要素化したもののコピー配列
// 実際のHTMLには干渉しない
// 中身は関数内で代入
let now_word;

// 現在ゲーム稼働中か否か（1:オフ / 2:オン / 3:終了）
let game_on = 1;

// タイマー制御用関数
let timer_roop;


// 関数宣言

// 文字列分解
function words_parse(str) {
  return [...str].map(char => `<span>${char}</span>`).join('');
}

// 出題
function question() {
  // 出題する単語の番号をランダムで決定
  const question_num = Math.floor(Math.random() * words.length) + 1;
  // 番号から出題する単語を呼び出し
  const answer = words[question_num];
  // spanタグで1文字ずつ囲む
  const display_word = words_parse(answer);
  // 単語をゲームエリアに表示
  game_area.innerHTML = display_word;
  // 今表示されている出題のspan要素を配列で取得
  now_word = Array.from(game_area.children);
}

// 文字入力
function input(event) {
  // 押したキーが押すべきキーと等しいとき
  if (event.key === now_word[0].textContent) {
    // 入力済みを示すclass「finish」を付与
    now_word[0].classList.add('finish');
    // 配列の先頭を削除
    now_word.shift();
  }
  next();
}

// 次の問題に進む
function next() {
  // 出題単語の文字が残っていなければ
  if (now_word.length === 0) {
    // スコア更新
    score++;
    score_area.textContent = score;
    // 次の問題へ
    question();
  }
}

// タイマー
function timer() {
  // 残り時間が1以上
  if (time >= 1) {
    // 残り秒数を減らす
    time--;
    // 残り時間の表示更新
    time_area.textContent = time;


    // 残り時間が1以上でない
  } else {
    // ゲーム停止
    game_on = 3;
    // メッセージ表示
    game_area.textContent = `ゲーム終了！正答数：${score}`;
    // リスタートボタン表示
    restart_btn.style.display = 'flex';
    // ループを止める
    clearInterval(timer_roop);
  }
}

// タイマー起動用
function timer_on() {
  timer_roop = setInterval(timer, 1000);
}

// 初期化
function reset() {
  // スコア初期化
  score = 0;
  // スコアの表示更新
  score_area.textContent = score;
  // 残り時間初期化
  time = 30;
  // 残り時間の表示更新
  time_area.textContent = time;
  // リスタートボタン非表示
  restart_btn.style.display = 'none';
  // ゲームエリア初期化
  game_area.textContent = 'スペースキーを押して開始';
  // ゲームオンオフをオフに
  game_on = 1;
}

// スタート
function game_start() {
  // div生成
  const count_cover = document.createElement('div');
  // class名count_cover追加
  count_cover.classList.add('count_cover');
  // main内に挿入（styleは事前にCSSで設定）
  document.querySelector('main').insertAdjacentElement('afterbegin', count_cover);

  // カウントダウン用の変数定義
  let count = 3;
  // カウント表示
  count_cover.textContent = count;
  // カウントダウン繰り返し部
  let count_down = setInterval(() => {
    if (count > 1) {
      // 数字減少
      count--;
      // カウント表示
      count_cover.textContent = count;
    } else {
      // カウントダウン用divの削除
      document.querySelector('.count_cover').remove();
      // ゲームオンオフをオンに
      game_on = 2;
      // 出題関数呼び出し
      question();
      // タイマーオン
      timer_on();
      // 繰り返し終了
      clearInterval(count_down);
    }
  }, 1000);
}

// キーと関数の紐づけ
window.addEventListener('keydown', event => {
  // ゲームがオンの時
  if (game_on === 2) {
    //入力されたキーを引数に文字入力関数を呼び出し
    input(event);


    // ゲームオフ、かつ押されたのがスペースキーの時
  } else if (game_on === 1 && event.key === " ") {
    // ゲーム開始
    game_start();

  }
});


// リスタートボタン
restart_btn.addEventListener('click', reset);