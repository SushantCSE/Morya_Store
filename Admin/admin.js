/* =========================================================
   MORYA ARTS
   ADMIN PANEL
   ========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

let allMurtis = [];

let filteredMurtis = [];

let currentEditMurti = null;


/* =========================================================
   WAIT FOR FIREBASE
========================================================= */

function firebaseReady() {

    return (
        window.MoryaAdmin &&
        window.MoryaAdmin.auth &&
        window.MoryaAdmin.db
    );

}


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loginSection =
    document.getElementById("loginSection");

const dashboardSection =
    document.getElementById("dashboardSection");


const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginButton =
    document.getElementById("loginButton");

const loginMessage =
    document.getElementById("loginMessage");


const logoutButton =
    document.getElementById("logoutButton");


const totalCount =
    document.getElementById("totalCount");

const availableCount =
    document.getElementById("availableCount");

const soldCount =
    document.getElementById("soldCount");


const addMurtiForm =
    document.getElementById("addMurtiForm");

const addMurtiNumber =
    document.getElementById("addMurtiNumber");

const addHeight =
    document.getElementById("addHeight");

const addStatus =
    document.getElementById("addStatus");

const addImagePath =
    document.getElementById("addImagePath");

const addMurtiButton =
    document.getElementById("addMurtiButton");

const cancelAddButton =
    document.getElementById("cancelAddButton");

const addMessage =
    document.getElementById("addMessage");


const refreshButton =
    document.getElementById("refreshButton");

const retryButton =
    document.getElementById("retryButton");


const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");


const loadingState =
    document.getElementById("loadingState");

const errorState =
    document.getElementById("errorState");

const errorText =
    document.getElementById("errorText");

const emptyState =
    document.getElementById("emptyState");

const murtiList =
    document.getElementById("murtiList");


/* =========================================================
   EDIT MODAL
========================================================= */

const editModal =
    document.getElementById("editModal");

const editModalBackdrop =
    document.getElementById("editModalBackdrop");

const editModalClose =
    document.getElementById("editModalClose");

const cancelEditButton =
    document.getElementById("cancelEditButton");


const editMurtiForm =
    document.getElementById("editMurtiForm");

const editDocumentId =
    document.getElementById("editDocumentId");

const editMurtiNumber =
    document.getElementById("editMurtiNumber");

const editMurtiNumberTitle =
    document.getElementById("editMurtiNumberTitle");

const editHeight =
    document.getElementById("editHeight");

const editStatus =
    document.getElementById("editStatus");

const editImagePath =
    document.getElementById("editImagePath");

const saveEditButton =
    document.getElementById("saveEditButton");

const editMessage =
    document.getElementById("editMessage");


/* =========================================================
   UTILITY
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   DOCUMENT ID
========================================================= */

/*
    Existing records are preserved.

    For NEW Murtis we use:

    29 -> ganpati-0029
    30 -> ganpati-0030
    31 -> ganpati-0031

    This gives us predictable QR IDs.
*/

function createMurtiId(number) {

    return (
        "ganpati-" +
        String(number).padStart(4, "0")
    );

}


/* =========================================================
   STATUS TEXT
========================================================= */

function getStatusText(status) {

    if (status === "sold") {
        return "Sold";
    }

    return "Available";

}


/* =========================================================
   SHOW LOGIN
========================================================= */

function showLogin() {

    loginSection.hidden = false;

    dashboardSection.hidden = true;

}


/* =========================================================
   SHOW DASHBOARD
========================================================= */

function showDashboard() {

    loginSection.hidden = true;

    dashboardSection.hidden = false;

    loadMurtis();

}


/* =========================================================
   AUTH STATE
========================================================= */

function setupAuth() {

    if (!firebaseReady()) {

        console.error(
            "Firebase is not ready."
        );

        return;

    }


    const {
        auth,
        onAuthStateChanged,
        signOut,
        ADMIN_UID
    } = window.MoryaAdmin;


    onAuthStateChanged(
        auth,
        async (user) => {

            if (!user) {

                showLogin();

                return;

            }


            /*
                Security check:
                Only our Admin UID is allowed.
            */

            if (user.uid !== ADMIN_UID) {

                await signOut(auth);

                showLogin();

                loginMessage.textContent =
                    "या खात्याला Admin access नाही.";

                loginMessage.className =
                    "form-message error-message";

                return;

            }


            showDashboard();

        }
    );

}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        if (!firebaseReady()) {

            loginMessage.textContent =
                "Firebase तयार नाही. Page refresh करा.";

            return;

        }


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        loginButton.disabled = true;

        loginButton.textContent =
            "Login होत आहे...";

        loginMessage.textContent = "";


        try {

            const {
                auth,
                signInWithEmailAndPassword
            } = window.MoryaAdmin;


            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            let message =
                "Login failed. Email किंवा password तपासा.";


            if (
                error.code ===
                "auth/invalid-credential"
            ) {

                message =
                    "Email किंवा password चुकीचा आहे.";

            }


            if (
                error.code ===
                "auth/too-many-requests"
            ) {

                message =
                    "खूप login attempts झाले. थोड्या वेळाने पुन्हा प्रयत्न करा.";

            }


            loginMessage.textContent =
                message;

            loginMessage.className =
                "form-message error-message";


        } finally {

            loginButton.disabled = false;

            loginButton.textContent =
                "Login";

        }

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            await window.MoryaAdmin.signOut(
                window.MoryaAdmin.auth
            );

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    }
);


/* =========================================================
   LOAD MURTIS
========================================================= */

async function loadMurtis() {

    showLoading();

    hideError();


    try {

        const {
            db,
            collection,
            query,
            orderBy,
            getDocs
        } = window.MoryaAdmin;


        const murtiQuery =
            query(
                collection(db, "murtis"),
                orderBy("murtiNumber")
            );


        const snapshot =
            await getDocs(murtiQuery);


        allMurtis =
            snapshot.docs.map(
                (document) => {

                    const data =
                        document.data();


                    return {

                        id:
                            document.id,

                        murtiNumber:
                            data.murtiNumber,

                        height:
                            data.height || "",

                        imagePath:
                            data.imagePath || "",

                        status:
                            data.status || "available"

                    };

                }
            );


        updateStats();

        applyFilters();


        hideLoading();


    } catch (error) {

        console.error(
            "Error loading Murtis:",
            error
        );


        hideLoading();

        showError(
            "Firestore मधून collection load करता आली नाही."
        );

    }

}


/* =========================================================
   STATS
========================================================= */

function updateStats() {

    const total =
        allMurtis.length;


    const available =
        allMurtis.filter(
            murti =>
                murti.status === "available"
        ).length;


    const sold =
        allMurtis.filter(
            murti =>
                murti.status === "sold"
        ).length;


    totalCount.textContent =
        total;

    availableCount.textContent =
        available;

    soldCount.textContent =
        sold;

}


/* =========================================================
   FILTERS
========================================================= */

function applyFilters() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedStatus =
        statusFilter.value;


    filteredMurtis =
        allMurtis.filter(
            (murti) => {

                const numberMatches =
                    String(murti.murtiNumber)
                        .toLowerCase()
                        .includes(searchValue);


                const statusMatches =
                    selectedStatus === "all" ||
                    murti.status === selectedStatus;


                return (
                    numberMatches &&
                    statusMatches
                );

            }
        );


    renderMurtis();

}


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    applyFilters
);


/* =========================================================
   STATUS FILTER
========================================================= */

statusFilter.addEventListener(
    "change",
    applyFilters
);


/* =========================================================
   RENDER MURTIS
========================================================= */

function renderMurtis() {

    murtiList.innerHTML = "";


    if (
        filteredMurtis.length === 0
    ) {

        emptyState.hidden = false;

        return;

    }


    emptyState.hidden = true;


    filteredMurtis.forEach(
        (murti) => {

            const card =
                document.createElement("article");


            card.className =
                "murti-admin-card";


            const imagePath =
                murti.imagePath
                    ? "../" + murti.imagePath
                    : "";


            const statusClass =
                murti.status === "sold"
                    ? "sold"
                    : "available";


            const statusText =
                getStatusText(
                    murti.status
                );


            card.innerHTML = `

                <div class="murti-image-wrapper">

                    ${
                        imagePath
                            ? `
                                <img
                                    src="${escapeHTML(imagePath)}"
                                    alt="Murti ${escapeHTML(murti.murtiNumber)}"
                                    class="murti-image"
                                    loading="lazy"
                                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                                >

                                <div
                                    class="image-error"
                                    style="display:none;"
                                >
                                    🖼️
                                    <span>
                                        Image सापडली नाही
                                    </span>
                                </div>
                            `
                            : `
                                <div class="image-error">
                                    🖼️
                                    <span>
                                        Image path नाही
                                    </span>
                                </div>
                            `
                    }

                </div>


                <div class="murti-card-content">

                    <div class="murti-card-top">

                        <div>

                            <span class="murti-label">
                                MURTI
                            </span>

                            <h3>
                                #${escapeHTML(murti.murtiNumber)}
                            </h3>

                        </div>


                        <span
                            class="status-badge ${statusClass}"
                        >
                            ${statusText}
                        </span>

                    </div>


                    <div class="murti-details">

                        <div class="detail-item">

                            <span>
                                Height
                            </span>

                            <strong>
                                ${escapeHTML(murti.height)}
                            </strong>

                        </div>


                        <div class="detail-item">

                            <span>
                                Image
                            </span>

                            <strong
                                class="image-path"
                                title="${escapeHTML(murti.imagePath)}"
                            >
                                ${escapeHTML(murti.imagePath || "—")}
                            </strong>

                        </div>

                    </div>


                    <div class="quick-actions">

                        <button
                            type="button"
                            class="quick-button available-button"
                            data-action="available"
                            data-id="${escapeHTML(murti.id)}"
                            ${
                                murti.status === "available"
                                    ? "disabled"
                                    : ""
                            }
                        >
                            ✓ Available
                        </button>


                        <button
                            type="button"
                            class="quick-button sold-button"
                            data-action="sold"
                            data-id="${escapeHTML(murti.id)}"
                            ${
                                murti.status === "sold"
                                    ? "disabled"
                                    : ""
                            }
                        >
                            ✓ Sold
                        </button>

                    </div>


                    <div class="card-actions">

                        <button
                            type="button"
                            class="edit-button"
                            data-action="edit"
                            data-id="${escapeHTML(murti.id)}"
                        >
                            ✏️ Edit
                        </button>


                        <button
                            type="button"
                            class="delete-button"
                            data-action="delete"
                            data-id="${escapeHTML(murti.id)}"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

            `;


            murtiList.appendChild(card);

        }
    );

}


/* =========================================================
   CARD ACTIONS
========================================================= */

murtiList.addEventListener(
    "click",
    async (event) => {

        const button =
            event.target.closest(
                "button[data-action]"
            );


        if (!button) {
            return;
        }


        const action =
            button.dataset.action;


        const id =
            button.dataset.id;


        if (action === "edit") {

            openEditModal(id);

        }


        if (action === "delete") {

            await deleteMurti(id);

        }


        if (
            action === "available" ||
            action === "sold"
        ) {

            await quickUpdateStatus(
                id,
                action
            );

        }

    }
);


/* =========================================================
   ADD NEW MURTI
========================================================= */

addMurtiForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const number =
            Number(
                addMurtiNumber.value
            );


        const height =
            addHeight.value.trim();


        const status =
            addStatus.value;


        const imagePath =
            addImagePath.value.trim();


        /* Validation */

        if (
            !Number.isInteger(number) ||
            number < 1
        ) {

            showFormMessage(
                addMessage,
                "Murti number योग्य द्या.",
                "error"
            );

            return;

        }


        if (!height) {

            showFormMessage(
                addMessage,
                "Height द्या.",
                "error"
            );

            return;

        }


        if (!imagePath) {

            showFormMessage(
                addMessage,
                "Image path द्या.",
                "error"
            );

            return;

        }


        addMurtiButton.disabled =
            true;

        addMurtiButton.textContent =
            "Save होत आहे...";


        try {

            const {
                db,
                collection,
                query,
                where,
                limit,
                getDocs,
                doc,
                setDoc
            } = window.MoryaAdmin;


            /*
                IMPORTANT:
                We check Firestore by Murti Number,
                not only by document ID.

                This protects our existing records
                whose old IDs have different formatting.
            */

            const duplicateQuery =
                query(
                    collection(db, "murtis"),
                    where(
                        "murtiNumber",
                        "==",
                        number
                    ),
                    limit(1)
                );


            const duplicateSnapshot =
                await getDocs(
                    duplicateQuery
                );


            if (
                !duplicateSnapshot.empty
            ) {

                showFormMessage(
                    addMessage,
                    `Murti #${number} आधीपासून exists आहे.`,
                    "error"
                );

                return;

            }


            /*
                New document ID

                Example:

                29
                ↓
                ganpati-0029
            */

            const murtiId =
                createMurtiId(number);


            const murtiRef =
                doc(
                    db,
                    "murtis",
                    murtiId
                );


            /*
                Extra safety:
                Check whether this exact document
                ID already exists.
            */

            const existingDocument =
                await window.MoryaAdmin.getDoc(
                    murtiRef
                );


            if (
                existingDocument.exists()
            ) {

                showFormMessage(
                    addMessage,
                    "हा document ID आधीपासून exists आहे.",
                    "error"
                );

                return;

            }


            await setDoc(
                murtiRef,
                {

                    murtiNumber:
                        number,

                    height:
                        height,

                    status:
                        status,

                    imagePath:
                        imagePath

                }
            );


            showFormMessage(
                addMessage,
                `Murti #${number} successfully add झाली!`,
                "success"
            );


            addMurtiForm.reset();


            addStatus.value =
                "available";


            await loadMurtis();


        } catch (error) {

            console.error(
                "Add Murti error:",
                error
            );


            showFormMessage(
                addMessage,
                getFirestoreErrorMessage(
                    error
                ),
                "error"
            );


        } finally {

            addMurtiButton.disabled =
                false;

            addMurtiButton.textContent =
                "➕ Murti Save करा";

        }

    }
);


/* =========================================================
   CLEAR ADD FORM
========================================================= */

cancelAddButton.addEventListener(
    "click",
    () => {

        addMurtiForm.reset();

        addStatus.value =
            "available";

        clearFormMessage(
            addMessage
        );

    }
);


/* =========================================================
   QUICK STATUS UPDATE
========================================================= */

async function quickUpdateStatus(
    id,
    newStatus
) {

    const murti =
        allMurtis.find(
            item => item.id === id
        );


    if (!murti) {
        return;
    }


    try {

        const {
            db,
            doc,
            updateDoc
        } = window.MoryaAdmin;


        const murtiRef =
            doc(
                db,
                "murtis",
                id
            );


        await updateDoc(
            murtiRef,
            {

                status:
                    newStatus

            }
        );


        /*
            Update local data immediately
            so UI feels fast.
        */

        murti.status =
            newStatus;


        updateStats();

        applyFilters();


    } catch (error) {

        console.error(
            "Status update error:",
            error
        );


        alert(
            getFirestoreErrorMessage(
                error
            )
        );

    }

}


/* =========================================================
   OPEN EDIT MODAL
========================================================= */

function openEditModal(id) {

    const murti =
        allMurtis.find(
            item => item.id === id
        );


    if (!murti) {
        return;
    }


    currentEditMurti =
        murti;


    editDocumentId.value =
        murti.id;


    editMurtiNumber.value =
        murti.murtiNumber;


    editMurtiNumberTitle.textContent =
        murti.murtiNumber;


    editHeight.value =
        murti.height;


    editStatus.value =
        murti.status === "sold"
            ? "sold"
            : "available";


    editImagePath.value =
        murti.imagePath;


    clearFormMessage(
        editMessage
    );


    editModal.classList.add(
        "show"
    );


    editModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        () => {

            editHeight.focus();

        },
        100
    );

}


/* =========================================================
   CLOSE EDIT MODAL
========================================================= */

function closeEditModal() {

    editModal.classList.remove(
        "show"
    );


    editModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    currentEditMurti =
        null;

}


/* =========================================================
   EDIT MODAL EVENTS
========================================================= */

editModalClose.addEventListener(
    "click",
    closeEditModal
);


cancelEditButton.addEventListener(
    "click",
    closeEditModal
);


editModalBackdrop.addEventListener(
    "click",
    closeEditModal
);


/* =========================================================
   EDIT FORM
========================================================= */

editMurtiForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const id =
            editDocumentId.value;


        const height =
            editHeight.value.trim();


        const status =
            editStatus.value;


        const imagePath =
            editImagePath.value.trim();


        if (!height) {

            showFormMessage(
                editMessage,
                "Height द्या.",
                "error"
            );

            return;

        }


        if (!imagePath) {

            showFormMessage(
                editMessage,
                "Image path द्या.",
                "error"
            );

            return;

        }


        saveEditButton.disabled =
            true;

        saveEditButton.textContent =
            "Saving...";


        try {

            const {
                db,
                doc,
                updateDoc
            } = window.MoryaAdmin;


            const murtiRef =
                doc(
                    db,
                    "murtis",
                    id
                );


            await updateDoc(
                murtiRef,
                {

                    height:
                        height,

                    status:
                        status,

                    imagePath:
                        imagePath

                }
            );


            showFormMessage(
                editMessage,
                "Murti successfully updated!",
                "success"
            );


            await loadMurtis();


            setTimeout(
                () => {

                    closeEditModal();

                },
                600
            );


        } catch (error) {

            console.error(
                "Edit error:",
                error
            );


            showFormMessage(
                editMessage,
                getFirestoreErrorMessage(
                    error
                ),
                "error"
            );


        } finally {

            saveEditButton.disabled =
                false;

            saveEditButton.textContent =
                "Save Changes";

        }

    }
);


/* =========================================================
   DELETE MURTI
========================================================= */

async function deleteMurti(id) {

    const murti =
        allMurtis.find(
            item => item.id === id
        );


    if (!murti) {
        return;
    }


    const confirmed =
        window.confirm(
            `Murti #${murti.murtiNumber} delete करायची आहे का?\n\nFirestore record delete होईल.\nGitHub मधील image delete होणार नाही.`
        );


    if (!confirmed) {
        return;
    }


    try {

        const {
            db,
            doc,
            deleteDoc
        } = window.MoryaAdmin;


        const murtiRef =
            doc(
                db,
                "murtis",
                id
            );


        await deleteDoc(
            murtiRef
        );


        await loadMurtis();


        alert(
            `Murti #${murti.murtiNumber} deleted successfully.`
        );


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            getFirestoreErrorMessage(
                error
            )
        );

    }

}


/* =========================================================
   REFRESH
========================================================= */

refreshButton.addEventListener(
    "click",
    loadMurtis
);


retryButton.addEventListener(
    "click",
    loadMurtis
);


/* =========================================================
   LOADING / ERROR STATES
========================================================= */

function showLoading() {

    loadingState.hidden =
        false;

    errorState.hidden =
        true;

    emptyState.hidden =
        true;

    murtiList.innerHTML =
        "";

}


function hideLoading() {

    loadingState.hidden =
        true;

}


function showError(message) {

    errorState.hidden =
        false;

    errorText.textContent =
        message;

}


function hideError() {

    errorState.hidden =
        true;

}


/* =========================================================
   FORM MESSAGES
========================================================= */

function showFormMessage(
    element,
    message,
    type
) {

    element.textContent =
        message;


    if (type === "success") {

        element.className =
            "form-message success-message";

    } else {

        element.className =
            "form-message error-message";

    }

}


function clearFormMessage(
    element
) {

    element.textContent =
        "";

    element.className =
        "form-message";

}


/* =========================================================
   FIRESTORE ERROR MESSAGE
========================================================= */

function getFirestoreErrorMessage(
    error
) {

    if (
        error &&
        error.code ===
        "permission-denied"
    ) {

        return (
            "Permission denied. तुमच्या Admin account ला Firestore write access आहे का ते तपासा."
        );

    }


    if (
        error &&
        error.code ===
        "failed-precondition"
    ) {

        return (
            "Firestore query/index related problem आहे. Console मध्ये तपासा."
        );

    }


    return (
        "Operation पूर्ण झाली नाही. पुन्हा प्रयत्न करा."
    );

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            editModal.classList.contains("show")
        ) {

            closeEditModal();

        }

    }
);


/* =========================================================
   START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        setupAuth
    );

} else {

    setupAuth();

}