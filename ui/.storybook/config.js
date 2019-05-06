import { setOptions } from '@storybook/addon-options'
import { addParameters, configure } from '@storybook/react'

function loadStories() {
    const req = require.context('../src', true, /\.stories\.tsx$/)
    req.keys().forEach(filename => {
        console.log(filename)
        return req(filename)
    })
}

setOptions({
    hierarchySeparator: /\/|\./, // matches a . or /
    hierarchyRootSeparator: /\|/ //matches a |
})

configure(loadStories, module)
