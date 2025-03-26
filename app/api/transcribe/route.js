// import { NextResponse } from 'next/server';
// import OpenAI from "openai";
// import ffmpeg from 'fluent-ffmpeg';
// import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
// import fs from 'fs';
// import path from 'path';

// // Configure ffmpeg to use the installed version
// ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// });

// async function convertToMp3(inputPath, outputPath) {
//     return new Promise((resolve, reject) => {
//         ffmpeg(inputPath)
//             .toFormat('mp3')
//             .audioCodec('libmp3lame')
//             .on('error', reject)
//             .on('end', resolve)
//             .save(outputPath);
//     });
// }

// export async function GET(request) {
//     try {
//         const inputPath = path.join(process.cwd(), 'app/uploads/small.mp4');
//         const outputPath = path.join(process.cwd(), 'app/uploads/small.mp3');

//         if (!fs.existsSync(inputPath)) {
//             return NextResponse.json(
//                 { error: 'Test file not found' },
//                 { status: 404 }
//             );
//         }

//         console.log('Converting to MP3...');
//         await convertToMp3(inputPath, outputPath);
//         console.log('Conversion complete');

//         console.log('Starting transcription...');
//         const transcription = await openai.audio.transcriptions.create({
//             file: fs.createReadStream(outputPath),
//             model: "whisper-1",
//         });
//         console.log('Transcription complete');

//         // Clean up the temporary MP3 file
//         fs.unlinkSync(outputPath);

//         return NextResponse.json({
//             success: true,
//             transcription: transcription.text
//         });

//     } catch (error) {
//         console.error('Error:', error);
//         return NextResponse.json(
//             { error: error.message },
//             { status: 500 }
//         );
//     }
// }