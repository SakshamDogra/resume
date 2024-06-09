gsap.from('#title', {
    duration:2.5,
    ease: "power3.out",
    y: -500
    });
gsap.from(".line", {
        duration:2.5,
        ease: "expo.out",
        x: -1000,
        repeat: -1,
        delay: 0.3
        });
gsap.from("#arrows", {
            duration:2.5,
            ease: "expo.out",
            x: -1000,
            repeat: -1
            });
  gsap.to(".workout2", { opacity: 1, duration: 1});