import officeParser from 'officeparser';
import { NextResponse } from 'next/server';

const parserConfig = {
    newlineDelimiter: " ",  // Separate new lines with a space instead of the default \n.
    ignoreNotes: true       // Ignore notes while parsing presentation files like pptx or odp.
}

function callSomeOtherFunction(text) {
    console.log("Processing:", text);
    return text;
}

export async function parseDocument(filepath) {
    try {
        const data = await officeParser.parseOfficeAsync(filepath, parserConfig);
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

// Maximum file size (in bytes) - adjust as needed
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request) {
    try {
        if (!request.body) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
        if (contentLength > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 50MB' },
                { status: 413 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Convert file to buffer for officeparser
        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Parse the file
        const data = await officeParser.parseOfficeAsync(buffer, parserConfig);
        const parsedText = data + " look, I can parse a powerpoint file";

        return NextResponse.json({ 
            success: true, 
            text: parsedText 
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to process file' },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb'
        }
    }
};