'use strict';
// 定数定義
// 残り時間表示エリア
const time_area = document.getElementById('time');

// 正答数表示エリア
const score_area = document.getElementById('score');

// ゲームエリア
const game_area = document.getElementById('game_area');

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
let time = 10;
// 正答数
let score = 0;

// 出題する単語の番号（ランダム）
let question_num = Math.floor(Math.random() * words.length) + 1;
// 番号から出題する単語を呼び出し
let answer = words[question_num];


// 関数宣言

// 文字列分解
function words_parse(str) {
  return [...str].map(char => `<span>${char}</span>`).join('');
}

// 出題
function question() {
  // 出題する単語の番号をランダムで決定
  question_num = Math.floor(Math.random() * words.length) + 1;
  // 番号から出題する単語を呼び出し
  answer = words[question_num];
  // spanタグで1文字ずつ囲む
  const display_word = words_parse(answer);
  // 単語をゲームエリアに表示
  game_area.innerHTML = display_word;
}

// 文字入力
function input() {
  // 今表示されている出題のspan要素を配列で取得
  const now_word = game_area.children;
  // 入力済みを示すclass「finish」を付与
  now_word[0].classList.add('finish');
}

// たぶん
// 今打つのはこの字！を出す
// タイプされる
// 正誤判定してあってたら文字の色が変わる
// 文字が残ってるなら次の文字

// って感じ