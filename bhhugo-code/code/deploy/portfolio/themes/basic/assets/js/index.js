/***
 * Excerpted from "Build Websites with Hugo",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/bhhugo for more book information.
***/
'use strict'

import axios from 'axios';
import lunr from 'lunr';

window.SearchApp = {
  searchField: document.getElementById("searchField"),
  searchButton: document.getElementById("searchButton"),
  allwords: document.getElementById("allwords"),
  output: document.getElementById("output"),
  searchData: {},
  searchIndex: {}
};

axios
  .get('/search/index.json')
  .then(response => {
    SearchApp.searchData = response.data;
    SearchApp.searchIndex = lunr(function () {
      this.pipeline.remove(lunr.stemmer)
      this.searchPipeline.remove(lunr.stemmer)
      this.ref('href');
      this.field('title');
      this.field('body');
      response.data.results.forEach(e => {
        this.add(e);
      });
    });
  });

SearchApp.searchButton.addEventListener('click', search);

function search() {
  let searchText = SearchApp.searchField.value;

  searchText = searchText
    .split(" ")
    .map( word => { return word + "*" })
    .join(" ");

  if (SearchApp.allwords.checked) {
    searchText = searchText
    .split(" ")
      .map( word => { return "+" + word })
      .join(" ");
  }

  let resultList = SearchApp.searchIndex.search(searchText);

  let list = [];
  let results = resultList.map(entry => {
    SearchApp.searchData.results.filter(d => {
      if(entry.ref == d.href) {
        list.push(d);
      }
    })
  });

  display(list);

}

function display(list) {

  SearchApp.output.innerText = '';
  if (list.length > 0) {
    const ul = document.createElement("ul");
    list.forEach(el => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = el.href;
      a.text = el.title;
      li.appendChild(a);
      ul.appendChild(li);
    });

    SearchApp.output.appendChild(ul);
  }else{
    SearchApp.output.innerHTML = "Nothing found";
  }

};
