import officeParser from 'officeparser';

const config = {
    newlineDelimiter: " ",  // Separate new lines with a space instead of the default \n.
    ignoreNotes: true       // Ignore notes while parsing presentation files like pptx or odp.
}

function callSomeOtherFunction(text) {
    console.log("Processing:", text);
    return text;
}

export async function parseDocument(filepath) {
    try {
        const data = await officeParser.parseOfficeAsync(filepath, config);
        const newText = data + " look, I can parse a powerpoint file";
        return callSomeOtherFunction(newText);
    } catch (err) {
        console.error("Error parsing document:", err);
        throw err;
    }
}

// Search for a term in the parsed text.
export function searchForTermInOfficeFile(searchterm, filepath) {
    return officeParser.parseOfficeAsync(filepath)
        .then(data => data.indexOf(searchterm) != -1);
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file uploaded' }), { 
                status: 400 
            });
        }

        // Convert file to buffer for officeparser
        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Parse the file
        const data = await officeParser.parseOfficeAsync(buffer, config);
        const parsedText = data + " look, I can parse a powerpoint file";

        return new Response(JSON.stringify({ 
            success: true, 
            text: parsedText 
        }));

    } catch (error) {
        console.error('Upload error:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to process file' 
        }), { 
            status: 500 
        });
    }
}