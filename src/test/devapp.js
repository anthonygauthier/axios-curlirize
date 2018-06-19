import express from 'express';
import logger from 'fancy-log';

const app = express();

app.get('/', (req, res) => {
    logger.info('request made!');
    res.send({hello: 'world'});
})

app.listen(7500, () => {
    logger.info('Express dev server listening on port 7500');
});

module.exports.app;