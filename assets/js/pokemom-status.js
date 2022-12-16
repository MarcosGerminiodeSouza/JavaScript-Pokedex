function openPokemon(evt, elementId) {
    var i, x, tablinks;
    x = document.getElementsByClassName("pokemon-detail");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].classList.remove("button-decoration");
    }
    tab_button = document.getElementById(elementId +'_button');
  
    document.getElementById(elementId).style.display = "block";
    tab_button.classList.add("button-decoration");
  }