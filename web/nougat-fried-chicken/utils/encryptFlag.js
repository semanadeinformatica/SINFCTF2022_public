const fs = require('fs');

const elliotCipher = (secret, pwd) => {
    let i = 0;
    let almostThere = ""; // you wish lol
    for (let j = 0; j < secret.length; j++) {
        almostThere += String.fromCharCode((pwd.charCodeAt(i++)) ^ (secret.charCodeAt(j)));
        if (i >= pwd.length) i = 0;
    }
    return almostThere;
}

const data = elliotCipher("SINFCTF2022{kfc_is_overrated_lets_stop_obesity}", "The pass key is not the flag of the SINF CTF challenge. But you're in the right direction, keep going and you'll eventually get there. Good luck!")
console.log(data)
