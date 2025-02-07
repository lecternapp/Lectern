const { parseDocument, searchForTermInOfficeFile } = require('./route');

async function runTests() {
    const filepath = "app/uploads/test.ppt";
    try {
        // Test 1: Parse a PDF file
        console.log("Testing" + filepath.split("/").pop() + "parsing..."); // PDF, PPTX, 
        const result = await parseDocument(filepath); //PDF 1 
        console.log("Parse result:", result);

        // Test 2: Search for a term
        console.log("\nTesting search functionality...");
        const searchResult = await searchForTermInOfficeFile("example", filepath);
        console.log("Search result:", searchResult);

    } catch (error) {
        console.error("Test failed:", error);
    }
}

runTests(); 