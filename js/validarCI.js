$(document).on('pageinit',function( event ){
	$.validator.addMethod('validaCI', function(val){
		var digitoRegion = val.substring(0,2);
		var tercerDigito = val.substring(2,3);
		var coeficientes = [2,1,2,1,2,1,2,1,2];
		var total = 0;
		var ultimoDigito = val.charAt(9);
		if(val.length == 10){
			if( (digitoRegion >= 1 && digitoRegion <= 24) && tercerDigito <= 6){
				for( i=0; i<coeficientes.length; i++ ){
					var valor = coeficientes[i]*parseInt(val.charAt(i));
					if(valor >= 10){
						valor = valor-9;
					}
					total = total + valor;
				}
				var primerDigito = String(total).charAt(0);
				var decena = (parseInt(primerDigito) + 1) *10;
				var digitoValidador = decena - total;
				if( digitoValidador == 10){ digitoValidador = 0;}
				if(digitoValidador == ultimoDigito){
					return true;
				}else return false;
			}else return false;
		}else return false;
	});
	$('#formCI').validate({
		rules: {
			ci: {
				required: true,
				validaCI: true
			}				
		},
		messages: {
			ci: {
				required: 'Campo requerido',
				validaCI: 'Cédula incorrecta'
			}			
		}
	});
});