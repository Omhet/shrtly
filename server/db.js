const db = require('node-persist');

const urlsKey = 'urls';
exports.default = class DB {
    async init(dir) {
        console.log('INIT DB IN ', dir);
        await db.init({ dir });
        const urls = await db.getItem(urlsKey);
        if (!urls) {
            console.log('CREATE NEW DB');
            await db.setItem(urlsKey, []);
        }
    }

    async addUrl(url) {
        if (url.trim().length === 0) {
            return;
        }
        url = encodeURI(url);

        const urls = await db.getItem(urlsKey);

        let index;
        urls.forEach((el, i) => {
            if (el.url === url) {
                index = i;
            }
        });

        let count = 0;
        console.log('DB ADD URL (get from storage)', { urls, url, index });

        if (index === undefined) {
            index = urls.length;
            const newUrls = [...urls, { url, count }];
            console.log('DB ADD URL (add new)', { urls, newUrls, url, index });
            db.updateItem(urlsKey, newUrls);
        } else {
            count = urls[index].count;
        }

        return { index, count };
    }

    async getUrl(index) {
        const urls = await db.getItem(urlsKey);
        const urlData = urls[index];
        console.log('DB GET URL', { urls, index });
        if (urlData !== undefined) {
            const { url, count } = urlData;
            urls[index].count = count + 1;
            db.updateItem(urlsKey, urls);
            return url;
        }
    }
}