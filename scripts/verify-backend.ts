const BASE_URL = "http://localhost:3000/api/products";

async function testProductAPI() {
    console.log("🚀 Starting Product API Tests...");

    // 1. Create a new product
    console.log("\n1️⃣ Testing POST /api/products (Create Product)...");
    const newProduct = {
        name: "Full Stack Test Product " + Date.now(),
        description: "This is a test product to verify full stack integration.",
        price: 150.00,
        category: "Testing",
        images: ["https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"],
        stock: 100,
        tags: ["test", "fullstack"],
        variants: [],
        isActive: true,
    };

    try {
        const createRes = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });

        const createData = await createRes.json();
        console.log("Status:", createRes.status);

        if (createRes.ok) {
            console.log("✅ Product Created Successfully!");
            console.log("ID:", createData._id);
            console.log("Name:", createData.name);
            console.log("Images:", createData.images);
        } else {
            console.error("❌ Failed to create product");
            console.error("Error:", createData);
        }
    } catch (error) {
        console.error("❌ Network Error:", error);
    }
}

testProductAPI();
