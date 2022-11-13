import client from './client'

const endpoint = '/generate'

const generate = (product_desc, target_audience, style, image_description) => client.post(endpoint,
    {
        product_desc,
        target_audience,
        style,
        image_description
    })

export default {
    generate
}