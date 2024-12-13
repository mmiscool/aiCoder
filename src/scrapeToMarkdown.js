#!/usr/bin/env node
import axios from 'axios';
import { load } from 'cheerio'; // Correct import for Cheerio
import TurndownService from 'turndown';


// Function to scrape URL and convert to markdown
export async function scrapeToMarkdown(url) {
    try {
        // Fetch the HTML content from the URL
        let { data: html } = await axios.get(url);

        html = html.trim();
        // test if url returned html or markdown
        // if it is markdown, return it as is
        // it might be best to test if it is html by looking for the fist character to be '<'
        if (html.startsWith('<')) {
            // Load the HTML into Cheerio
            const $ = load(html); // Use 'load' from Cheerio

            // Extract the main content (customize selector based on your needs)
            const content = $('article, .content, #main').html() || $('body').html();

            // Convert HTML to Markdown using Turndown
            const turndownService = new TurndownService();
            const markdown = turndownService.turndown(content);

            // Return the Markdown content
            return markdown;
        } else {
            return html;
        }

    } catch (error) {
        console.log('Error scraping the URL:', error);
        return `Error scraping the URL: ${error.message}`;

    }
}