// --------------------------- Page Variables
let startPage = true;
let optionOnePage = false;
let optionTwoPage = false;
let optionThreePage = false;
let gachaPage = false;
let collectionLogPage = false;
// --------------------------- Button Variables
let startButton,
  simpleButton, newButton, unsettledButton,
  usefulButton, unexpectedButton, delightfulButton,
  enterButton, nothingButton,
  pullButton,
  nextButton, restartButton;
// --------------------------- Recorded Variables
let optionOne;
let optionTwo;
let textInput;
let userInput = "";

// --------------------------- Pull Variable
let pulled = "";
let description = "";
let pullOne, pullTwo, pullThree, pullFour;
let pullOneDesc, pullTwoDesc, pullThreeDesc, pullFourDesc;
let pullCount = 0;
let pullSound;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  createButtons();
  textAlign(CENTER);
  imageMode(CENTER);
  textFont('Times New Roman');
  textStyle(BOLD);
}

function draw() {
  pageState();

  if (gachaPage) { 

    if (pulled !== "") {
      textSize(32);
      text(pulled, width / 2, height / 2 - 50);

      if (description !== "") {
        textSize(18);
        textWrap(WORD);
        text(description, width / 2, height / 2 + 30);
      }

    }

    if (pullCount >= 4) {
      pullButton.hide();
      nextButton.show();
    } else {
      pullButton.show();
      nextButton.hide();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
  if (startButton) startButton.position(width / 2 - 100, height / 2);
}

function createButtons() {
  hideAllButtons();

  // START
  startButton = createImg('Media/Images/Buttons/startButton.png', 'Start');
  startButton.position(width / 2 - 100, height / 2);
  startButton.size(200, 80);
  startButton.mousePressed(handleButtons);
  startButton.style('cursor', 'pointer');

  // OPTION ONE - TODAY FEELS:
  simpleButton = createImg('Media/Images/Buttons/simpleButton.png', 'Simple');
  simpleButton.position(width / 3, height / 2);
  simpleButton.size(50, 20);
  simpleButton.mousePressed(() => {
    optionOne = 'simple';
    optionOnePage = false;
    optionTwoPage = true;
    pageState();
  });
  simpleButton.style('cursor', 'pointer');

  newButton = createImg('Media/Images/Buttons/newButton.png', 'New');
  newButton.position(width / 2 + 10, height / 2);
  newButton.size(30, 20);
  newButton.mousePressed(() => {
    optionOne = 'new';
    optionOnePage = false;
    optionTwoPage = true;
    pageState();
  });
  newButton.style('cursor', 'pointer');

  unsettledButton = createImg('Media/Images/Buttons/unsettledButton.png', 'Unsettled');
  unsettledButton.position(width * 2 / 3, height / 2);
  unsettledButton.size(70, 20);
  unsettledButton.mousePressed(() => {
    optionOne = 'unsettled';
    optionOnePage = false;
    optionTwoPage = true;
    pageState();
  });
  unsettledButton.style('cursor', 'pointer');

  // OPTION TWO - HOPING TO FIND SOMETHING:
  usefulButton = createImg('Media/Images/Buttons/usefulButton.png', 'Useful');
  usefulButton.position(width / 3, height / 2);
  usefulButton.size(45, 20);
  usefulButton.mousePressed(() => {
    optionTwo = 'useful';
    optionTwoPage = false;
    optionThreePage = true;
    pageState();
  });
  usefulButton.style('cursor', 'pointer');

  unexpectedButton = createImg('Media/Images/Buttons/unexpectedButton.png', 'Unexpected');
  unexpectedButton.position(width / 2, height / 2);
  unexpectedButton.size(80, 20);
  unexpectedButton.mousePressed(() => {
    optionTwo = 'unexpected';
    optionTwoPage = false;
    optionThreePage = true;
    pageState();
  });
  unexpectedButton.style('cursor', 'pointer');

  delightfulButton = createImg('Media/Images/Buttons/delightfulButton.png', 'Delightful');
  delightfulButton.position(width * 2 / 3 + 15, height / 2);
  delightfulButton.size(70, 20);
  delightfulButton.mousePressed(() => {
    optionTwo = 'delightful';
    optionTwoPage = false;
    optionThreePage = true;
    pageState();
  });
  delightfulButton.style('cursor', 'pointer');

  // OPTION THREE - TEXT INPUT:
  enterButton = createImg('Media/Images/Buttons/enterButton.png', 'Enter');
  enterButton.position(width / 2 + 50, height / 2 + 15);
  enterButton.size(40, 20);
  enterButton.style('cursor', 'pointer');
  enterButton.mousePressed(() => {
    userInput = textInput.value();
    console.log("User entered:", userInput);
    optionThreePage = false;
    gachaPage = true;
    pageState();
  });
  textInput = createInput('');
  textInput.position(width / 2 - 100, height / 2);
  textInput.size(100, 30);
  textInput.style('font-size', '16px');
  textInput.style('padding', '5px');
  textInput.style('border-radius', '5px');
  textInput.style('border', '1px solid #ccc');

  nothingButton = createImg('Media/Images/Buttons/nothingButton.png', 'Nothing');
  nothingButton.position(width / 2 - 20, height / 2 + 100);
  nothingButton.size(80, 20);
  nothingButton.style('cursor', 'pointer');
  nothingButton.mousePressed(() => {
    userInput = "";
    optionThreePage = false;
    gachaPage = true;
    pageState();
  });

  pullButton = createImg('Media/Images/Buttons/pullButton.png', 'Pull');
  pullButton.position(width / 2 - 15, height / 2 + 150);
  pullButton.size(30, 20);
  pullButton.style('cursor', 'pointer');
  pullButton.mousePressed(gachaPull);

  nextButton = createImg('Media/Images/Buttons/nextButton.png', 'Next');
  nextButton.position(width / 2 - 15, height / 2 + 150);
  nextButton.size(30, 20);
  nextButton.style('cursor', 'pointer');
  nextButton.mousePressed(() => {
    gachaPage = false;
    collectionLogPage = true;
    pageState();
  });

  pageState();
}

function pageState() {
  hideAllButtons();
  background(255);

  if (textInput) textInput.hide();

  if (startPage) {
    startButton.show();

  }
  else if (optionOnePage) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("today feels...", width / 2, height / 2 - 150);

    simpleButton.show();
    newButton.show();
    unsettledButton.show();
  }
  else if (optionTwoPage) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("hoping to find something...", width / 2, height / 2 - 150);

    usefulButton.show();
    unexpectedButton.show();
    delightfulButton.show();
  }
  else if (optionThreePage) {
    textInput.show();
    enterButton.show();
    nothingButton.show();

    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("leaving something behind?", width / 2, height / 2 - 150);
  }
  else if (gachaPage) {
    pullButton.show();
    if (pullCount >= 4) {
      pullButton.hide();
      nextButton.show();
    } else {
      nextButton.hide();
    }
  }
  else if (collectionLogPage) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Collection Log:", width / 2, height / 5);

    textSize(16);
    textAlign(CENTER, CENTER);
    if (pullOne) {
      text("1. " + pullOne, width / 2, height / 3);
    }
    if (pullTwo) {
      text("2. " + pullTwo, width / 2, height / 3 + 60);
    }
    if (pullThree) {
      text("3. " + pullThree, width / 2, height / 3 + 120);
    }
    if (pullFour) {
      text("4. " + pullFour, width / 2, height / 3 + 180);
    }

    if (!restartButton) {
      restartButton = createImg('Media/Images/Buttons/restartButton.png', 'Restart');
      restartButton.position(width / 2 - 40, height * 0.9);
      restartButton.size(80, 30);
      restartButton.style('cursor', 'pointer');
    }

    restartButton.show();
    restartButton.mousePressed(() => {
      startPage = true;
      optionOnePage = false;
      optionTwoPage = false;
      optionThreePage = false;
      gachaPage = false;
      collectionLogPage = false;

      optionOne = "";
      optionTwo = "";
      userInput = "";

      pulled = "";
      description = "";
      pullCount = 0;
      pullOne = pullTwo = pullThree = pullFour = null;
      pullOneDesc = pullTwoDesc = pullThreeDesc = pullFourDesc = null;

      pageState();
    });
  }
}

function handleButtons() {
  startPage = false;
  optionOnePage = true;
  pageState();
}

function gachaPull() {

  let grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);

  pulled = grammar.flatten("#origin#");

  description = "";
  if (optionOne && optionTwo) {
    let descKey = "desc_" + optionOne + "_" + optionTwo;
    if (grammarSource[descKey]) {
      description = grammar.flatten("#" + descKey + "#");
      // console.log("Using description key:", descKey);
    } else {
      // console.log("No description found for key:", descKey);
      // description = "???";
    }
  }

  pullCount++;
  if (pullCount === 1) {
    pullOne = pulled;
    pullOneDesc = description;
  } else if (pullCount === 2) {
    pullTwo = pulled;
    pullTwoDesc = description;
  } else if (pullCount === 3) {
    pullThree = pulled;
    pullThreeDesc = description;
  } else if (pullCount === 4) {
    pullFour = pulled;
    pullFourDesc = description;
  }

  // console.log("Pull #" + pullCount + ":", pulled);
  // console.log("Description:", description);
  // console.log("Options selected:", optionOne, optionTwo);

}

function hideAllButtons() {
  if (startButton) startButton.hide();
  if (simpleButton) simpleButton.hide();
  if (newButton) newButton.hide();
  if (unsettledButton) unsettledButton.hide();
  if (usefulButton) usefulButton.hide();
  if (unexpectedButton) unexpectedButton.hide();
  if (delightfulButton) delightfulButton.hide();
  if (enterButton) enterButton.hide();
  if (nothingButton) nothingButton.hide();
  if (pullButton) pullButton.hide();
  if (nextButton) nextButton.hide();
  if (restartButton) restartButton.hide();
}

let grammarSource = {
  "origin": "#item_adj# #items#",
  "items": [
    "baklava",
    "canelé",
    "cinnamon roll",
    "croissant",
    "doughnut",
    "éclair",
    "pain au chocolat",
    "shortcake",
    "bagel",
    "baguette",
    "brioche",
    "ciabatta",
    "cornbread",
    "flatbread",
    "focaccia",
    "hamburger bun",
    "muffin",
    "naan",
    "paratha",
    "pita",
    "potato bread",
    "pretzel",
    "pumpernickel",
    "scone",
    "soda bread",
    "sourdough",
    "tortilla",
    "dagger",
    "katana",
    "knife",
    "longsword",
    "claymore",
    "rapier",
    "axe",
    "glaive",
    "spear",
    "whip",
    "hammer",
    "pickaxe",
    "bag",
    "balloon",
    "barrel",
    "beaker",
    "bucket",
    "briefcase",
    "display",
    "mug",
    "tray",
    "vase",
    "wallet",
    "wrapper",
    "acorn",
    "bag of cotton balls",
    "bag of popcorn",
    "ball of yarn",
    "bananas",
    "bangle bracelet",
    "bar of soap",
    "baseball",
    "baseball bat",
    "baseball hat",
    "basketball",
    "beaded bracelet",
    "beaded necklace",
    "beef",
    "blowdryer",
    "bonesaw",
    "book",
    "book of matches",
    "bookmark",
    "boom box",
    "bottle",
    "bottle cap",
    "bottle of honey",
    "bottle of ink",
    "bottle of oil",
    "bottle of paint",
    "bottle of pills",
    "bottle of soda",
    "bottle of water",
    "bouquet of flowers",
    "bowl",
    "box of Q-tips",
    "box of baking soda",
    "box of chalk",
    "box of chocolates",
    "box of crayons",
    "box of markers",
    "box of tissues",
    "broccoli",
    "brush",
    "buckle",
    "butter knife",
    "button",
    "camera",
    "candlestick",
    "candy bar",
    "card",
    "carrots",
    "clay pot",
    "clothes pin",
    "coffee pot",
    "comb",
    "cookie jar",
    "cork",
    "cowboy hat",
    "credit card",
    "deodorant",
    "dictionary",
    "domino set",
    "drill press",
    "egg",
    "empty bottle",
    "eraser",
    "extension cord",
    "eye liner",
    "face wash",
    "feather",
    "feather duster",
    "few batteries",
    "fish",
    "fishing hook",
    "flashlight",
    "flowers",
    "football",
    "fork",
    "fridge",
    "frying pan",
    "game cartridge",
    "glasses",
    "hair brush",
    "handful of change",
    "harmonica",
    "helmet",
    "jar of jam",
    "key",
    "keyboard",
    "keychain",
    "keys",
    "kitchen knife",
    "light bulb",
    "lighter",
    "lotion",
    "magazine",
    "martini glass",
    "matchbook",
    "microphone",
    "milk carton",
    "money",
    "ocarina",
    "pack of cards",
    "package of crisp and crunchy edibles",
    "package of glitter",
    "packet of seeds",
    "paintbrush",
    "pair of binoculars",
    "pair of dice",
    "pair of knitting needles",
    "pair of rubber gloves",
    "pair of safety goggles",
    "pair of socks",
    "pasta strainer",
    "pearl necklace",
    "pen caps",
    "piece of gum",
    "pillow",
    "pocketknife",
    "pocketwatch",
    "quartz crystal",
    "quilt",
    "roll of toilet paper",
    "rolling pin",
    "salt shaker",
    "scallop shell",
    "screwdriver",
    "sheet of paper",
    "snail shell",
    "socks",
    "sofa",
    "spatula",
    "spice bottle",
    "sponge",
    "spool of thread",
    "spool of wire",
    "steak knife",
    "stop sign",
    "teapot",
    "tennis ball",
    "thermometer",
    "thimble",
    "toilet paper tube",
    "tomato",
    "toothbrush",
    "trash bag",
    "tube of lip balm",
    "umbrella",
    "wedding ring",
    "wine glass",
    "wrench"
  ],
  "item_adj": [
    "pristine",
    "dusty",
    "ceramic-coated",
    "gold-plated",
    "mud-soaked",
    "unwashed",
    "sun-bleached",
    "clean-enough",
    "still-wet",
    "hot-glued",
    "vacuum-sealed",
    "warped",
    "dented",
    "stale",
    "soggy",
    "corroded",
    "handdrawn",
    "melted",
    "sticky",
    "antique",
    "synthetic",
    "soft",
    "metallic",
    "wooden",
    "tiny",
    "off-brand",
    "leftover",
    "translucent",
    "poorly-labeled",
    "sticker-covered",
    "commemorative",
    "promotional",
    "ceremonial",
    "judgmental",
    "unlicensed",
    "consumable",
    "single-use",
    "waxed",
    "waxy",
    "grainy",
    "greasy",
    "pre-owned",
    "on-loan",
    "mint-condition",
    "subscription-based",
    "part of a set",
    "illegally-imported",
    "stolen",
    "friend-shaped",
    "probably-one-of-a-kind",
    "microwave-safe",
    "dishwasher-safe",
    "ziplocked",
    "bubble-wrapped",
    "peeled",
    "blood-stained",
    "waterlogged",
    "unloved",
    "neglected",
    "bulk-packed"
  ],
  "desc_simple_useful": [
    "what do you even do with this?",
    "shove it in a drawer until it find its use one day.",
    "what the hell, sure.",
    "easily pocketing that.",
    "better to have it than not.",
    "perfect for pretending to know what you're doing.",
    "goes in the bag, no thoughts.",
    "guaranteed to spark one (1) conversation.",
    "a new family heirloom for you to pass down.",
    "you'd be surprised how often this kind of thing helps."
  ],
  "desc_simple_unexpected": [
    "woah! wow!? you guess??",
    "do they really sell things like this?",
    "unsure if this is junk or genius.",
    "that shouldn't be here. but it is!",
    "unsettling in the gentlest way.",
    "how weirdly charming.",
    "like finding a familiar word in a different language.",
    "looks weird. should be fine.",
    "ordinary and yet so magical.",
    "that shouldn't work, but it kinda does."
  ],
  "desc_simple_delightful": [
    "how sweet.",
    "don't need it, but it makes you kinda happy.",
    "why does this make your day better?",
    "you pick it up before even thinking about it.",
    "you never knew you needed this until now.",
    "it feels like it was made just for you.",
    "makes your pocket a little warmer.",
    "you feel better just by holding it.",
    "makes everything 2% better.",
    "your new favorite thing, ever."
  ],
  "desc_new_useful": [
    "surely it'll last.",
    "you'll reach for this more often in the future.",
    "useful now, indispensable later.",
    "you already got three things in mind for it.",
    "and it comes with instructions!",
    "warning: microwaved once.",
    "with a 10-year warranty!",
    "batteries included!",
    "not edible. not this time.",
    "works better if you believe in it."
  ],
  "desc_new_unexpected": [
    "not what you thought you needed right now.",
    "who asked for this? was it you?",
    "so this is what we're doing now?",
    "do you need it? not likely. do you want it? still not likely.",
    "well it didn't appear outta thin air, someone MADE this.",
    "it all makes less sense now.",
    "its not wrong, but its not right either.",
    "surprised? yeah, me too.",
    "you didn't want this, but now you can't stop thinking about it.",
    "how have you lived before receiving this?",
    "let's replan the agenda around this one."
  ],
  "desc_new_delightful": [
    "suddenly, the world feels a little less cold.",
    "its like it was hand-made. for you <3",
    "you can have one as a treat.",
    "a gentle delight. yup.",
    "and all the stars align for you.",
    "oh, joyous.",
    "you learn something new everyday.",
    "a new good luck charm.",
    "perfectly adept at what it does.",
    "serendipitous."
  ],
  "desc_unsettled_useful": [
    "might not make everything better, but it'll do",
    "once questionable, now reliable",
    "baby steps towards a new understanding",
    "not a solution, but you hold onto it",
    "just might be today's savior",
    "seems more useful right now than it truly is",
    "not the cure, but a start",
    "won't fix the world, but might fix today",
    "just what you needed, you just didn't know it",
    "pause. this might be onto something…"
  ],
  "desc_unsettled_unexpected": [
    "a little confused, but it got the spirit",
    "unexpected? up to interpretation",
    "well it has your attention now",
    "it's here! it's blessed you",
    "1/15,600 chance of claiming this specimen",
    "you feel an odd stirring in your gut",
    "nah bro, no one's gonna believe you",
    "all this does is hurt you",
    "the timing is all wrong with this one",
    "forever carved into your soul."
  ],
  "desc_unsettled_delightful": [
    "no way this is what makes your day better",
    "disorienting, in the best way possible",
    "genuinely offsets all your qualms",
    "a new thing to be unsettled about",
    "it can probably pass the vibe check",
    "don't judge yet. its a diamond in the rough",
    "it matches you",
    "a real tear-jerker here",
    "it's the small things that count",
    "placing this on your shelf like a national treasure."
  ]
};