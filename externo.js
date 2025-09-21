var player = "xzao";
var numjog = 0;
var jogando = true;

function verificasrc(id) {
    var src = document.getElementById(id).src;
    return src.substring(src.lastIndexOf('/') + 1);
}

function checkjogo(id) {
    if (!jogando) return;

    var opt = verificasrc(id);
    var pc = document.getElementById('cpu_sim').checked;

    if (opt === "transp.png") {
        document.getElementById(id).src = "image/" + player + ".png";
        numjog++;

        if (wincheck()) {
            alert("Fim de jogo! O " + (player === "xzao" ? "X" : "O") + " venceu!");
            jogando = false;
        } else if (numjog >= 9) {
            alert("Fim de jogo! Deu velha!");
            jogando = false;
        }

        if (jogando) {
            if (player === "xzao") {
                player = "joinha";
            } else {
                player = "xzao";
            }

            if (pc && player === "joinha") {
                setTimeout(function() {
                    checkjogo(jogoDopc());
                }, 500);
            }
        }
    }
}

function wincheck() {
    var c1 = verificasrc('c1');
    var c2 = verificasrc('c2');
    var c3 = verificasrc('c3');
    var c4 = verificasrc('c4');
    var c5 = verificasrc('c5');
    var c6 = verificasrc('c6');
    var c7 = verificasrc('c7');
    var c8 = verificasrc('c8');
    var c9 = verificasrc('c9');

    if (((c1 != "transp.png") && (c1 == c2) && (c1 == c3)) ||
        ((c4 != "transp.png") && (c4 == c5) && (c4 == c6)) ||
        ((c7 != "transp.png") && (c7 == c8) && (c7 == c9)) ||
        ((c1 != "transp.png") && (c1 == c4) && (c1 == c7)) ||
        ((c2 != "transp.png") && (c2 == c5) && (c2 == c8)) ||
        ((c3 != "transp.png") && (c3 == c6) && (c3 == c9)) ||
        ((c1 != "transp.png") && (c1 == c5) && (c1 == c9)) ||
        ((c3 != "transp.png") && (c3 == c5) && (c3 == c7))) {
        return true;
    }
    return false;
}

function jogoDopc() {
    var emptyCells = [];
    for (let i = 1; i <= 9; i++) {
        var cellId = 'c' + i;
        if (verificasrc(cellId) === "transp.png") {
            emptyCells.push(cellId);
        }
    }
    
    if (verificasrc('c5') === "transp.png") {
        return 'c5';
    } else if (emptyCells.length > 0) {
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    return null;
}

function reiniciarJogo() {
    // Reseta as variáveis do jogo
    player = "xzao";
    numjog = 0;
    jogando = true;

    // Reseta todas as imagens para 'transp.png'
    for (let i = 1; i <= 9; i++) {
        document.getElementById('c' + i).src = "image/transp.png";
    }
}