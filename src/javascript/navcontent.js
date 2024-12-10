export const navcontent = () => {



  document.addEventListener('click', function (event) {

    
    const nav = document.querySelector('#nav');
    if(nav && nav.contains){

    const button = document.getElementById('button');

     // Check if the clicked area is outside the nav and button
     if (!nav.contains(event.target) && (nav.style.display === 'block' && !(event.target == button))) {
        nav.classList.add('active');
    
        setTimeout(()=>{
          nav.style.display = 'none';
          nav.classList.remove('active')
        },500)
        
    }
    
    if(event.target == button){
    nav.style.display = 'block';
    }

    window.addEventListener('resize',()=>{
      const nav = document.getElementById('nav');

      if (window.innerWidth > 800) {
          nav.style.display = 'block';
      } 
      else {
          nav.style.display = 'none';
      }
    })
  }
});
 
}


