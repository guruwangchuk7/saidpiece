import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".head" ,{

    x:700,
    duration:4,
    scrollTrigger:{
        trigger:".head",
        start:"top 70%",
        end:"top 30%",
        scrub:2,
        markers:true
    }

})