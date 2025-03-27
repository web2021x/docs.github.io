const fs = require('fs');
const path = require('path');

module.exports = {
    outDir: 'docs/components/doc',
    // 12321313
    components: 'src/components/**/*.vue',
    // templates: {
    //     component: (renderedDoc) => {
    //         const templatePath = path.resolve(__dirname, 'docs/templates/component.hbs');
    //         return fs.readFileSync(templatePath, 'utf-8');
    //     }
    // }
};
