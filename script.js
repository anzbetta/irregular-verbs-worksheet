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
  Write:["wrote","written"],Drive:["drove","driven"],Ride:["rode","ridden"],
  Wake:["woke","woken"],Wear:["wore","worn"],Steal:["stole","stolen"],
  Break:["broke","broken"],Speak:["spoke","spoken"],Get:["got","gotten"],
  Forget:["forgot","forgotten"],Win:["won","won"],Begin:["began","begun"],
  Drink:["drank","drunk"],Swim:["swam","swum"],Sing:["sang","sung"],
  Ring:["rang","rung"],Run:["ran","run"],Sit:["sat","sat"],
  Give:["gave","given"],Forgive:["forgave","forgiven"],
  Come:["came","come"],Become:["became","become"],
  Spend:["spent","spent"],Send:["sent","sent"],Lend:["lent","lent"],
  Build:["built","built"],Learn:["learnt","learnt"],Burn:["burnt","burnt"],
  Mean:["meant","meant"],Dream:["dreamt","dreamt"],
  Smell:["smelt","smelt"],Lose:["lost","lost"],
  Read:["read","read"],Put:["put","put"],Cut:["cut","cut"],
  Hurt:["hurt","hurt"],Cost:["cost","cost"],Cast:["cast","cast"],
  Hit:["hit","hit"],Fit:["fit","fit"],Set:["set","set"],Let:["let","let"],
  Beat:["beat","beaten"],Think:["thought","thought"],
  Teach:["taught","taught"],Catch:["caught","caught"],
  Bring:["brought","brought"],Buy:["bought","bought"],
  Fight:["fought","fought"],Know:["knew","known"],
  Grow:["grew","grown"],Throw:["threw","thrown"],
  Blow:["blew","blown"],Fly:["flew","flown"],
  Draw:["drew","drawn"],Meet:["met","met"],
  Feed:["fed","fed"],Speed:["sped","sped"],
  Choose:["chose","chosen"],Take:["took","taken"],
  Stand:["stood","stood"],Understand:["understood","understood"],
  Feel:["felt","felt"],Keep:["kept","kept"],
  Sleep:["slept","slept"],Sweep:["swept","swept"],
  Leave:["left","left"],Say:["said","said"],
  Pay:["paid","paid"],Lay:["laid","laid"],
  Sell:["sold","sold"],Tell:["told","told"],
  Bite:["bit","bitten"],Hide:["hid","hidden"],
  Fall:["fell","fallen"],Hold:["held","held"],
  Be:["was/were","been"],Do:["did","done"],
  Have:["had","had"],Go:["went","gone"],
  Make:["made","made"],Eat:["ate","eaten"],
  See:["saw","seen"],Hear:["heard","heard"],
  Find:["found","found"],Light:["lit","lit"]
};

const grid = document.getElementById("grid");

function disablePredictive(input){

  input.type = "text";
  input.readOnly = true;

  input.setAttribute("autocomplete","off");
  input.setAttribute("autocorrect","off");
  input.setAttribute("autocapitalize","none");
  input.setAttribute("spellcheck","false");
  input.setAttribute("inputmode","none");

  input.addEventListener("focus", () => {
    input.removeAttribute("readonly");
  });

}


families.forEach(group=>{
  const card=document.createElement("div");
  card.className="card";

  const fam=document.createElement("input");
  fam.className="family-input";
  fam.placeholder="Type Family Name...";
  disablePredictive(fam);

  const header=document.createElement("div");
  header.className="table-header";
  header.innerHTML=`
    <div>Infinitive</div>
    <div>Past</div>
    <div>Participle</div>
    <div></div>
  `;

  card.append(fam,header);

  group.forEach(verb=>{
    const row=document.createElement("div");
    row.className="verb-row";

    const span=document.createElement("span");
    span.innerText=verb;

    const past=document.createElement("input");
    past.className="small";
    disablePredictive(past);

    const part=document.createElement("input");
    part.className="small";
    disablePredictive(part);

    const btn=document.createElement("button");
    btn.className="row-check";
    btn.innerText="Check";
    btn.onclick=()=>checkRow(btn);

    row.append(span,past,part,btn);
    card.appendChild(row);
  });

  grid.appendChild(card);
});

function checkAnswers(){
  let correct=0,total=0;
  document.querySelectorAll(".verb-row").forEach(row=>{
    const verb=row.querySelector("span").innerText;
    const inputs=row.querySelectorAll("input");
    if(!answers[verb])return;
    inputs.forEach((input,i)=>{
      total++;
      input.classList.remove("correct","wrong");
      if(input.value.trim().toLowerCase()===answers[verb][i]){
        input.classList.add("correct");correct++;
      }else{input.classList.add("wrong");}
    });
  });
  document.getElementById("score").innerText=`Score: ${correct} / ${total}`;
}

function checkRow(button){
  const row=button.parentElement;
  const verb=row.querySelector("span").innerText;
  const inputs=row.querySelectorAll("input");
  if(!answers[verb])return;
  inputs.forEach((input,i)=>{
    input.classList.remove("correct","wrong");
    if(input.value.trim().toLowerCase()===answers[verb][i]){
      input.classList.add("correct");
    }else{input.classList.add("wrong");}
  });
}

function saveToStorage(){
  const data={};
  document.querySelectorAll(".card").forEach((card,i)=>{
    data[`family_${i}`]=card.querySelector(".family-input").value;
    card.querySelectorAll(".verb-row").forEach(row=>{
      const verb=row.querySelector("span").innerText;
      const inputs=row.querySelectorAll("input");
      data[`${verb}_past`]=inputs[0].value;
      data[`${verb}_participle`]=inputs[1].value;
    });
  });
  localStorage.setItem("irregularVerbs",JSON.stringify(data));
}

function loadFromStorage(){
  const saved=localStorage.getItem("irregularVerbs");
  if(!saved)return;
  const data=JSON.parse(saved);
  document.querySelectorAll(".card").forEach((card,i)=>{
    card.querySelector(".family-input").value=data[`family_${i}`]||"";
    card.querySelectorAll(".verb-row").forEach(row=>{
      const verb=row.querySelector("span").innerText;
      const inputs=row.querySelectorAll("input");
      inputs[0].value=data[`${verb}_past`]||"";
      inputs[1].value=data[`${verb}_participle`]||"";
    });
  });
}

function resetAll(){
  document.querySelectorAll("input").forEach(input=>{
    input.value="";
    input.classList.remove("correct","wrong");
  });
  document.getElementById("score").innerText="";
  localStorage.removeItem("irregularVerbs");
}

document.addEventListener("input",e=>{
  if(e.target.tagName==="INPUT"){saveToStorage();}
});

loadFromStorage();
