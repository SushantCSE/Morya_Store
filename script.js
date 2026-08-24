/* =========================================================
   GANPATI MURTI GALLERY
   Demo Data

   Later this data will come from Firebase Firestore.
========================================================= */


const products = [

    {
        id: "ganpati-001",

        name: "Rajmudra Bappa",

        category: "Premium",

        tags: [
            "premium",
            "shadu-mati"
        ],

        price: 15000,

        height: 3,

        material: "Shadu Mati",

        color: "Traditional Red & Gold",

        status: "available",

        featured: true,

        image:
            "images/1.jpeg",

        description:
            "A beautifully detailed traditional Ganpati Murti with an elegant royal appearance. Designed for families looking for a graceful and premium Bappa."
    },


    {
        id: "ganpati-002",

        name: "Eco Bappa",

        category: "Eco-Friendly",

        tags: [
            "eco-friendly"
        ],

        price: 7500,

        height: 2.5,

        material: "Eco-Friendly Clay",

        color: "Natural Earth Tones",

        status: "available",

        featured: true,

        image:
            "images/2.jpeg",

        description:
            "A simple and elegant eco-friendly Ganpati Murti suitable for a peaceful and beautiful home celebration."
    },


    {
        id: "ganpati-003",

        name: "Traditional Bappa",

        category: "Shadu Mati",

        tags: [
            "shadu-mati"
        ],

        price: 9500,

        height: 2.5,

        material: "Shadu Mati",

        color: "Classic Orange",

        status: "available",

        featured: true,

        image:
            "images/3.jpeg ",

        description:
            "A classic traditional Ganpati design inspired by the timeless style of Maharashtra."
    },


    {
        id: "ganpati-004",

        name: "Darbar Bappa",

        category: "Premium",

        tags: [
            "premium",
            "shadu-mati"
        ],

        price: 22000,

        height: 4,

        material: "Shadu Mati",

        color: "Red, Gold & Cream",

        status: "reserved",

        featured: true,

        image:
            "images/4.jpeg",

        description:
            "A grand premium Murti with detailed ornaments and a majestic appearance."
    },


    {
        id: "ganpati-005",

        name: "Bal Bappa",

        category: "Eco-Friendly",

        tags: [
            "eco-friendly"
        ],

        price: 4500,

        height: 1.5,

        material: "Eco-Friendly Clay",

        color: "Soft Orange",

        status: "available",

        featured: false,

        image:
            "images/5.jpeg",

        description:
            "A compact and charming Bappa suitable for smaller homes and spaces."
    },


    {
        id: "ganpati-006",

        name: "Morya Bappa",

        category: "Shadu Mati",

        tags: [
            "shadu-mati"
        ],

        price: 12000,

        height: 3,

        material: "Shadu Mati",

        color: "Orange & Gold",

        status: "available",

        featured: false,

        image:
            "images/6.jpeg",

        description:
            "A traditional Shadu Mati Murti with a warm festive appearance."
    },
    {
        id: "ganpati-007",

        name: "Morya Bappa",

        category: "Shadu Mati",

        tags: [
            "shadu-mati"
        ],

        price: 12000,

        height: 3,

        material: "Shadu Mati",

        color: "Orange & Gold",

        status: "available",

        featured: false,

        image:
            "images/7.jpeg",

        description:
            "A traditional Shadu Mati Murti with a warm festive appearance."
    },

    {
        id: "ganpati-008",

        name: "Morya Bappa",

        category: "Shadu Mati",

        tags: [
            "shadu-mati"
        ],

        price: 12000,

        height: 3,

        material: "Shadu Mati",

        color: "Orange & Gold",

        status: "available",

        featured: false,

        image:
            "images/8.jpeg",

        description:
            "A traditional Shadu Mati Murti with a warm festive appearance."
    },

    {
        id: "ganpati-009",

        name: "Morya Bappa",

        category: "Shadu Mati",

        tags: [
            "shadu-mati"
        ],

        price: 12000,

        height: 3,

        material: "Shadu Mati",

        color: "Orange & Gold",

        status: "available",

        featured: false,

        image:
            "images/9.jpeg",

        description:
            "A traditional Shadu Mati Murti with a warm festive appearance."
    },

    {
        id: "ganpati-010",

        name: "Morya Bappa",

        category: "Shadu Mati",

        tags: [
            "shadu-mati"
        ],

        price: 12000,

        height: 3,

        material: "Shadu Mati",

        color: "Orange & Gold",

        status: "available",

        featured: false,

        image:
            "images/10.jpeg",

        description:
            "A traditional Shadu Mati Murti with a warm festive appearance."
    },

    {
        id: "ganpati-011",

        name: "Morya Bappa",

        category: "Shadu Mati",

        tags: [
            "shadu-mati"
        ],

        price: 12000,

        height: 3,

        material: "Shadu Mati",

        color: "Orange & Gold",

        status: "available",

        featured: false,

        image:
            "images/11.jpeg",

        description:
            "A traditional Shadu Mati Murti with a warm festive appearance."
    }
    

];


/* =========================================================
   SETTINGS
========================================================= */


/*
    Put your WhatsApp number here.

    IMPORTANT:
    Use country code without +.

    Example:

    India:
    919876543210
*/

const WHATSAPP_NUMBER = "919999999999";


/* =========================================================
   STATE
========================================================= */

let currentFilter = "all";

let currentSearch = "";

let currentSort = "featured";


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

    heroProductCount.textContent =
        products.length;

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


    /*
        Sorting
    */

    sortSelect.addEventListener(
        "change",
        () => {

            currentSort =
                sortSelect.value;

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

                    filterButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


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
        Modal close
    */

    modalClose.addEventListener(
        "click",
        closeModal
    );


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
        Category filter
    */

    if (
        currentFilter !== "all"
    ) {

        if (
            currentFilter === "available"
        ) {

            filtered =
                filtered.filter(
                    product =>
                        product.status ===
                        "available"
                );

        } else {

            filtered =
                filtered.filter(
                    product =>
                        product.tags.includes(
                            currentFilter
                        )
                );

        }

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

                        product.category,

                        product.material,

                        product.color,

                        product.height.toString()

                    ]
                        .join(" ")
                        .toLowerCase();


                    return searchableText
                        .includes(
                            currentSearch
                        );

                }
            );

    }


    /*
        Sorting
    */

    filtered.sort(
        (a, b) => {

            switch (currentSort) {

                case "price-low":

                    return a.price - b.price;


                case "price-high":

                    return b.price - a.price;


                case "height-low":

                    return a.height - b.height;


                case "height-high":

                    return b.height - a.height;


                case "featured":

                default:

                    return (
                        Number(b.featured) -
                        Number(a.featured)
                    );

            }

        }
    );


    return filtered;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const filtered =
        getFilteredProducts();


    resultCount.textContent =
        filtered.length;


    /*
        Empty state
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


    emptyState.classList.remove(
        "show"
    );


    /*
        Product cards
    */

    productsGrid.innerHTML =
        filtered
            .map(
                createProductCard
            )
            .join("");

}


/* =========================================================
   PRODUCT CARD
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


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>


                <h3 class="product-name">
                    ${product.name}
                </h3>


                <div class="product-meta">

                    <span>
                        ${product.height} ft
                    </span>

                    <span>
                        ${product.material}
                    </span>

                </div>


                <div class="product-footer">

                    <span class="product-price">
                        ₹${formatPrice(product.price)}
                    </span>


                    <button
                        class="view-product"
                        onclick="openProduct('${product.id}')"
                    >
                        View Details →
                    </button>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   PRODUCT DETAILS
========================================================= */

function openProduct(id) {

    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) {
        return;
    }


    const statusText =
        getStatusText(
            product.status
        );


    const statusClass =
        product.status;


    const whatsappMessage =
        encodeURIComponent(
            `Hello, I am interested in ${product.name} (${product.id}). Please share more details.`
        );


    let actionButton;


    if (
        product.status === "available"
    ) {

        actionButton = `

            <a
                href="https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}"
                target="_blank"
                rel="noopener"
                class="modal-whatsapp"
            >
                💬 Ask About This Murti
            </a>

        `;

    } else if (
        product.status === "reserved"
    ) {

        actionButton = `

            <div class="modal-sold-message">
                This Murti is currently reserved.
            </div>

        `;

    } else {

        actionButton = `

            <div class="modal-sold-message">
                This Murti is currently sold.
            </div>

        `;

    }


    modalBody.innerHTML = `

        <div class="modal-gallery">

            <img
                class="modal-main-image"
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <div class="modal-info">

            <p class="modal-category">
                ${product.category}
            </p>


            <h2>
                ${product.name}
            </h2>


            <div class="modal-price">
                ₹${formatPrice(product.price)}
            </div>


            <span
                class="modal-status ${statusClass}"
            >
                ${statusText}
            </span>


            <div class="modal-details">

                <div class="modal-detail">

                    <span>
                        Height
                    </span>

                    <strong>
                        ${product.height} Feet
                    </strong>

                </div>


                <div class="modal-detail">

                    <span>
                        Material
                    </span>

                    <strong>
                        ${product.material}
                    </strong>

                </div>


                <div class="modal-detail">

                    <span>
                        Colour
                    </span>

                    <strong>
                        ${product.color}
                    </strong>

                </div>


                <div class="modal-detail">

                    <span>
                        Collection ID
                    </span>

                    <strong>
                        ${product.id}
                    </strong>

                </div>

            </div>


            <p class="modal-description">
                ${product.description}
            </p>


            ${actionButton}

        </div>

    `;


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
        Update URL.

        This is important for QR codes.

        Example:

        index.html?id=ganpati-001
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
        Remove product ID from URL
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
    This is the important part.

    Suppose a QR code contains:

    https://yourwebsite.com/?id=ganpati-003

    When the customer scans it,
    this function automatically opens
    that particular Murti.
*/

function checkQRCodeProduct() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        params.get("id");


    if (!productId) {
        return;
    }


    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) {
        return;
    }


    /*
        Small delay so the page
        loads nicely before opening.
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

    currentFilter = "all";

    currentSearch = "";

    currentSort = "featured";


    searchInput.value = "";

    sortSelect.value =
        "featured";


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


    document
        .querySelector(
            '.filter-button[data-filter="all"]'
        )
        .classList.add(
            "active"
        );


    renderProducts();

}


/* =========================================================
   WHATSAPP
========================================================= */

function setupWhatsApp() {

    const message =
        encodeURIComponent(
            "Hello, I would like to know more about your Ganpati Murti collection."
        );


    generalWhatsapp.href =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

}


/* =========================================================
   HELPERS
========================================================= */

function formatPrice(
    price
) {

    return price.toLocaleString(
        "en-IN"
    );

}


function getStatusText(
    status
) {

    switch (status) {

        case "available":
            return "Available";

        case "reserved":
            return "Reserved";

        case "sold":
            return "Sold";

        default:
            return "Available";

    }

}