//jshint esversion:8
//jshint node:true
const fs = require('fs');
const path = require('path');
const csvToJson = require('convert-csv-to-json');

// Make an async function that gets executed immediately
(async () => {
    // Our starting point
    try {
        // Get the files as an array
        const files = await fs.promises.readdir('.');

        // Loop them all with the new for...of
        for (const file of files) {
            if (/csv$/.test(file)) {
                console.log(file);
                csvToJson
                    .fieldDelimiter(',')
                    .generateJsonFileFromCsv(
                        file,
                        file.replace(/csv$/, 'json')
                    );
            }
        } // End for...of
    } catch (e) {
        // Catch anything bad that happens
        console.error("We've thrown! Whoops!", e);
    }
})(); // Wrap in parenthesis and call now
