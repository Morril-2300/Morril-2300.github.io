let characterData = {
  charName: "",
  charClass: "",
  charBackground: "",
  charLineage: "",

  ac: "",
  hpMax: 0,
  hpCur: 0,
  hpTemp: 0,

  hitDice: "",
  hitDiceExp: "",

  deathSaves: [false, false, false],
  deathFails: [false, false, false],

  personality: "",
  ideals: "",
  bonds: "",
  flaws: "",

  class_features: "",
  other_features: "",

  xp: 0,
  level: 1,

  profBonus: 2,

  abilityScores: [10, 10, 10, 10, 10, 10],
  abilityMods: [0, 0, 0, 0, 0, 0],
  saveProficiency: [false,false,false,false,false],
  saveMods: [0, 0, 0, 0, 0, 0],
  proficiency: [
    [0],
    [0, 0, 0],
    [],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  skillMods: [
    [0],
    [0, 0, 0],
    [],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0]
  ],

  inspo: false,
  
  initiative: 0,
  speed: "",
  weight: "",
  size: "",

  cp: 0,
  sp: 0,
  ep: 0,
  gp: 0,
  pp: 0,

  atk_notes: "",
  add_notes: "",

  proficiencies: "",
  equipment: "",

  attacks: [["","","",""]],
  //        prep lvl name time rng c     r     s     v     m  dur effect notes 
  spells: [[false, , "", "", "", false,false,false,false,false, "", "", ""]],

  spellcasting_ability: "",
  spell_attack_mod: "",
  spell_save_dc: "",

  spell_slots: ["","","","","","","","",""]
};


/* background variables **************************************************************/
const abilities = ["str", "dex", "con", "int", "wis", "cha"];
const skills = [
  ["Athletics"],
  ["Acrobatics", "SleightOfHand", "Stealth"],
  [],
  ["Arcana", "History", "Investigation", "Nature", "Religion"],
  ["AnimalHandling", "Insight", "Medicine", "Perception", "Survival"],
  ["Deception", "Intimidation", "Performance", "Persuasion"]
];
const levelXP = [
  0,300,900,2700,6500,14000,23000,34000,48000,64000,
  85000,100000,120000,140000,165000,195000,225000,265000,305000,355000
];
let attackIndex = 1;
let spellIndex =1;

/* calculations im-&export **********************************************************/

function main() {
  getData();
  calcAndWriteAbilities();
}

function calcModifier(score) {
  return Math.floor((score - 10) / 2);
}

function write() {
  writeAbilities();

  document.getElementById("xp").value = characterData.xp;
  document.getElementById("level").value = characterData.level;

  document.getElementById("charName").value = characterData.charName;
  document.getElementById("charClass").value = characterData.charClass;
  document.getElementById("charBackground").value = characterData.charBackground;
  document.getElementById("charLineage").value = characterData.charLineage;
  
  document.getElementById("ac").value = characterData.ac;
  document.getElementById("hpMax").value = characterData.hpMax;
  document.getElementById("hpCur").value = characterData.hpCur;
  document.getElementById("hpTemp").value = characterData.hpTemp;
  
  document.getElementById("hitDice").value = characterData.hitDice;
  document.getElementById("hitDiceExp").value = characterData.hitDiceExp;

  for (let i = 0; i < 3; i++) {
    document.getElementById("save"+i).checked = characterData.deathSaves[i];
    document.getElementById("fail"+i).checked = characterData.deathFails[i];
  }

  document.getElementById("inspo").checked = characterData.inspo;

  document.getElementById("initiative").value = characterData.initiative;
  document.getElementById("speed").value = characterData.speed;
  document.getElementById("weight").value = characterData.weight;
  document.getElementById("size").value = characterData.size;

  document.getElementById("proficiency-bonus").value = characterData.profBonus;

  
  document.getElementById("personality").value = characterData.personality;
  document.getElementById("ideals").value = characterData.ideals;
  document.getElementById("bonds").value = characterData.bonds;
  document.getElementById("flaws").value = characterData.flaws;

  document.getElementById("class_features").value = characterData.class_features;
  document.getElementById("other_features").value = characterData.other_features;

  document.getElementById("cp").value = characterData.cp;
  document.getElementById("sp").value = characterData.sp;
  document.getElementById("ep").value = characterData.ep;
  document.getElementById("gp").value = characterData.gp;
  document.getElementById("pp").value = characterData.pp;

  writeAttacks();
  writeSpells();

  document.getElementById("add_notes").value = characterData.add_notes;
  document.getElementById("atk_notes").value = characterData.atk_notes;

  document.getElementById("proficiencies").value = characterData.proficiencies;
  document.getElementById("equipment").value = characterData.equipment;

  document.getElementById("spellcasting_ability").value = characterData.spellcasting_ability;
  document.getElementById("spell_attack_mod").value = characterData.spell_attack_mod;
  document.getElementById("spell_save_dc").value = characterData.spell_save_dc;

  for (let i = 0; i < 9; i++) {
    document.getElementById("slots_" + (i+1)).value = characterData.spell_slots[i];
  }
}

function writeAbilities() {
  for (let i = 0; i < abilities.length; i++) {
    const ability = abilities[i];
    const mod = characterData.abilityMods[i];
    const save_mod = characterData.saveMods[i];
    document.getElementById("score_" + ability).value = characterData.abilityScores[i];
    document.getElementById("mod_" + ability).value = (mod >= 0 ? "+" : "") + mod;
    document.getElementById("save_mod_" + ability).value = (save_mod >= 0 ? "+" : "") + save_mod;
    document.getElementById("save_prof_" + ability).checked = characterData.saveProficiency[i];
    
    for (let j = 0; j < skills[i].length; j++) {
      const skill = skills[i][j];
      const skillMod = characterData.skillMods[i][j];
      document.getElementById("skill_" + skill).value = (skillMod >= 0 ? "+" : "") + skillMod;
      document.getElementById("prof_" + skill).value = characterData.proficiency[i][j];
    }
  }
}

function getData() {
  getAbilities();

  characterData.level = parseInt(document.getElementById("level").value) || 1;
  characterData.xp = parseInt(document.getElementById("xp").value) || 0;


  characterData.charName = document.getElementById("charName").value;
  characterData.charClass = document.getElementById("charClass").value;
  characterData.charBackground = document.getElementById("charBackground").value;
  characterData.charLineage = document.getElementById("charLineage").value;
  
  characterData.ac = document.getElementById("ac").value;
  characterData.hpMax = document.getElementById("hpMax").value;
  characterData.hpCur = document.getElementById("hpCur").value;
  characterData.hpTemp = document.getElementById("hpTemp").value;
  
  characterData.hitDice = document.getElementById("hitDice").value;
  characterData.hitDiceExp = document.getElementById("hitDiceExp").value;

  for (let i = 0; i < 3; i++) {
    characterData.deathSaves[i] = document.getElementById("save"+i).checked;
    characterData.deathFails[i] = document.getElementById("fail"+i).checked;
  }

  characterData.inspo = document.getElementById("inspo").checked;

  characterData.initiative = document.getElementById("initiative").value;
  characterData.speed = document.getElementById("speed").value;
  characterData.weight = document.getElementById("weight").value;
  characterData.size = document.getElementById("size").value;

  characterData.personality = document.getElementById("personality").value;
  characterData.ideals = document.getElementById("ideals").value;
  characterData.bonds = document.getElementById("bonds").value;
  characterData.flaws = document.getElementById("flaws").value;

  characterData.class_features = document.getElementById("class_features").value;
  characterData.other_features = document.getElementById("other_features").value;

  characterData.cp = document.getElementById("cp").value;
  characterData.sp = document.getElementById("sp").value;
  characterData.ep = document.getElementById("ep").value;
  characterData.gp = document.getElementById("gp").value;
  characterData.pp = document.getElementById("pp").value;

  saveAttacksToStorage();
  saveSpellsToStorage();

  characterData.add_notes = document.getElementById("add_notes").value;
  characterData.atk_notes = document.getElementById("atk_notes").value;

  characterData.proficiencies = document.getElementById("proficiencies").value;
  characterData.equipment = document.getElementById("equipment").value;


  characterData.spellcasting_ability = document.getElementById("spellcasting_ability").value;
  characterData.spell_attack_mod = document.getElementById("spell_attack_mod").value;
  characterData.spell_save_dc = document.getElementById("spell_save_dc").value;

  for (let i = 0; i < 9; i++) {
    characterData.spell_slots[i] = document.getElementById("slots_" + (i+1)).value;
  }
}

function getAbilities() {
  characterData.profBonus = parseInt(document.getElementById("proficiency-bonus").value) || 2;
  for (let i = 0; i < abilities.length; i++) {
    // get scores from sheet
    characterData.abilityScores[i] = parseInt(document.getElementById("score_" + abilities[i]).value) || 0;
    characterData.abilityMods[i] = calcModifier(characterData.abilityScores[i]);
  }
}

function calcAndWriteAbilities() {
  getAbilities();
  for (let i = 0; i < abilities.length; i++) {
    const ability = abilities[i];
    const mod = characterData.abilityMods[i];
    // write mod
    document.getElementById("mod_" + ability).value =
      (mod >= 0 ? "+" : "") + mod;
    // calc save
    const saveProf = document.getElementById("save_prof_" + ability).checked;
    characterData.saveProficiency[i] = saveProf;
    const saveMod = mod + saveProf * characterData.profBonus;
    characterData.saveMods[i] = saveMod;
    document.getElementById("save_mod_" + ability).value = 
      (saveMod >= 0 ? "+" : "") + saveMod;
    // calc skills
    for (let j = 0; j < skills[i].length; j++) {
      const skill = skills[i][j];
      const skillProf = document.getElementById("prof_" + skill).value;
      characterData.proficiency[i][j] = skillProf;
      const skillMod = mod + skillProf * characterData.profBonus;
      characterData.skillMods[i][j] = skillMod;
      document.getElementById("skill_" + skill).value = 
        (skillMod >= 0 ? "+" : "") + skillMod;
    }
  }
}

function calcWriteLevel() {
  characterData.xp = document.getElementById("xp").value;
  for (let i = 0; i < levelXP.length; i++) {
    if (characterData.xp < levelXP[i]) {
      document.getElementById("level").value = i;
      characterData.level = i;
      return;
    }
  }
  document.getElementById("level").value = 20;
  characterData.level = 20;
}

function calcWriteXP() {
  characterData.level = document.getElementById("level").value;
  if (characterData.level > 20) {
    characterData.level = 20;
    document.getElementById("level").value = 20;
  }
  const xp = levelXP[characterData.level-1];
  characterData.xp = xp;
  document.getElementById("xp").value = xp;
}

function saveAttacksToStorage() {
  const rows = document.querySelectorAll("#atk-list .attack");
  const data = [];

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    let attack = [
      (inputs[0]?.value || ""),
      (inputs[1]?.value || ""),
      (inputs[2]?.value || ""),
      (inputs[3]?.value || "")
    ];
    data.push(attack);
  });
  sessionStorage.setItem("attackData", JSON.stringify(data));
  characterData.attacks = data;
}

function loadAttacksFromStorage() {
  characterData.attacks = JSON.parse(sessionStorage.getItem("attackData"));
  writeAttacks();
}

function writeAttacks() {
  const data = characterData.attacks;
  const atkList = document.getElementById("atk-list");

  if (data != null && data.length != 0) {
    atkList.querySelectorAll(".attack").forEach(el => el.remove());
    data.forEach((item, i) => {
      const row = createAttackRow(i, i === 0, item);
      atkList.appendChild(row);
    });
  }

  reindexAttackRows();
  attachAttackEventListeners();
}



function saveSpellsToStorage() {
  const rows = document.querySelectorAll(".spell");
  const data = [];

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    let spell = [
      (inputs[ 0].checked),
      (inputs[ 1]?.value),
      (inputs[ 2]?.value  || ""),
      (inputs[ 3]?.value  || ""),
      (inputs[ 4]?.value  || ""),
      (inputs[ 5].checked),
      (inputs[ 6].checked),
      (inputs[ 7].checked),
      (inputs[ 8].checked),
      (inputs[ 9].checked),
      (inputs[10]?.value  || ""),
      (inputs[11]?.value  || ""),
      (inputs[12]?.value  || ""),
    ];
    data.push(spell);
  });
  sessionStorage.setItem("spellData", JSON.stringify(data));
  characterData.spells = data;
}

function loadSpellsFromStorage() {
  characterData.spells = JSON.parse(sessionStorage.getItem("spellData"));
  writeSpells();
}

function writeSpells() {
  const data = characterData.spells;
  const spellList = document.getElementById("spell-list");

  if (data != null && data.length != 0) {
    spellList.querySelectorAll(".spell").forEach(el => el.remove());
    data.forEach((item, i) => {
      const row = createSpellRow(i, i === 0, item);
      spellList.appendChild(row);
    });
  }

  reindexSpellRows();
  attachSpellEventListeners();
}

// add listener to fields

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("level").addEventListener("change", calcWriteXP);
  document.getElementById("xp").addEventListener("change", calcWriteLevel);

  // Limit to 2 digits
  document.querySelectorAll('input[class="ability_score"]').forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.length > 2) {
        input.value = input.value.slice(2);
      }
    });
  });

  // limit to 0..2 
  document.querySelectorAll('input[class="skillprof"]').forEach(input => {
    input.addEventListener('input', () => {
      if (input.value > 2 ) {
        input.value = 0;
      } else if (input.value < 0) {
        input.value = 2;
      }
    });
  });


  document.querySelectorAll('input').forEach( input => {
    input.addEventListener('change', main);
  });

  loadAttacksFromStorage();
  attachAttackEventListeners();
  loadSpellsFromStorage();
  attachSpellEventListeners();
});


// intercept save and export instead
window.addEventListener("keydown", function (e) {
  const isMac = navigator.userAgent.toUpperCase().includes("MAC");

  // Check for Ctrl+S (Windows/Linux) or Cmd+S (Mac)
  if ((isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s")) {
    e.preventDefault(); // Stop the browser's default Save behavior
    exportCharacter();
  }

  if ((isMac && e.metaKey && e.key === "o") || (!isMac && e.ctrlKey && e.key === "o")) {
    e.preventDefault(); // Stop the browser's default Save behavior
    document.getElementById('importButton').click();
  }
});


/* auto attack row  ********************************************************************************/

function createAttackRow(index, isFirst = false, data = []) {
  const div = document.createElement("div");
  div.className = "attack";

  div.innerHTML = `
    ${isFirst ? '<whitespace class="rm-atk"></whitespace>' :
      '<button type="button" class="remove-atk">-</button>'}
    <button type="button" class="add-atk">+</button>
    <input id="atk_name${index}" type="text" value="${data[0] || ''}" />
    <input id="atk_bonus${index}" type="text" value="${data[1] || ''}" />
    <input id="atk_dmg${index}" type="text" value="${data[2] || ''}" />
    <input id="atk_note${index}" type="text" value="${data[3] || ''}" />
  `;
  return div;
}
function createSpellRow(index, isFirst = false, data = []) {
  const div = document.createElement("div");
  div.className = "spell";

  div.innerHTML = `    
    ${isFirst ? '<whitespace class="rm-spell"></whitespace>' :
      '<button type="button" class="remove-spell">-</button>'}
    <button class="add-spell">+</button>
    <input class="prep" type="checkbox" id="prep_${index}"/>
    <input value="${data[ 1] || 0}" class="lvl" type="number" id="lvl_${index}"/>
    <input value="${data[ 2] ||''}" class="name" type="text" id="name_${index}"/>
    <input value="${data[ 3] ||''}" class="time" type="text" id="time_${index}"/>
    <input value="${data[ 4] ||'' }" class="range" type="text" id="range_${index}"/>
    <input class="conc" type="checkbox" id="conc_${index}"/>
    <input class="ritual" type="checkbox" id="ritual_${index}"/>
    <input class="component_s" type="checkbox" id="component_s_${index}"/>
    <input class="component_v" type="checkbox" id="component_v_${index}"/>
    <input class="component_m" type="checkbox" id="component_m_${index}"/>
    <input value="${data[10] ||'' }" class="dur" type="text" id="dur_${index}"/>
    <input value="${data[11] ||'' }" class="effect" type="text" id="effect_${index}"/>
    <input value="${data[12] ||'' }" class="notes" type="text" id="notes_${index}"/>
    <label class="link" onclick="spellInfo(this)">?</label>
  `;

  const checkboxes = [
    ["prep", 0],
    ["conc", 5],
    ["ritual", 6],
    ["component_s", 7],
    ["component_v", 8],
    ["component_m", 9],
  ];

  checkboxes.forEach(([cls, idx]) => {
    const checkbox = div.querySelector(`.${cls}`);
    checkbox.checked = !!data[idx]; 
  });

  return div;
}

function reindexAttackRows() {
  const rows = document.querySelectorAll("#atk-list .attack");

  rows.forEach((row, i) => {
    const inputs = row.querySelectorAll("input");
    if (inputs.length === 4) {
      inputs[0].id = `atk_name${i}`;
      inputs[1].id = `atk_bonus${i}`;
      inputs[2].id = `atk_dmg${i}`;
      inputs[3].id = `atk_note${i}`;
    }

    // Replace/remove first row's remove button
    const remove = row.querySelector(".remove-atk") || row.querySelector("whitespace");
    if (i === 0) {
      if (remove && remove.tagName === "BUTTON") {
        const ws = document.createElement("whitespace");
        ws.className = "rm-atk";
        row.replaceChild(ws, remove);
      }
    } else {
      if (remove && remove.tagName === "WHITESPACE") {
        const rm = document.createElement("button");
        rm.className = "remove-atk";
        rm.textContent = "-";
        rm.type = "button";
        row.replaceChild(rm, remove);
      }
    }
  });

  attackIndex = rows.length;
}

function reindexSpellRows() {
  const rows = document.querySelectorAll(".spell");

  rows.forEach((row, i) => {
    const inputs = row.querySelectorAll("input");
    if (inputs.length === 12) {
      inputs[ 0].id = `prep_${i}`;
      inputs[ 1].id = `lvl_${i}`;
      inputs[ 2].id = `name-${i}`;
      inputs[ 3].id = `time_${i}`;
      inputs[ 4].id = `dur_${i}`;
      inputs[ 5].id = `range_${i}`;
      inputs[ 6].id = `ritual_${i}`;
      inputs[ 7].id = `component_s_${i}`;
      inputs[ 8].id = `component_v_${i}`;
      inputs[ 9].id = `component_m_${i}`;
      inputs[10].id = `conc_${i}`;
      inputs[11].id = `effect_${i}`;
      inputs[12].id = `notes_${i}`;
    }

    // Replace/remove first row's remove button
    const remove = row.querySelector(".remove-spell") || row.querySelector("whitespace");
    if (i === 0) {
      if (remove && remove.tagName === "BUTTON") {
        const ws = document.createElement("whitespace");
        ws.className = "rm-spell";
        row.replaceChild(ws, remove);
      }
    } else {
      if (remove && remove.tagName === "WHITESPACE") {
        const rm = document.createElement("button");
        rm.className = "remove-spell";
        rm.textContent = "-";
        rm.type = "button";
        row.replaceChild(rm, remove);
      }
    }
  });

  spellIndex = rows.length;
}

function attachAttackEventListeners() {
  const atkList = document.getElementById("atk-list");

  atkList.querySelectorAll(".add-atk").forEach(btn => {
    btn.onclick = () => {
      const parentRow = btn.closest(".attack");
      const newRow = createAttackRow(attackIndex++);
      atkList.insertBefore(newRow, parentRow.nextSibling);
      reindexAttackRows();
      attachAttackEventListeners();
      saveAttacksToStorage();
    };
  });

  atkList.querySelectorAll(".remove-atk").forEach(btn => {
    btn.onclick = () => {
      btn.closest(".attack").remove();
      reindexAttackRows();
      attachAttackEventListeners();
      saveAttacksToStorage();
    };
  });

  atkList.querySelectorAll("input").forEach(input => {
    input.onchange = () => saveAttacksToStorage(); 
  });
}
function attachSpellEventListeners() {
  const spellList = document.getElementById("spell-list");

  spellList.querySelectorAll(".add-spell").forEach(btn => {
    btn.onclick = () => {
      const parentRow = btn.closest(".spell");
      const newRow = createSpellRow(spellIndex++);
      spellList.insertBefore(newRow, parentRow.nextSibling);
      reindexSpellRows();
      attachSpellEventListeners();
      saveSpellsToStorage();
    };
  });

  spellList.querySelectorAll(".remove-spell").forEach(btn => {
    btn.onclick = () => {
      btn.closest(".spell").remove();
      reindexSpellRows();
      attachSpellEventListeners();
      saveSpellsToStorage();
    };
  });

  spellList.querySelectorAll("input").forEach(input => {
    input.onchange = () => saveSpellsToStorage(); 
  });
}

/* handy functions  ********************************************************************************/

function spellInfo(element) {
  let spellName = element.parentElement.querySelector('.name').value;
  const search = "spell:" + spellName.replace("'", "").replace(" ","-").toLowerCase();
  wikidot(search);
}

function wikidot(param) {
  window.open(
    "https://dnd5e.wikidot.com/" + param,
    "wikidotPopup",
    "width=800,height=600,scrollbars=yes,resizable=yes"
  );
}

window.onload = function() {
  main();
  loadAttacksFromStorage();
  loadSpellsFromStorage();
};

// export
function exportCharacter() {
  main();
  let name = characterData.charName;
  if (name.length < 1) {
    name="character";
  }
    downloadJSON(characterData, name.toLowerCase().replace(" ", "_").replace("\n","-") + ".json");
}

function downloadJSON(data=characterData, filename="character") {
  const jsonStr = JSON.stringify(data, null, 2); // pretty print
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

// import
document.getElementById('importButton').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      characterData = JSON.parse(e.target.result);
      console.log("Imported:", characterData);
      write(); // Call your UI or data update function
      saveAttacksToStorage();
      saveSpellsToStorage();
    } catch (err) {
      alert("Invalid JSON file."+ err);
      console.error("Error importing character data:", err);
    }
  };
  reader.readAsText(file);
});

/* autofit text  ********************************************************************************/

function autoFitFontSingleLine(input, minSize = 8, maxSize = 14) {
  const style = window.getComputedStyle(input);
  const testSpan = document.createElement('span');

  // Style the test span to match input
  testSpan.style.position = 'absolute';
  testSpan.style.visibility = 'hidden';
  testSpan.style.whiteSpace = 'nowrap';
  testSpan.style.fontFamily = style.fontFamily;
  testSpan.style.fontWeight = style.fontWeight;
  testSpan.style.fontStyle = style.fontStyle;
  testSpan.style.letterSpacing = style.letterSpacing;
  testSpan.style.padding = style.padding;
  testSpan.style.border = style.border;
  testSpan.style.boxSizing = 'border-box';
  document.body.appendChild(testSpan);

  let fontSize = maxSize;

  // Try shrinking font until it fits horizontally
  while (fontSize >= minSize) {
    testSpan.style.fontSize = fontSize + 'px';
    testSpan.textContent = input.value || input.placeholder || '';

    if (testSpan.offsetWidth <= input.clientWidth) break;
    fontSize--;
  }

  input.style.fontSize = fontSize + 'px';
  document.body.removeChild(testSpan);
}

document.querySelectorAll('input[type="text"]').forEach(input => {
  if (!input.classList.contains("fixfont")) {
    const fit = () => autoFitFontSingleLine(input);
    fit();
    input.addEventListener('input', fit);
    window.addEventListener('resize', fit);
  }
});
