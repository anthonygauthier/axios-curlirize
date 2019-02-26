[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7d519058c2f340428a1b7ef22d71368f)](https://app.codacy.com/app/antho325/axios-curlirize?utm_source=github.com&utm_medium=referral&utm_content=delirius325/axios-curlirize&utm_campaign=Badge_Grade_Dashboard)
[![CircleCI](https://circleci.com/gh/delirius325/axios-curlirize.svg?style=svg)](https://circleci.com/gh/delirius325/axios-curlirize)

### Support the author
[![patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/bePatron?u=17797269)

# Description
This module is an axios third-party module to log any axios request as a curl command in the console. It was originally posted as a suggestion on the axios repository, but since we believed it wasn't in the scope of axios to release such feature, we decided to make it as an independent module.

# How it works
The module makes use of axios' interceptors to log the request as a cURL command. It also stores it in the response's config object. Therefore, the command can be seen in the app's console, as well as in the ```res.config.curlCommand``` property of the response.

# How to use it
axios-curlirize is super easy to use. First you'll have to install it.
```shell
npm i --save axios-curlirize@latest
```
Then all you have to do is import and instanciate curlirize in your app. Here's a sample:

```javascript
    import axios from 'axios';
    import express from 'express';
    import curlirize from 'axios-curlirize';

    const app = express();

    // initializing axios-curlirize with your axios instance
    curlirize(axios);

    // creating dummy route
    app.post('/', (req, res) => {
        res.send({hello: 'world!'})
    });

    // starting server
    app.listen(7500, () => {
        console.log('Dummy server started on port 7500')
        /*
             The output of this in the console will be :
             curl -X POST -H "Content-Type:application/x-www-form-urlencoded" --data {"dummy":"data"} http://localhost:7500/
        */
        axios.post('http://localhost:7500/', {dummy: 'data'})
            .then((res) => {
                console.log('success');
            })
            .catch((err) => {
                console.log(err);
            });
    });    
```
