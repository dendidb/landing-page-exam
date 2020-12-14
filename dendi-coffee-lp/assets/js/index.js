const headerArea = document.querySelector('.header-area');

window.addEventListener('scroll', function(){
 	if(this.scrollY > 0){
 		headerArea.classList.add('active')
 	}else{
 		headerArea.classList.remove('active')
 	}
})

