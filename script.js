// =============================== 
// 1. DICIONÁRIO DE PALAVRAS 
// =============================== 
 
const palavras = { 
 
    "eu": { 
        umbundu: "ami", 
        kimbundu: "mono", 
        kikongo: "mono", 
        kwanyama: "aame" 
    }, 
 
    "você": { 
        umbundu: "ove", 
        kimbundu: "ngeye", 
        kikongo: "ngeye", 
        kwanyama: "ove" 
    }, 
 
    "quero": { 
        umbundu: "nda tala", 
        kimbundu: "ngina luzolo", 
        kikongo: "nazali na posa", 
        kwanyama: "onda hala" 
    }, 
 
    "água": { 
        umbundu: "oci", 
        kimbundu: "maza", 
        kikongo: "maza", 
        kwanyama: "omeva" 
    }, 
 
    "casa": { 
        umbundu: "ondjo", 
        kimbundu: "nzo", 
        kikongo: "nzo", 
        kwanyama: "ongulu" 
    }, 
 
    "escola": { 
        umbundu: "escola", 
        kimbundu: "escola", 
        kikongo: "escola", 
        kwanyama: "sikola" 
    }, 
 
    "angola": { 
        umbundu: "Angola", 
        kimbundu: "Angola", 
        kikongo: "Angola", 
        kwanyama: "Angola" 
    } 
}; 
 
 
// =============================== 
// 2. FRASES COMPLETAS 
// =============================== 
 
const frases = { 
 
    "bom dia": { 
        umbundu: "wakolapo", 
        kimbundu: "kiambote", 
        kikongo: "mbote", 
        kwanyama: "mwa lala po" 
    }, 
 
    "como está": { 
        umbundu: "owa cilipi", 
        kimbundu: "udi ndenge kayi", 
        kikongo: "ngeye kele mbote", 
        kwanyama: "oli ngiipi" 
    }, 
 
    "estou bem": { 
        umbundu: "ndi bwino", 
        kimbundu: "mono ngidi bwino", 
        kikongo: "mono kele mbote", 
        kwanyama: "ondi nawa" 
    }, 
 
    "qual é o seu nome": { 
        umbundu: "eciño liove lyeni", 
        kimbundu: "dina die ndenge kayi", 
        kikongo: "nkumbu na nge nani", 
        kwanyama: "edina loye olye lyi" 
    }, 
 
    "eu sou de angola": { 
        umbundu: "ami ndi wa angola", 
        kimbundu: "mono ngidi wa angola", 
        kikongo: "mono kele wa angola", 
        kwanyama: "aame omu angola" 
    }, 
 
    "obrigado pela ajuda": { 
        umbundu: "ndapandula ocimano", 
        kimbundu: "matondo mu kusadisa", 
        kikongo: "matondo mingi", 
        kwanyama: "tangi unene" 
    } 
}; 
 
 
// =============================== 
// 3. PADRÕES INTELIGENTES 
// =============================== 
 
const padroes = [ 
 
    { 
        pattern: "eu quero", 
        type: "prefix", 
        translations: { 
            umbundu: "ami nda tala", 
            kimbundu: "mono ngina luzolo", 
            kikongo: "mono nazali na posa", 
            kwanyama: "aame onda hala" 
        } 
    } 
 
]; 


// =============================== 
// NORMALIZAÇÃO 
// =============================== 
 
function normalizar(t){ 
    return t.toLowerCase().trim().replace(/[?.,!]/g,""); 
} 
 
 
// =============================== 
// TRADUÇÃO 
// =============================== 
 
function traduzir(){ 
 
    let texto = normalizar(document.getElementById("texto").value); 
    let idioma = document.getElementById("idioma").value; 
 
    let resultado = ""; 
 
    // 1 frase 
    if(frases[texto]){ 
        resultado = frases[texto][idioma]; 
    } 
 
    // 2 padrão 
    else { 
        for(let p of padroes){ 
            if(texto.startsWith(p.pattern)){ 
                let resto = texto.replace(p.pattern,"").trim(); 
                resultado = p.translations[idioma] + " " + traduzirPalavras(resto,idioma); 
                break; 
            } 
        } 
    } 
 
    // 3 palavras 
    if(!resultado){ 
        resultado = traduzirPalavras(texto,idioma); 
    } 
 
    document.getElementById("resultado").innerText = resultado; 
 
    adicionarHistorico(texto, resultado); 
} 
 
 
// =============================== 
// PALAVRAS 
// =============================== 
 
function traduzirPalavras(texto, idioma){ 
 
    let partes = texto.split(" "); 
    let saida = []; 
 
    for(let p of partes){ 
 
        if(palavras[p]){ 
            saida.push(palavras[p][idioma]); 
        } else { 
            saida.push("[" + p + "]"); 
        } 
    } 
 
    return saida.join(" "); 
} 
 
 
// =============================== 
// HISTÓRICO 
// =============================== 
 
function adicionarHistorico(original, traducao){ 
 
    historico.unshift(original + " → " + traducao); 
 
    if(historico.length > 5){ 
        historico.pop(); 
    } 
 
    renderHistorico(); 
} 
 
function renderHistorico(){ 
 
    let ul = document.getElementById("historico"); 
    ul.innerHTML = ""; 
 
    historico.forEach(item=>{ 
        let li = document.createElement("li"); 
        li.innerText = item; 
        ul.appendChild(li); 
    }); 
} 
 
 
// =============================== 
// COPIAR RESULTADO 
// =============================== 
 
function copiar(){ 
 
    let texto = document.getElementById("resultado").innerText; 
 
    navigator.clipboard.writeText(texto); 
 
    alert("Copiado!"); 
} 

if ("serviceWorker" in navigator) { 
    navigator.serviceWorker.register("service-worker.js"); 
}