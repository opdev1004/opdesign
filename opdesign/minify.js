const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

function minifyCSSFiles(dirPath)
{
    fs.readdir(dirPath, (err, files) =>
    {
        if (err)
        {
            console.error('Error reading the directory:', err);
            return;
        }

        const cssFiles = files.filter(file => file.endsWith('.css'));

        cssFiles.forEach(file =>
        {
            const filePath = path.join(dirPath, file);
            const outputFilePath = path.join(dirPath, `min-${ file }`);

            fs.readFile(filePath, 'utf8', (err, data) =>
            {
                if (err)
                {
                    console.error(`Error reading file ${ file }:`, err);
                    return;
                }

                const output = new CleanCSS().minify(data);
                if (output.errors.length)
                {
                    console.error(`Errors minifying ${ file }:`, output.errors);
                    return;
                }

                fs.writeFile(outputFilePath, output.styles, (err) =>
                {
                    if (err)
                    {
                        console.error(`Error writing minified file ${ outputFilePath }:`, err);
                        return;
                    }
                    console.log(`Successfully minified ${ file } to ${ outputFilePath }`);
                });
            });
        });
    });
}

const distPath = path.join(__dirname, 'dist');
minifyCSSFiles(distPath);