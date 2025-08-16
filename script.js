// Entrada for 0, 0 = 0
// Entrada for 1, 1 = 1

let c = 1; // c = constante de aprendizado

let pesos = [-1, -1];

let ajustes = 0, repeticoes = 0, quantidadeAjustesNecessarios = 0;

// Definição dos casos de treino
const casos = [
    {entradas: [0, 0], resultadoEsperado: 0}, // Caso 1 
    {entradas: [1, 1], resultadoEsperado: 1} // Caso 2
]

function transferencia(soma) {
    if (soma <= 0) {
        return 0;
    }
    return 1;
}

function soma (valores) {
    resultado = 0;

    valores.forEach(valor => {
        resultado += valor.entrada * valor.peso;
    });

    return resultado;
}

function ajuste(valores){
    i = 0;
    valores.forEach(valor => {
        valores[i].peso = valor.peso + c * (valor.resultadoDesejado - valor.resultadoObtido) * valor.entrada;
        i++;
    });
    return valores;
}

function treinarCaso(entradas, pesos, resultadoEsperado) {
    // Monta array de objetos {entrada, peso}
    const valores = entradas.map((entrada, i) => ({ entrada, peso: pesos[i] }));

    const resultadoSoma = soma(valores);
    const resultadoObtido = transferencia(resultadoSoma);

    if (resultadoObtido !== resultadoEsperado) {
        // Prepara valores para ajuste
        const valoresAjuste = entradas.map((entrada, i) => ({
            entrada,
            peso: pesos[i],
            resultadoDesejado: resultadoEsperado,
            resultadoObtido
        }));

        const novosValores = ajuste(valoresAjuste);

        // Atualiza pesos
        const novosPesos = novosValores.map(v => v.peso);

        return {
            pesos: novosPesos,
            houveAjuste: true
        };
    }

    return {
        pesos,
        houveAjuste: false
    };
}

do {
    ajustes = 0;

    casos.forEach(({entradas, resultadoEsperado}) => {
        resultado = treinarCaso(entradas, pesos, resultadoEsperado);
        pesos = resultado.pesos;
        if (resultado.houveAjuste){
            ajustes++;
            quantidadeAjustesNecessarios++;
        }
    })

    repeticoes++;
} while (ajustes != 0);


// Exibe o resultado final do treinamento
console.log("\n=== RESULTADO FINAL DO TREINAMENTO ===");
console.log(`Pesos finais: [${pesos[0]}, ${pesos[1]}]`);
console.log(`Quantidade de ajustes necessários: ${quantidadeAjustesNecessarios}`);
console.log(`Repetições: ${repeticoes}`);