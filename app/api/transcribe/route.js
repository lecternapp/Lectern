import fs from "fs";
import OpenAI from "openai";
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { promisify } from 'util';
import stream from 'stream';

// Configure ffmpeg to use the installed version
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const pipeline = promisify(stream.pipeline);
const openai = new OpenAI();

async function convertToMp3(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .toFormat('mp3')
            .on('error', reject)
            .on('end', resolve)
            .save(outputPath);
    });
}

// Convert MP4 to MP3 and then transcribe
const inputPath = "app/uploads/small.mp4";
const outputPath = "app/uploads/small.mp3";

await convertToMp3(inputPath, outputPath);

const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(outputPath),
    model: "whisper-1",
});

console.log(transcription.text);

// Clean up the temporary MP3 file
fs.unlinkSync(outputPath);