export function makeID ( ) {
    let rand = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 9; i++)
      rand+= possible.charAt(Math.floor(Math.random() * possible.length));
  
    return rand;
}