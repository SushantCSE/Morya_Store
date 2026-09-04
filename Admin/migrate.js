const productsToMigrate = [
    
    {
        id: "ganpati-003",
        Number: 3,
        image: "images/3.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-004",
        Number: 4,
        image: "images/4.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-005",
        Number: 5,
        image: "images/5.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-006",
        Number: 6,
        image: "images/6.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-007",
        Number: 7,
        image: "images/7.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-008",
        Number: 8,
        image: "images/8.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-009",
        Number: 9,
        image: "images/9.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-010",
        Number: 10,
        image: "images/10.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-011",
        Number: 11,
        image: "images/11.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-012",
        Number: 12,
        image: "images/12.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-013",
        Number: 13,
        image: "images/13.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-014",
        Number: 14,
        image: "images/14.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-015",
        Number: 15,
        image: "images/15.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-016",
        Number: 16,
        image: "images/16.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-017",
        Number: 17,
        image: "images/17.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-018",
        Number: 18,
        image: "images/18.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-019",
        Number: 19,
        image: "images/19.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-020",
        Number: 20,
        image: "images/20.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-021",
        Number: 21,
        image: "images/21.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-0022",
        Number: 22,
        image: "images/22.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-0023",
        Number: 23,
        image: "images/23.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-0024",
        Number: 24,
        image: "images/24.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-0025",
        Number: 25,
        image: "images/25.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-0026",
        Number: 26,
        image: "images/26.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-0027",
        Number: 27,
        image: "images/27.jpeg",
        height: "1.5-2",
        status: "available"
    },
    {
        id: "ganpati-0028",
        Number: 28,
        image: "images/28.jpeg",
        height: "1.5-2",
        status: "available"
    }
];


async function migrateMurtis() {

    const button = document.getElementById("migrateBtn");
    const status = document.getElementById("migrationStatus");

    button.disabled = true;

    status.textContent = "Migrating Murtis...";

    try {

        const batch = db.batch();

        productsToMigrate.forEach(product => {

            const murtiRef =
                db.collection("murtis").doc(product.id);

            batch.set(murtiRef, {
                murtiNumber: product.Number,
                height: product.height,
                imagePath: product.image,
                status: product.status
            });

        });

        await batch.commit();

        status.textContent =
            `Success! ${productsToMigrate.length} Murtis migrated to Firestore.`;

        console.log(
            "Migration completed:",
            productsToMigrate.length
        );

    } catch (error) {

        console.error("Migration error:", error);

        status.textContent =
            "Migration failed. Check the browser console.";

        button.disabled = false;
    }
}