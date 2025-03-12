import officeParser from 'officeparser';
import { NextResponse } from 'next/server';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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

// Maximum file size (in bytes)
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB for video files

export async function POST(request) {
    try {
        if (!request.body) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file');
        const fileType = formData.get('fileType');

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            );
        }

        if (fileType === 'video') {
            console.log("Processing video");
            
            // Upload video to Firebase Storage
            const storageRef = ref(storage, `videos/${file.name}`);
            await uploadBytes(storageRef, file);
            const videoUrl = await getDownloadURL(storageRef);

            // Get video transcription using OpenAI
            const transcription = await openai.audio.transcriptions.create({
                file: file,
                model: "whisper-1",
            });

            return NextResponse.json({
                type: 'video',
                videoUrl,
                transcription: transcription.text
            });
        } else {
            // Handle document processing
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const parsedText = await parseDocument(buffer);

            return NextResponse.json({
                type: 'document',
                text: parsedText
            });
        }
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
        bodyParser: {
            sizeLimit: '100mb'
        }
    }
};