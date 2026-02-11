const families = [
  ["Write","Drive","Ride","Wake","Wear","Steal","Break","Speak","Get","Forget","Win"],
  ["Begin","Drink","Swim","Sing","Ring","Run","Sit","Give","Forgive","Come","Become"],
  ["Spend","Send","Lend","Build","Learn","Burn","Mean","Dream","Smell","Lose"],
  ["Read","Put","Cut","Hurt","Cost","Cast","Hit","Fit","Set","Let","Beat"],
  ["Think","Teach","Catch","Bring","Buy","Fight"],
  ["Know","Grow","Throw","Blow","Fly","Draw"],
  ["Meet","Feed","Speed","Choose"],
  ["Take","Stand","Understand"],
  ["Feel","Keep","Sleep","Sweep","Leave"],
  ["Say","Pay","Lay"],
  ["Sell","Tell"],
  ["Bite","Hide"],
  ["Fall","Hold"],
  ["Be","Do","Have","Go","Make","Eat","See","Hear","Find","Light","Say"]
];

const answers = {
  Write: ["wrote","written"],
  Drive: ["drove","driven"],
  Ride: ["rode","ridden"],
  Wake: ["woke","woken"],
  Wear: ["wore","worn"],
  Swear: ["swore","sworn"],
  Tear: ["tore","torn"],
  Bear: ["bore","borne"],
  Steal: ["stole","stolen"],
  Break: ["broke","broken"],
  Speak: ["spoke","spoken"],
  Get: ["got","gotten"],
  Forget: ["forgot","forgotten"],
  Win: ["won","won"],
  Begin: ["began","begun"],
  Drink: ["drank","drunk"],
  Swim: ["swam","swum"],
  Sing: ["sang","sung"],
  Ring: ["rang","rung"],
  Sink: ["sank","sunk"],
  Stink: ["stank","stunk"],
  Run: ["ran","run"],
  Sit: ["sat","sat"],
  Give: ["gave","given"],
  Forgive: ["forgave","forgiven"],
  Come: ["came","come"],
  Become: ["became","become"],
  Spend: ["spent","spent"],
  Send: ["sent","sent"],
  Lend: ["lent","lent"],
  Build: ["built","built"],
  Learn: ["learnt","learnt"],
  Burn: ["burnt","burnt"],
  Mean: ["meant","meant"],
  Dream: ["dreamt","dreamt"],
  Deal: ["dealt","dealt"],
  Smell: ["smelt","smelt"],
  Spell: ["spelt","spelt"],
  Lose: ["lost","lost"],
  Read: ["read","read"],
  Put: ["put","put"],
  Cut: ["cut","cut"],
  Hurt: ["hurt","hurt"],
  Shut: ["shut","shut"],
  Cost: ["cost","cost"],
  Cast: ["cast","cast"],
  Broadcast: ["broadcast","broadcast"],
  Hit: ["hit","hit"],
  Fit: ["fit","fit"],
  Set: ["set","set"],
  Let: ["let","let"],
  Spread: ["spread","spread"],
  Split: ["split","split"],
  Beat: ["beat","beaten"],
  Burst: ["burst","burst"],
  Think: ["thought","thought"],
  Teach: ["taught","taught"],
  Catch: ["caught","caught"],
  Bring: ["brought","brought"],
  Buy: ["bought","bought"],
  Fight: ["fought","fought"],
  Seek: ["sought","sought"],
  Know: ["knew","known"],
  Grow: ["grew","grown"],
  Throw: ["threw","thrown"],
  Blow: ["blew","blown"],
  Fly: ["flew","flown"],
  Draw: ["drew","drawn"],
  Meet: ["met","met"],
  Feed: ["fed","fed"],
  Speed: ["sped","sped"],
  Bleed: ["bled","bled"],
  Lead: ["led","led"],
  Choose: ["chose","chosen"],
  Shoot: ["shot","shot"],
  Take: ["took","taken"],
  Mistake: ["mistook","mistaken"],
  Stand: ["stood","stood"],
  Understand: ["understood","understood"],
  Feel: ["felt","felt"],
  Keep: ["kept","kept"],
  Sleep: ["slept","slept"],
  Sweep: ["swept","swept"],
  Weep: ["wept","wept"],
  Leave: ["left","left"],
  Stick: ["stuck","stuck"],
  Hang: ["hung","hung"],
  Swing: ["swung","swung"],
  Say: ["said","said"],
  Pay: ["paid","paid"],
  Lay: ["laid","laid"],
  Sell: ["sold","sold"],
  Tell: ["told","told"],
  Bite: ["bit","bitten"],
  Hide: ["hid","hidden"],
  Fall: ["fell","fallen"],
  Hold: ["held","held"],
  Be: ["was/were","been"],
  Do: ["did","done"],
  Have: ["had","had"],
  Go: ["went","gone"],
  Make: ["made","made"],
  Eat: ["ate","eaten"],
  See: ["saw","seen"],
  Hear: ["heard","heard"],
  Find: ["found","found"],
  Forbid: ["forbade","forbidden"],
  Light: ["lit","lit"],
};

const grid = document.getElementById("grid");

families.forEach(group => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <input class="family-input" placeholder="Type Family Name..." />
    <div class="table-header">
      <div>Infinitive</div>
      <div>Past</div>
      <div>Participle</div>
      <div></div>
    </div>
  `;

  group.forEach(verb => {
    const row = document.createElement("div");
    row.className = "verb-row";
    row.innerHTML = `
      <span>${verb}</span>
      <input class="small" />
      <input class="small" />
      <button class="row-check" onclick="checkRow(this)">Check</button>
    `;
    card.appendChild(row);
  });

  grid.appendChild(card);
});

function checkAnswers() {
  let correct = 0;
  let total = 0;

  document.querySelectorAll(".verb-row").forEach(row => {
    const verb = row.querySelector("span").innerText;
    const inputs = row.querySelectorAll("input");

    if (!answers[verb]) return;

    inputs.forEach((input, i) => {
      total++;
      input.classList.remove("correct","wrong");

      if (input.value.trim().toLowerCase() === answers[verb][i].toLowerCase()) {
        input.classList.add("correct");
        correct++;
      } else {
        input.classList.add("wrong");
      }
    });
  });

  document.getElementById("score").innerText =
    `Score: ${correct} / ${total}`;
}

function checkRow(button) {
  const row = button.parentElement;
  const verb = row.querySelector("span").innerText;
  const inputs = row.querySelectorAll("input");

  if (!answers[verb]) return;

  inputs.forEach((input, i) => {
    input.classList.remove("correct", "wrong");

    if (input.value.trim().toLowerCase() === answers[verb][i].toLowerCase()) {
      input.classList.add("correct");
    } else {
      input.classList.add("wrong");
    }
  });
}
