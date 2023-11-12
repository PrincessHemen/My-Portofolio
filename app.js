const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const images = document.querySelectorAll(".images .img");


const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    activeLink();
    skillsCounter ();
    mlCounter();
});

function updateCount(num, maxNum) {
    let currentNum = +num.innerHTML;
    
    if(currentNum < maxNum) {
        num.innerHTML = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

/*--------------Sticky NavBar---------------*/

function stickyNavBar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);

}

stickyNavBar();

window.addEventListener("scroll", stickyNavBar);

/*--------------Reveal Animation---------------*/

const sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600});
sr.reveal(".showcase-image", { origin: "top", delay: 700});

/*--------------Skills Progress Bar Animation---------------*/

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;

    if(window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function skillsCounter() {
    if(!hasReached(first_skill)) return;


    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 429-427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);
        
        setTimeout(() => {
            updateCount(counter, target);
        }, 200);
    })
    
    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
    );
}

/*--------------Services Counter Animation---------------*/

function mlCounter() {
    if (!hasReached(ml_section)) return;

    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;

        setTimeout(() => {
            updateCount(ctr, target);
        }, 400);
    });
}

/*--------------Change Active Link on Scroll---------------*/

function activeLink () {
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections)
        .map((sct, i) => {
            return {
                y: sct.getBoundingClientRect().top - header.offsetHeight,
                id: i
            };
        })
        .filter((sct) => sct.y <= 0);

    let currSectionID = passedSections[passedSections.length - 1];

    links.forEach(l => l.classList.remove("active"));
    if (currSectionID) {
        links[currSectionID.id].classList.add("active");
    }
}



