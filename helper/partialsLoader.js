const Handlebars = require('handlebars')
const fs = require('fs')

const loadPartials = () => {
    const partialsDir = `${__dirname}/../views/partials`
    const filenames = fs.readdirSync(partialsDir)

    filenames.forEach((filename) => {
        const matches = /^([^.]+).hbs$/.exec(filename)
        if (!matches) {
            return
        }
        const name = matches[1]
        const template = fs.readFileSync(`${partialsDir}/${filename}`, 'utf8')
        Handlebars.registerPartial(name, template)
    })
}

module.exports = loadPartials
