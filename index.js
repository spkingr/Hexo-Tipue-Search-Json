var util = require('hexo-util');

hexo.extend.generator.register('tipue-search-json', hexo_generator_json_content);

function hexo_generator_json_content(site) {
    var minify = function (str) {
            return util.stripHTML(str).trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
        },

        keys = {
            title: true,
            url: true,
            text: true,
            tags: true
        },

        json = {};


    var catags = function (item) {
            return item.name.replace(/\s+/g, '-').toLowerCase();
        },
        postsContent = site.posts.sort('-date').filter(function (post) {
            return post.published;
        }).map(function (post) {
            var actualPost = {};

            Object.getOwnPropertyNames(keys).forEach(function (item) {
                switch (item) {
                    case 'text':
                        return actualPost[item] = minify(post.content);

                    case 'tags':
                        return actualPost[item] = post.tags.map(catags).join(' ');

                    case 'url':
                        return actualPost[item] = '/' + post['path'];

                    default:
                        return actualPost[item] = post[item];
                }
            });

            return actualPost;
        });

    json.pages = postsContent;


    return {
        path: 'tipuesearch_content.js',
        data: JSON.stringify(json)
    };
}