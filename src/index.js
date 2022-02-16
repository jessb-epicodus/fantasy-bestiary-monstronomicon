import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import MonsterService from './monster.js';
import MonsterList from "./monster-list.js";
import Images from "./image.js";

function displayAThruZ(arr) {
  for (let i = 0; i <= 99; i++) {
    $("#aThruE").append(`<p class="beastName" id="${arr.results[i].index}">${arr.results[i].name}</p>`);
  }
  for (let i = 100; i <= 175; i++) {
    $("#fThruI").append(`<p class="beastName" id="${arr.results[i].index}">${arr.results[i].name}</p>`);
  }
  for (let i = 176; i <= 202; i++) {
    $("#jThruM").append(`<p class="beastName" id="${arr.results[i].index}">${arr.results[i].name}</p>`);
  }
  for (let i = 203; i <= 286; i++) {
    $("#nThruU").append(`<p class="beastName" id="${arr.results[i].index}">${arr.results[i].name}</p>`);
  }
  for (let i = 287; i <= 331; i++) {
    $("#vThruZ").append(`<p class="beastName" id="${arr.results[i].index}">${arr.results[i].name}</p>`);
  }
}

function displayMonsterInfo(index, title, size, type, alignment, xp, languages, strength, dexterity, constitution, intelligence, wisdom, charisma) {
  $('#monsterOutput').show();
  $("#book").hide();
  let monsterImage = new Images(index);
  $("#monsterOutput").html(`<div class="row"><div class="col-md"><h4>Name: ${title}</h4> <p>Size: ${size}</p> <p>Type: ${type}</p> <p>Alignment: ${alignment}</p> <p>XP: ${xp}</p> <p>Languages: ${languages}</p> <p>Strength: ${strength}</p> <p>Dexterity: ${dexterity}</p> <p>Constitution: ${constitution}</p> <p>Intelligence: ${intelligence}</p> <p>Wisdom: ${wisdom}</p> <p>Charisma: ${charisma}</p>
  <button type="button" id="back">Back</button></div> <div class="col-md"><img src="${monsterImage.imagePath}"></div></div>
  `);
  $("#back").on('click', function(){
    $("#book").show();
    $("#monsterOutput").hide();
    $("#fThruI, #jThruM, #nThruU, #aThruE, #vThruZ").hide();
  });
}

function attachListeners() {
  $('h2.aThruE').on('click', function () {
    $("#aThruE").toggle();
    $("#fThruI, #jThruM, #nThruU, #vThruZ").hide();
  });
  $('h2.fThruI').on('click', function () {
    $("#fThruI").toggle();
    $("#aThruE, #jThruM, #nThruU, #vThruZ").hide();
  });
  $('h2.jThruM').on('click', function () {
    $('#jThruM').toggle();
    $("#fThruI, #aThruE, #nThruU, #vThruZ").hide();
  });
  $('h2.nThruU').on('click', function () {
    $('#nThruU').toggle();
    $("#fThruI, #jThruM, #aThruE, #vThruZ").hide();
  });
  $('h2.vThruZ').on('click', function () {
    $('#vThruZ').toggle();
    $("#fThruI, #jThruM, #nThruU, #aThruE").hide();
  });
  $(".cover").on('click', function(){
    $(".cover").hide();
    $(".pageContainer,.tableOfContents,.fThruI, .jThruM, .nThruU, .aThruE, .vThruZ").show();
  });
  $("#closeBook").on('click',function(){
    console.log('Click');
    $(".cover").show();
    $(".pageContainer,.tableOfContents,.fThruI, .jThruM, .nThruU, .aThruE, .vThruZ").hide();
  });
}

$(document).ready(function () {
  $("#page,#fThruI, #jThruM, #nThruU, #aThruE, #vThruZ").hide();
  MonsterList.getMonsterList().then(function (monsterListResponse) {
    if (monsterListResponse instanceof Error) {
      throw Error("Sorry there was an error");
    }
    const monsterList = monsterListResponse;
    displayAThruZ(monsterList);
  });
  attachListeners();
  $('.aThruE, .fThruI, .jThruM, .nThruU, .vThruZ').on('click', 'p.beastName', function () {
    let monsterName = $(this).attr('id');
    MonsterService.getMonster(monsterName)
      .then(function (monsterResponse) {
        if (monsterResponse instanceof Error) {
          throw Error("Sorry there was an error");
        }
        let monsterIndex = monsterResponse.index;
        let monsterTitle = monsterResponse.name;
        let monsterSize = monsterResponse.size;
        let monsterType = monsterResponse.type;
        let monsterAlignment = monsterResponse.alignment;
        let monsterXP = monsterResponse.xp;
        let monsterLanguages = monsterResponse.languages;
        let monsterStrength = monsterResponse.strength;
        let monsterDexterity = monsterResponse.dexterity;
        let monsterConstitution = monsterResponse.constitution;
        let monsterIntelligence = monsterResponse.intelligence;
        let monsterWisdom = monsterResponse.wisdom;
        let monsterCharisma = monsterResponse.charisma;
        displayMonsterInfo(monsterIndex,monsterTitle, monsterSize, monsterType, monsterAlignment, monsterXP, monsterLanguages, monsterStrength, monsterDexterity, monsterConstitution, monsterIntelligence, monsterWisdom, monsterCharisma);
      });
  });
});