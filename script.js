/* =========================================================
   MORyA STORE
   GANPATI MURTI GALLERY
   ========================================================= */


/* =========================================================
   MURTI DATA
   =========================================================

   Only customer-relevant information is stored here:

   id
   name
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
        name: "राजमुद्रा बाप्पा",
        image: "images/1.jpeg",
        height: 3,
        status: "available"
    },


    {
        id: "ganpati-002",
        name: "इको बाप्पा",
        image: "images/2.jpeg",
        height: 2.5,
        status: "available"
    },


    {
        id: "ganpati-003",
        name: "पारंपरिक बाप्पा",
        image: "images/3.jpeg",
        height: 2.5,
        status: "available"
    },


    {
        id: "ganpati-004",
        name: "दरबार बाप्पा",
        image: "images/4.jpeg",
        height: 4,
        status: "reserved"
    },


    {
        id: "ganpati-005",
        name: "बाल बाप्पा",
        image: "images/5.jpeg",
        height: 1.5,
        status: "available"
    },


    {
        id: "ganpati-006",
        name: "मोरया बाप्पा",
        image: "images/6.jpeg",
        height: 3,
        status: "available"
    },


    {
        id: "ganpati-007",
        name: "मोरया बाप्पा",
        image: "images/7.jpeg",
        height: 3,
        status: "available"
    },


    {
        id: "ganpati-008",
        name: "मोरया बाप्पा",
        image: "images/8.jpeg",
        height: 3,
        status: "available"
    },


    {
        id: "ganpati-009",
        name: "मोरया बाप्पा",
        image: "images/9.jpeg",
        height: 3,
        status: "available"
    },


    {
        id: "ganpati-010",
        name: "मोरया बाप्पा",
        image: "images/10.jpeg",
        height: 3,
        status: "available"
    },


    {
        id: "ganpati-011",
        name: "मोरया बाप्पा",
        image: "images/11.jpeg",
        height: 3,
        status: "available"
    }

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

let currentFilter = "all";

let currentSearch = "";



/* =========================================================
   DOM ELEMENTS
========================================================= */

const productsGrid =
    document.getElementById("productsGrid");


const resultCount =
    document.getElementById("resultCount");


const heroProductCount =
    document.getElementById("heroProductCount");


const searchInput =
    document.getElementById("searchInput");


const sortSelect =
    document.getElementById("sortSelect");


const emptyState =
    document.getElementById("emptyState");


const productModal =
    document.getElementById("productModal");


const modalBody =
    document.getElementById("modalBody");


const modalClose =
    document.getElementById("modalClose");


const clearFiltersBtn =
    document.getElementById("clearFiltersBtn");


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



    /*
        Search
    */

    searchInput.addEventListener(
        "input",
        () => {

            currentSearch =
                searchInput.value
                    .trim()
                    .toLowerCase();


            renderProducts();

        }
    );


    sortSelect.addEventListener(
        "change",
        () => {
            renderProducts();
        }
    );


    /*
        Filter buttons
    */

    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );


    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {


                    /*
                        Remove active
                        from all buttons
                    */

                    filterButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                        Add active
                        to clicked button
                    */

                    button.classList.add(
                        "active"
                    );


                    /*
                        Store selected filter
                    */

                    currentFilter =
                        button.dataset.filter;


                    renderProducts();

                }
            );

        }
    );



    /*
        Clear filters
    */

    clearFiltersBtn.addEventListener(
        "click",
        clearFilters
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

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );



    /*
        Close mobile menu
        after clicking link
    */

    mobileMenu
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );

}



/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {


    let filtered =
        [...products];



    /*
        Availability filter
    */

    if (
        currentFilter !== "all"
    ) {

        filtered =
            filtered.filter(
                product =>
                    product.status ===
                    currentFilter
            );

    }



    /*
        Search
    */

    if (currentSearch) {

        filtered =
            filtered.filter(
                product => {

                    const searchableText = [

                        product.name,

                        product.id,

                        product.height.toString(),

                        getStatusText(
                            product.status
                        )

                    ]
                        .join(" ")
                        .toLowerCase();


                    return searchableText.includes(
                        currentSearch
                    );

                }
            );

    }



    return sortProducts(filtered);

}


function sortProducts(list) {

    const sortValue =
        sortSelect?.value || "featured";


    const items = [...list];


    if (
        sortValue === "height-low"
    ) {

        return items.sort(
            (a, b) => a.height - b.height
        );

    }


    if (
        sortValue === "height-high"
    ) {

        return items.sort(
            (a, b) => b.height - a.height
        );

    }


    return items;

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

    if (
        filtered.length === 0
    ) {

        productsGrid.innerHTML = "";

        emptyState.classList.add(
            "show"
        );

        return;

    }



    /*
        Hide empty state
    */

    emptyState.classList.remove(
        "show"
    );



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

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
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
                    ${product.name}
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

मला "${product.name}" या गणपती मूर्तीबद्दल माहिती हवी आहे.

मूर्ती क्रमांक: ${product.id}
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
                alt="${product.name}"
            >

        </div>



        <div class="modal-info">


            <h2>
                ${product.name}
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
   CLEAR FILTERS
========================================================= */

function clearFilters() {


    currentFilter =
        "all";


    currentSearch =
        "";



    /*
        Clear search
    */

    searchInput.value =
        "";



    /*
        Remove active
        from all filters
    */

    document
        .querySelectorAll(
            ".filter-button"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );



    /*
        Activate All
    */

    const allButton =
        document.querySelector(
            '.filter-button[data-filter="all"]'
        );


    if (allButton) {

        allButton.classList.add(
            "active"
        );

    }



    /*
        Render again
    */

    renderProducts();

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