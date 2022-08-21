//Adivinar un número del 1 al 30 en 3 intentos.

let numero = 28

for (let i=1; i<=3; i++){
    let respuesta = parseInt(prompt('Adivine un número del 1 al 30. Tiene 3 intentos. Pista: es par'));
    if (numero === respuesta){
        alert('Adivinaste!');
        break;
    } else{
        alert('Te quedan '+ (3-i)+ ' intentos');
    } if (i===3){
        alert('No tienes más intentos. El correcto era el 28.')
    }
}
