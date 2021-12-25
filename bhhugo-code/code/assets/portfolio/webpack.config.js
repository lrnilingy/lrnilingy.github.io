/***
 * Excerpted from "Build Websites with Hugo",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/bhhugo for more book information.
***/
const path = require('path');

module.exports = {
  entry: './themes/basic/assets/js/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'themes','basic','assets', 'js')
  }
};
