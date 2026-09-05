/* =========================================================
   MORyA STORE
   GANPATI MURTI GALLERY
   ========================================================= */


/* =========================================================
   MURTI DATA
   =========================================================

   Only customer-relevant information is stored here:

   id
   Number
   image
   height
   status

   status values:

   available
   reserved
   sold

========================================================= */


let products = [];

async function loadProductsFromFirestore() {
    try {
        const snapshot = await db
            .collection("murtis")
            .orderBy("murtiNumber")
            .get();

        products = snapshot.docs.map(doc => {
            const data = doc.data();

            return {
                id: doc.id,
                Number: data.murtiNumber,
                image: data.imagePath || "",
                height: data.height || "",
                status: data.status || "available"
            };
        });

        console.log("Murtis loaded from Firestore:", products);

        // Start the existing website after Firestore data is loaded
        setupGallery();
        setupWhatsApp();
        checkQRCodeProduct();

    } catch (error) {
        console.error("Error loading Murtis from Firestore:", error);
    }
}



/* =========================================================
   SETTINGS
========================================================= */


/*
    WhatsApp number

    India country code = 91

    Your number:
    8421296129

    Therefore:
    918421296129
*/

const WHATSAPP_NUMBER = "918421296129";



/* =========================================================
   STATE
========================================================= */

let selectedSize = "all";

let selectedAvailability = "all";

/* =========================================================
   DOM ELEMENTS
========================================================= */

const productsGrid =
    document.getElementById("productsGrid");


const resultCount =
    document.getElementById("resultCount");


const heroProductCount =
    document.getElementById("heroProductCount");


const sizeFilter =
    document.getElementById("sizeFilter");


const availabilityFilter =
    document.getElementById("availabilityFilter");


const productModal =
    document.getElementById("productModal");


const modalBody =
    document.getElementById("modalBody");


const modalClose =
    document.getElementById("modalClose");


const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");


const mobileMenu =
    document.getElementById("mobileMenu");


const generalWhatsapp =
    document.getElementById("generalWhatsapp");



/* =========================================================
   INITIAL SETUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    loadProductsFromFirestore();
});


/* =========================================================
   SETUP GALLERY
========================================================= */

function setupGallery() {


    /*
        Total Murti count
    */

    heroProductCount.textContent =
        products.length;


    /*
        Initial render
    */

    renderProducts();
        const filtered = getFilteredProducts();

        resultCount.textContent = filtered.length;

        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="product-card loading-card" style="grid-column: 1 / -1;">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <span class="skeleton-line short"></span>
                        <span class="skeleton-line"></span>
                        <span class="skeleton-line medium"></span>
                    </div>
                </div>
            `;
            return;
        }

        if (filtered.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state show" style="grid-column: 1 / -1;">
                    <div class="empty-icon">🪔</div>
                    <h3>कोणतीही मूर्ती सापडली नाही</h3>
                    <p>फिल्टर बदलून किंवा सर्व मूर्तीचा संग्रह पहा.</p>
                    <button type="button" class="secondary-button" data-reset-filters>सर्व मूर्ती दाखवा</button>
                </div>
            `;

            const resetButton = productsGrid.querySelector("[data-reset-filters]");
            if (resetButton) {
                resetButton.addEventListener("click", () => {
                    sizeFilter.value = "all";
                    availabilityFilter.value = "all";
                    selectedSize = "all";
                    selectedAvailability = "all";
                    renderProducts();
                });
            }
            return;
        }

        productsGrid.innerHTML = filtered.map(createProductCard).join("");

    modalClose.addEventListener(
        "click",
        closeModal
    );



    /*
        Modal backdrop
    */

    productModal
        .querySelector(".modal-backdrop")
        .addEventListener(
            "click",
            closeModal
        );



    /*
        Escape key
    */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }

    );

    window.addEventListener("popstate", () => {
        const productId = new URLSearchParams(window.location.search).get("id");

        if (productId) {
            openProduct(productId, false);
            return;
        }

        productModal.classList.remove("show");
        productModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    });



    /*
        Mobile menu
    */

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle("open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );



    mobileMenu
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove("open");
                        mobileMenuBtn.setAttribute("aria-expanded", "false");

                    }
                );

            }
        );

}



/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

    const filtered =
        products.filter(product => {

            const matchesAvailability =
                selectedAvailability === "all" ||
                product.status === selectedAvailability;

            let matchesSize = true;

            if (selectedSize === "1-2") {
                matchesSize = product.height >= 1 && product.height <= 2;
            }

            if (selectedSize === "2-3") {
                matchesSize = product.height > 2 && product.height <= 3;
            }

            return matchesAvailability && matchesSize;

        });

    if (selectedSize !== "all") {
        filtered.sort((first, second) => first.height - second.height);
    }

    return filtered;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

/* =========================================================
   GENERAL WHATSAPP
========================================================= */

function setupWhatsApp() {
    const message = encodeURIComponent(
        `नमस्कार 🙏

मला तुमच्या गणपती मूर्ती संग्रहाबद्दल अधिक माहिती हवी आहे.

कृपया उपलब्ध मूर्ती आणि त्यांची माहिती कळवा.

धन्यवाद 🙏`
    );

    generalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}



/* =========================================================
   STATUS TEXT
========================================================= */

function getStatusText(status) {
    switch (status) {
        case "available":
            return "उपलब्ध";
        case "reserved":
            return "राखीव";
        case "sold":
            return "विकलेली";
        default:
            return "उपलब्ध";
    }
}



/* =========================================================
   MOTION EFFECTS
========================================================= */

function setupMotionEffects() {
    const revealItems = document.querySelectorAll(
        ".section-heading, .results-bar, .about-content, .contact-box"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.14 }
        );

        revealItems.forEach(item => {
            item.classList.add("reveal-on-scroll");
            revealObserver.observe(item);
        });
    }

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        card.addEventListener("pointermove", event => {
            if (window.matchMedia("(hover: none)").matches) {
                return;
            }

            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;
            const rotateX = (0.5 - y) * 7;
            const rotateY = (x - 0.5) * 7;

            card.style.setProperty("--tilt-x", `${rotateX}deg`);
            card.style.setProperty("--tilt-y", `${rotateY}deg`);
            card.style.setProperty("--shine-x", `${x * 100}%`);
            card.style.setProperty("--shine-y", `${y * 100}%`);
        });

        card.addEventListener("pointerleave", () => {
            card.style.setProperty("--tilt-x", "0deg");
            card.style.setProperty("--tilt-y", "0deg");
        });
    });
}


function renderProducts() {


    const filtered =
        getFilteredProducts();



    /*
        Result count
    */

    resultCount.textContent =
        filtered.length;



    /*
        No results
    */

    /*
        Create cards
    */

    productsGrid.innerHTML =
        filtered
            .map(
                createProductCard
            )
            .join("");

}



/* =========================================================
   CREATE PRODUCT CARD
========================================================= */

function createProductCard(product) {
    const statusText = getStatusText(product.status);
    const statusClass = product.status;
    const imageSrc = product.image ? product.image.trim() : "";
    const fallbackSrc = "images/1.jpeg";

    return `
        <article class="product-card" data-product-id="${product.id}">
            <div
                class="product-image"
                role="button"
                tabindex="0"
                onclick="openProduct('${product.id}')"
                onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProduct('${product.id}'); }"
                aria-label="मूर्ती क्रमांक ${product.Number} ची माहिती पहा"
            >
                <img
                    src="${imageSrc || fallbackSrc}"
                    alt="गणपती मूर्ती क्रमांक ${product.Number}"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='${fallbackSrc}';"
                >
                <span class="stock-badge ${statusClass}">${statusText}</span>
            </div>

            <div class="product-info">
                <h3 class="product-name">मूर्ती क्रमांक ${product.Number}</h3>
                <div class="product-meta">
                    <span>उंची: ${product.height} फूट</span>
                </div>

                <div class="product-footer">
                    <span class="product-availability">${statusText}</span>
                    <button class="view-product" type="button" onclick="openProduct('${product.id}')">
                        माहिती पहा →
                    </button>
                </div>
            </div>
        </article>
    `;
}



/* =========================================================
   OPEN PRODUCT
========================================================= */

function openProduct(id, updateHistory = true) {
    const product = products.find(item => item.id === id);

    if (!product) {
        return;
    }

    const statusText = getStatusText(product.status);
    const statusClass = product.status;
    const fallbackSrc = "images/1.jpeg";
    const imageUrl = product.image ? new URL(product.image, window.location.href).href : fallbackSrc;

    const whatsappMessage = encodeURIComponent(
        `नमस्कार 🙏

मला गणपती मूर्ती क्रमांक ${product.Number} बद्दल माहिती हवी आहे.

मूर्ती क्रमांक: ${product.Number}
उंची: ${product.height} फूट
उपलब्धता: ${statusText}

मूर्तीचा फोटो:
${imageUrl}

कृपया या मूर्तीबद्दल अधिक माहिती कळवा.

धन्यवाद 🙏`
    );

    const actionButton = `
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}" target="_blank" rel="noopener" class="modal-whatsapp">
            💬 या बाप्पाबद्दल चौकशी करा
        </a>
    `;

    modalBody.innerHTML = `
        <div class="modal-gallery">
            <img class="modal-main-image" src="${product.image || fallbackSrc}" alt="गणपती मूर्ती क्रमांक ${product.Number}" onerror="this.onerror=null;this.src='${fallbackSrc}';" />
        </div>

        <div class="modal-info">
            <h2>मूर्ती क्रमांक ${product.Number}</h2>
            <span class="modal-status ${statusClass}">${statusText}</span>

            <div class="modal-details">
                <div class="modal-detail">
                    <span>उंची</span>
                    <strong>${product.height} फूट</strong>
                </div>

                <div class="modal-detail">
                    <span>उपलब्धता</span>
                    <strong>${statusText}</strong>
                </div>

                <div class="modal-detail">
                    <span>मूर्ती क्रमांक</span>
                    <strong>${product.id}</strong>
                </div>
            </div>

            ${actionButton}
        </div>
    `;

    productModal.classList.add("show");
    productModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (updateHistory) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("id", product.id);
        window.history.pushState({}, "", newUrl);
    }

    const card = document.querySelector(`[data-product-id="${product.id}"]`);
    if (card) {
        setTimeout(() => {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 220);
    }

}



/* =========================================================
   CLOSE PRODUCT
========================================================= */

function closeModal() {
    productModal.classList.remove("show");
    productModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("id");
    window.history.pushState({}, "", `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);

}



/* =========================================================
   QR CODE SUPPORT
========================================================= */


/*
    Example QR URL:

    https://sushantcse.github.io/Morya_Store/?id=ganpati-001

    When customer scans the QR code,
    that particular Murti opens automatically.
*/

function checkQRCodeProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        return;
    }

    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    setTimeout(() => {
        openProduct(product.id);
    }, 300);
}