
gsap.from('.maincontent',{duration: 1,y: '100%',ease: 'bounce', delay :0.9})

gsap.from('.navbar',{duration: 1, opacity: 0, delay: 2, stagger: .5})
gsap.from('.right',{duration: 1, opacity: 0,ease:'power2.in', delay: 3, stagger: 1.5})

/*
gsap.from('.right',{duration: 2, x: '-100vw', delay: 1, ease: 'power2.in'})
gsap.from('.left',{duration: 1, delay: 1.5, x: '-100%'})
gsap.to('.footer',{duration: 1,y:0, ease: 'elastic',delay: 2.5})
gsap.fromTo('.button',{opacity:0, scale: 0,rotation: 720} , {duration:1,opacity:1,delay:3.5,scale:1,rotation:0})
*/


/*
//use a timeline to group all of the animations

const timeline = gsap.timeline()
timeline
.from('.header',{duration: 1,y: '-100%',ease: 'bounce'})
.from('.links',{duration: 1, opacity: 0, delay: 1, stagger: .5})//to make items fade in an appear one by one
.from('.right',{duration: 2, x: '-100vw', delay: 1, ease: 'power2.in'})
.from('.left',{duration: 1, delay: 1.5, x: '-100%'})
.to('.footer',{duration: 1,y:0, ease: 'elastic',delay: 2.5})
.fromTo('.button',{opacity:0, scale: 0,rotation: 720} , {duration:1,opacity:1,delay:3.5,scale:1,rotation:0})

const button = document.querySelector('.button')

button.addEventListener('click',()=>{
    timeline.timeScale(3)
    timeline.reverse()
})


*/
