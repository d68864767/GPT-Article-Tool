```javascript
const axios = require('axios');

class Webflow {
    constructor() {
        this.apiKey = process.env.WEBFLOW_API_KEY;
        this.headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'accept-version': '1.0.0',
            'Content-Type': 'application/json'
        };
        this.siteId = process.env.WEBFLOW_SITE_ID;
        this.collectionId = process.env.WEBFLOW_COLLECTION_ID;
    }

    async pushArticleToWebflow(article) {
        const url = `https://api.webflow.com/sites/${this.siteId}/collections/${this.collectionId}/items`;

        const data = {
            "fields": {
                "name": article.title,
                "slug": this.generateSlug(article.title),
                "draft": true,
                "content": article.content
                // Add other fields as per your Webflow collection
            }
        };

        try {
            const response = await axios.post(url, data, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error(`Failed to push article to Webflow: ${error}`);
        }
    }

    generateSlug(title) {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
}

module.exports = new Webflow();
```
