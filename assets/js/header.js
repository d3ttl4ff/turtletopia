        // JavaScript to handle scrolling effect
        const header = document.getElementById("header");

        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });