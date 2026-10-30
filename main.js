/*scroll animations*/

/* mark JS as available so animation start-states only apply when the script runs */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    /* home intro: split text into letters that animate one at a time */
    document.querySelectorAll("[data-split]").forEach(el => {
        const text = el.textContent.trim();
        const base = parseFloat(el.dataset.base) || 0;
        const step = parseFloat(el.dataset.step) || 0.08;
        let i = 0;

        el.setAttribute("aria-label", text);
        el.textContent = "";

        text.split(" ").forEach((word, w, words) => {
            const wordEl = document.createElement("span");
            wordEl.className = "word";
            wordEl.setAttribute("aria-hidden", "true");
            [...word].forEach(letter => {
                const ch = document.createElement("span");
                ch.className = "ch";
                ch.textContent = letter;
                ch.style.setProperty("--d", (base + i * step).toFixed(2) + "s");
                wordEl.appendChild(ch);
                i++;
            });
            el.appendChild(wordEl);
            if (w < words.length - 1) el.appendChild(document.createTextNode(" "));
        });

        el.classList.add("split");
    });

    /* scroll animations: schedule tiles and videos alternate sides */
    ["#schedule-card-container .card", ".video-container"].forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add("reveal");
            el.dataset.anim = i % 2 === 0 ? "left" : "right";
        });
    });

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

    reveals.forEach(reveal => observer.observe(reveal));
});

/* mobile hamburger menu */

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("nav-toggle");
    if (!navbar || !toggle) return;

    const setOpen = (open) => {
        navbar.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
    };

    toggle.addEventListener("click", () => setOpen(!navbar.classList.contains("open")));
    navbar.querySelectorAll(".nav-link, .nav-logo").forEach(link =>
        link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
});
