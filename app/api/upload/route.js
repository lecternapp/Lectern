import officeParser from 'officeparser';
import { NextResponse } from 'next/server';

const parserConfig = {
    newlineDelimiter: " ",  // Separate new lines with a space instead of the default \n.
    ignoreNotes: true       // Ignore notes while parsing presentation files like pptx or odp.
}

async function parseDocument(buffer) {
    try {
        const data = await officeParser.parseOfficeAsync(buffer, parserConfig);
        return data;
    } catch (err) {
        console.error("Error parsing document:", err);
        throw err;
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Handle document processing
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const parsedText = await parseDocument(buffer);

        return NextResponse.json({
            success: true,
            type: 'document',
            text: parsedText
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: `Failed to process file: ${error.message}` },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: false,
        responseLimit: '50mb',
    },
};