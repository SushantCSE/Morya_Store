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


const products = [

    {
        id: "ganpati-001",
        Number: "1",
        image: "images/1.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-002",
        Number: "2",
        image: "images/2.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-003",
        Number: "3",
        image: "images/3.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-004",
        Number: "4",
        image: "images/4.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-005",
        Number: "5",
        image: "images/5.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-006",
        Number: "6",
        image: "images/6.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-007",
        Number: "7",
        image: "images/7.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-008",
        Number: "8",
        image: "images/8.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-009",
        Number: "9",
        image: "images/9.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-010",
        Number: "10",
        image: "images/10.jpeg",
        height: "1.5-2",
        status: "available"
    },


    {
        id: "ganpati-011",
        Number: "11",
        image: "images/11.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-012",
        Number: "12",
        image: "images/12.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-013",
        Number: "13",
        image: "images/13.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-014",
        Number: "14",
        image: "images/14.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-015",
        Number: "15",
        image: "images/15.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-016",
        Number: "16",
        image: "images/16.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-017",
        Number: "17",
        image: "images/17.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-018",
        Number: "18",
        image: "images/18.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-019",
        Number: "19",
        image: "images/19.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-020",
        Number: "20",
        image: "images/20.jpeg",
        height: "1.5-2",
        status: "available"
    },

    {
        id: "ganpati-021",
        Number: "21",
        image: "images/21.jpeg",
        height: "1.5-2",
        status: "available"
    },

];



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

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupGallery();

        setupWhatsApp();

        checkQRCodeProduct();

    }
);



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

    setupMotionEffects();


    sizeFilter.addEventListener(
        "change",
        () => {

            selectedSize = sizeFilter.value;
            renderProducts();

        }
    );


    availabilityFilter.addEventListener(
        "change",
        () => {

            selectedAvailability = availabilityFilter.value;
            renderProducts();

        }
    );



    /*
        Modal close button
    */

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

function createProductCard(
    product
) {


    const statusText =
        getStatusText(
            product.status
        );


    const statusClass =
        product.status;



    return `

        <article
            class="product-card"
        >


            <!-- IMAGE -->

            <div
                class="product-image"
                role="button"
                tabindex="0"
                onclick="openProduct('${product.id}')"
                onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProduct('${product.id}'); }"
                aria-label="मूर्ती क्रमांक ${product.Number} ची माहिती पहा"
            >

                <img
                    src="${product.image}"
                    alt="गणपती मूर्ती क्रमांक ${product.Number}"
                    loading="lazy"
                >


                <span
                    class="stock-badge ${statusClass}"
                >
                    ${statusText}
                </span>

            </div>



            <!-- INFORMATION -->

            <div class="product-info">


                <h3 class="product-name">
                    मूर्ती क्रमांक ${product.Number}
                </h3>



                <div class="product-meta">


                    <span>
                        उंची: ${product.height} फूट
                    </span>


                </div>



                <div class="product-footer">


                    <span
                        class="product-availability"
                    >
                        ${statusText}
                    </span>



                    <button
                        class="view-product"
                        onclick="openProduct('${product.id}')"
                    >
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

function openProduct(
    id
) {


    /*
        Find selected Murti
    */

    const product =
        products.find(
            item =>
                item.id === id
        );



    /*
        Stop if product doesn't exist
    */

    if (!product) {

        return;

    }



    /*
        Status
    */

    const statusText =
        getStatusText(
            product.status
        );


    const statusClass =
        product.status;



    /*
        Create WhatsApp message

        The image URL is included
        in the message.

        Normal wa.me links cannot
        automatically attach an image.
    */

    const imageUrl =
        new URL(
            product.image,
            window.location.href
        ).href;



    const whatsappMessage =
        encodeURIComponent(

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



    /*
        WhatsApp button

        We allow enquiry even if
        the Murti is reserved/sold,
        so the customer can ask.
    */

    const actionButton = `

        <a
            href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}"
            target="_blank"
            rel="noopener"
            class="modal-whatsapp"
        >
            💬 या बाप्पाबद्दल चौकशी करा
        </a>

    `;



    /*
        Modal content
    */

    modalBody.innerHTML = `

        <div class="modal-gallery">

            <img
                class="modal-main-image"
                src="${product.image}"
                alt="गणपती मूर्ती क्रमांक ${product.Number}"
            >

        </div>



        <div class="modal-info">


            <h2>
                मूर्ती क्रमांक ${product.Number}
            </h2>



            <span
                class="modal-status ${statusClass}"
            >
                ${statusText}
            </span>



            <div class="modal-details">


                <div class="modal-detail">

                    <span>
                        उंची
                    </span>

                    <strong>
                        ${product.height} फूट
                    </strong>

                </div>



                <div class="modal-detail">

                    <span>
                        उपलब्धता
                    </span>

                    <strong>
                        ${statusText}
                    </strong>

                </div>



                <div class="modal-detail">

                    <span>
                        मूर्ती क्रमांक
                    </span>

                    <strong>
                        ${product.id}
                    </strong>

                </div>


            </div>



            ${actionButton}


        </div>

    `;



    /*
        Show modal
    */

    productModal.classList.add(
        "show"
    );


    productModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );



    /*
        Update URL

        This is important for QR codes.

        Example:

        ?id=ganpati-001
    */

    const newUrl =
        `${window.location.pathname}?id=${product.id}`;


    window.history.pushState(
        {},
        "",
        newUrl
    );

}



/* =========================================================
   CLOSE PRODUCT
========================================================= */

function closeModal() {


    productModal.classList.remove(
        "show"
    );


    productModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );



    /*
        Remove product ID
        from URL
    */

    const cleanUrl =
        window.location.pathname;


    window.history.pushState(
        {},
        "",
        cleanUrl
    );

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


    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        params.get("id");



    /*
        No ID
    */

    if (!productId) {

        return;

    }



    /*
        Find product
    */

    const product =
        products.find(
            item =>
                item.id === productId
        );



    /*
        Invalid ID
    */

    if (!product) {

        return;

    }



    /*
        Wait a little
        before opening modal
    */

    setTimeout(
        () => {

            openProduct(
                product.id
            );

        },
        300
    );

}



/* =========================================================
   GENERAL WHATSAPP
========================================================= */

function setupWhatsApp() {


    const message =
        encodeURIComponent(

            `नमस्कार 🙏

मला तुमच्या गणपती मूर्ती संग्रहाबद्दल अधिक माहिती हवी आहे.

कृपया उपलब्ध मूर्ती आणि त्यांची माहिती कळवा.

धन्यवाद 🙏`

        );



    generalWhatsapp.href =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

}



/* =========================================================
   STATUS TEXT
========================================================= */

function getStatusText(
    status
) {


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