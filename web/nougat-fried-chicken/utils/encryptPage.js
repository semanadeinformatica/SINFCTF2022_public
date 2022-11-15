// My Version of hp_d01
let confused = true
const annoyStudent = string => {
    if (!confused) return;

    const htmlArray = [];
    let html = "", chars = "", idx = 0;
    for (let i = 0; i < string.length; i++) {
        c = string.charCodeAt(i)
        if (c < 128) c = c ^ 2;
        chars += String.fromCharCode(c);
        if (chars.length > 80) {
            htmlArray[idx++] = chars;
            chars = "";
        }
    }

    html = htmlArray.join("") + chars;
    //document.write(html)
    return html;
}

// Minimal version -> USE THIS
// let confused=!0;const annoyStudent=t=>{if(!confused)return;const e=[];let n="",o="",r=0;for(let n=0;n<t.length;n++)c=t.charCodeAt(n),c<128&&(c^=2),o+=String.fromCharCode(c),o.length>80&&(e[r++]=o,o="");n=e.join("")+o,document.write(n)};

console.log(escape(annoyStudent(`<script>
// Who wrote this code!? What the hell is wrong with people???
const elliotCipher = (secret, pwd) => {
    let i = 0;
    let almostThere = ""; // you wish lol
    for (let j = 0; j < secret.length; j++) {
        almostThere += String.fromCharCode((pwd.charCodeAt(i++)) ^ (secret.charCodeAt(j)));
        if (i >= pwd.length) i = 0;
    }
    return almostThere;
}

const evilForm = (form) => {
    const pwd = form.code.value;
    let hash = 0;
    for (j = 0; j < pwd.length; j++) {
        const n = pwd.charCodeAt(j);
        hash += ((n - j + 33) ^ 31025);
    }

    if (hash == 155387) {
        const secret = "" + "\\x6D\\x5C\\x50\\x16\\x43\\x58\\x47\\x46\\x16\\x58\\x5C\\x4D\\x15\\x5F\\x40\\x19\\x5A\\x5A\\x42\\x13\\x4D\\x5C\\x50\\x16\\x55\\x55\\x55\\x52\\x16\\x5C\\x5F\\x14\\x41\\x5E\\x56\\x19\\x67\\x7C\\x78\\x75\\x19\\x77\\x61\\x70\\x13\\x5A\\x5C\\x54\\x5A\\x5F\\x5C\\x5A\\x52\\x53\\x1D\\x19\\x76\\x40\\x42\\x13\\x40\\x5B\\x40\\x11\\x41\\x5C\\x14\\x5C\\x58\\x13\\x4D\\x5C\\x50\\x16\\x41\\x50\\x53\\x5D\\x42\\x13\\x5D\\x5D\\x47\\x53\\x50\\x4D\\x5D\\x5A\\x58\\x1F\\x19\\x5F\\x50\\x53\\x43\\x19\\x53\\x5A\\x5F\\x5D\\x5E\\x14\\x54\\x58\\x57\\x19\\x4D\\x5A\\x43\\x14\\x55\\x58\\x15\\x53\\x45\\x5C\\x5A\\x41\\x43\\x52\\x55\\x58\\x4C\\x16\\x54\\x5C\\x40\\x15\\x42\\x5B\\x5C\\x46\\x50\\x18\\x13\\x7E\\x5B\\x5A\\x52\\x13\\x55\\x41\\x56\\x5D\\x12" + "";
        const passkey = elliotCipher(secret, pwd);

        fetch("./flag.txt")
            .then(res => res.text())
            .then(text => {
                const order = elliotCipher(text, passkey)

                document.write('<link rel="stylesheet" href="styles.css">');
                document.write(\`<div class="order"><h2>Welcome back, Mr. Nougat! Here's your order:</h2><p> \${order}</p></div>\`);
                if (order.includes("SINFCTF2022")) {
                    document.write('<img src="chicken.jpg"/>');
                    document.write("<p>Bon Appetit!</p>");
                } else {
                    document.write('<img src="wrong.jpg"/>');
                    document.write("<p>Is this not what you asked for? You migth need to recheck the code you provided!</p>");
                }
            })
    } else {
        alert('The code is invalid! Did you forget our special rule?');
    }
}

</script>

<h1>
Welcome to Mr. Nougat's Fried Chicken. Please insert the special code for your order
</h1>

<div>
<form name="form" method="post" action="">
<b>Order Code:</b>
<input type="text" name="code" size="25" maxlength="25">
<input type="button" value="Confirm" onClick="evilForm(this.form)">
</form>
</div>

<div>
Maybe the flag is a cupon for free nuggets :3
</div>`)))
