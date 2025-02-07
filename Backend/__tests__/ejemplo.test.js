import suma from "../src/utils/ejemplo.js";


describe('Probar la Funcion Suma',()=>{
    it('deberia sumar 2 numeros positivos, correctamente',()=>{
        expect(suma(5,2)).toBe(7);
    });

    it('deberia sumar 2 numeros positivos, correctamente',()=>{
        expect(suma(-2,-4)).toBe(-6);
    });
});