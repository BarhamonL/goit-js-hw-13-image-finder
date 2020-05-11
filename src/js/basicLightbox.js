import 'basicLightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

export default {
  showLargeImage(item) {
    const instance = basicLightbox.create(`
            <img src="${item}" width="1200" height="600">
        `);

    instance.show();
  },
};
