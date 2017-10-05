$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    // Here you have to add your code for building a random battleground.

    // Tip: The next line of code demonstrates how you can select a table cell
    // using coordinates, remove CSS classes and add CSS classes. 

    clear();

    var ships = [ // Actually don't need both x1 and y1, but for logical reasons I'm going to leave them in
                {length : 5, x1 : 0, x2 : 0, y1 : 0, y2 : 0}      // carrier
              , {length : 4, x1 : 0, x2 : 0, y1 : 0, y2 : 0}      // battleship
              , {length : 4, x1 : 0, x2 : 0, y1 : 0, y2 : 0}      // cruiser
              , {length : 3, x1 : 0, x2 : 0, y1 : 0, y2 : 0}      // submarine
              , {length : 2, x1 : 0, x2 : 0, y1 : 0, y2 : 0}      // destroyer              
              ];

    for(let i in ships) {
      placeShip(ships[i]);
    }

    function placeShip(ship) {
      var    dir = Math.round(Math.random())
        , place = Math.floor(Math.random() * (10 - ship.length));    
      
      ship.x1 = place;
      ship.y1 = place;

      // horizontal
      if(dir == 1) {
        ship.x2 = ship.x1 + ship.length;
        ship.y2 = ship.y1;
      }
      // vertical
      else {
        ship.x2 = ship.x1;
        ship.y2 = ship.y1 + ship.length;
      }

      while(!validPlace(ship, dir)) {
        placeShip(ship);
      }
    }

    function validPlace(ship, dir) {
      // Collision is somehow not working and I'm frustrated
      if(dir == 1) { 
        if(0 < ship.x1 && $('td[data-r="' + (ship.x1 - 1) + '"][data-c="' + ship.y1 + '"]').hasClass('ship')) {
          return false;
        }
        for(let i = ship.x1; i < ship.x2; i++) {
          if($('td[data-r="' + i + '"][data-c="' + ship.y1 + '"]').hasClass('ship')) {
            return false;
          }
          if(ship.x1 < i) {
            if($('td[data-r="' + i + '"][data-c="' + (ship.y1 + 1) + '"]').hasClass('ship')) {
              return false;     
            }
          }
          if(i < ship.x2) {
            if($('td[data-r="' + i + '"][data-c="' + (ship.y1 - 1) + '"]').hasClass('ship')) {
              return false;
            }
          }
        }
        for(let i = ship.x1; i < ship.x2; i++) {
          $('td[data-r="' + i + '"][data-c="' + ship.y1 + '"]').removeClass('water').addClass('ship');
        }
      } else {
        if(0 < ship.y1 && $('td[data-r="' + ship.x1 + '"][data-c="' + (ship.y1 - 1) + '"]').hasClass('ship')) {
          return false;
        }
        for(let i = ship.y1; i < ship.y2; i++) {
          if($('td[data-r="' + ship.x1 + '"][data-c="' + i + '"]').hasClass('ship')) {
            return false;
          }
          if(ship.y1 < i) {
            if($('td[data-r="' + (ship.x1 + 1) + '"][data-c="' + i + '"]').hasClass('ship')) {
              return false;     
            }
          }
          if(i < ship.y2) {
            if($('td[data-r="' + (ship.x1 - 1) + '"][data-c="' + i + '"]').hasClass('ship')) {
              return false;
            }
          }
        }
        for(let i = ship.y1; i < ship.y2; i++) {
          $('td[data-r="' + ship.x1 + '"][data-c="' + i + '"]').removeClass('water').addClass('ship');
        }
      }
      return true;
  }

    function clear() {
      for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
          $('td[data-r="' + i + '"][data-c="' + j + '"]').removeClass('ship').addClass('water');
        }
      }
    }
  });
});