/* script.js 
 *  Javascript code
 */
 
$(document).ready(function($) {


/*** Navigation scroll ***/
$('.nav').click(function() {
	var gotoSlide = $('#slide-' + $(this).attr('slide')).offset().top;
	$('html,body').animate({scrollTop: gotoSlide}, 1000);
});


/*** Source code ***/
source = "<pre>"+("<html>" + document.getElementsByTagName('html')[0].innerHTML + "</html>").replace(/</g, "&lt;").replace(/>/g, "&gt;")+"</pre>";
document.getElementById('source').contentWindow.document.body.innerHTML = source;


/*** Calculator ***/
var keys = document.querySelectorAll('#frogulator span');
var num1, num2, op, first = true, add = true, old = false, dec = false, m = 0;
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function() {
		var screen = document.querySelector('.screen');
		var value = screen.innerHTML;
		var btn = this.innerHTML;
		if(btn == 'C') {
			screen.innerHTML = '';
            first = true;
            old = false;
			dec = false;
		} else if(['+','-','×','÷','=','M+','M-','MR'].indexOf(btn) > -1) {
            if(!old && value) {
                if(first){
                    num2 = value;
                 } else {
                     num1 = value;
                     num2 = Math.round( eval(num2 + op + num1) *1000)/1000;
                     screen.innerHTML = num2;
					 if (num2 == 42) { document.getElementById("O").style=""; }
                }
            }
            if((!value || value == '-') && btn == '-'){
                screen.innerHTML = '-';
            } else {
            add = false;
			dec = false;
            first = true;
            }
            if(btn == 'M+'){
                m += num2;
            } else if(btn == 'M-'){
                m -= num2;
            } else if(btn == 'MR'){
                screen.innerHTML = Math.round( m *1000)/1000;
            } else {
                op = btn.replace(/×/g, '*').replace(/÷/g, '/');
                old = true;
                first = false;
            }
        } else {
            if(add){
                if(value.length < 15){
                    if(!(btn == '.' && dec)){
                        screen.innerHTML += btn;
                        if(btn == '.')
                            dec = true;
                    }
                }
            } else {
                screen.innerHTML = btn;
                add = true;
                if(op == '=')
                    first = true;
                if(btn == '.')
                    dec = true;
            }
            old = false;
		}
	};
}

});