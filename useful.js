function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function rankings(array) {
    return array
      .map((v, i) => [v, i])
      .sort((a, b) => b[0] - a[0])
      .map((a, i) => [...a, i + 1])
      .sort((a, b) => a[1] - b[1])
      .map(a => a[2]);
}

function flipInt(n){
    var digit, result = 0

    while( n ){
        digit = n % 10  //  Get right-most digit. Ex. 123/10 → 12.3 → 3
        result = (result * 10) + digit  //  Ex. 123 → 1230 + 4 → 1234
        n = n/10|0  //  Remove right-most digit. Ex. 123 → 12.3 → 12
    }  
  
    return result
}