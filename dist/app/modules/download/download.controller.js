"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVideoBuffer = void 0;
// @ts-ignore
const btch_downloader_1 = require("btch-downloader");
const handleVideoBuffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send("Error: Please provide a valid video URL.");
    }
    try {
        let data = null;
        // Determine the platform from the URL
        if (url.includes('instagram.com/reels')) {
            data = yield Instagram(url); // Call the Instagram function
        }
        else if (url.includes('youtube.com/watch')) {
            data = yield Youtube(url); // Call the YouTube function
        }
        else if (url.includes('facebook.com/watch')) {
            data = yield Facebook(url); // Call the facebook function
        }
        else {
            return res.status(400).json({ error: "Unsupported platform or invalid URL." });
        }
        let videoUrl = '';
        if (data && data.mp4) {
            videoUrl = data.mp4; // Use the mp4 link from YouTube data
            console.log('Video URL (Youtube):', videoUrl); // Log the mp4 URL
        }
        else if (data && data[0] && data[0].url && !data[0].mp4) {
            videoUrl = data[0].url; // Fallback to using the regular URL if no mp4 is available
            console.log('Video URL (Instagram):', videoUrl); // Log the fallback URL
        }
        // Check if videoUrl is valid
        if (!videoUrl) {
            return res.status(400).json({ error: "No video URL found in the response." });
        }
        // Ensure videoUrl is a valid URL before making the request
        try {
            new URL(videoUrl); // This will throw an error if the URL is invalid
        }
        catch (err) {
            return res.status(400).json({ error: `Invalid video URL: ${videoUrl}` });
        }
        const filename = "video.mp4"; // Default filename or derive dynamically
        const response = yield fetch(videoUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch video: ${response.statusText}`);
        }
        const buffer = yield response.arrayBuffer();
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.send(Buffer.from(buffer));
    }
    catch (error) {
        console.error("Error fetching video:", error);
        res.status(500).json({ error: "Failed to fetch and handle video." });
    }
});
exports.handleVideoBuffer = handleVideoBuffer;
const Instagram = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = url.match(/reels\/([^/]+)/);
    if (!matchId)
        throw new Error("Invalid Instagram URL");
    const formattedUrl = `https://www.instagram.com/p/${matchId[1]}/?utm_source=ig_web_copy_link`;
    const data = yield (0, btch_downloader_1.igdl)(formattedUrl); // Assuming igdl is a function that fetches data
    return data;
});
const Youtube = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = url.match(/[?&]v=([^&]+)/);
    const videoId = matchId ? matchId[1] : null;
    if (!videoId)
        throw new Error("Invalid YouTube URL");
    const formattedUrl = `https://youtube.com/watch?v=${videoId}`;
    const data = yield (0, btch_downloader_1.youtube)(formattedUrl); // Assuming youtube is a function that fetches data
    return data;
});
const Facebook = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = url.match(/[?&]v=([^&]+)/);
    const videoId = matchId ? matchId[1] : null;
    if (!videoId)
        throw new Error("Invalid YouTube URL");
    const data = yield (0, btch_downloader_1.fbdown)(url);
    return data;
});
