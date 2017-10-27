(function(window, document) {
  function insert_table_header() {
    var label_th = document.createElement('th');
    label_th.innerHTML = "Label";
    label_th.className += "mdl-data-table__cell--non-numeric";

    var tags_th = document.createElement('th');
    tags_th.innerHTML = "Tags";
    tags_th.className += " mdl-data-table__cell--non-numeric";
    tags_th.className += "all-clicks";

    var thead = document.querySelector("body > div.main > div.shorten.content.constrain > table > thead > tr");
    thead.appendChild(label_th);
    thead.appendChild(tags_th);
  }

  function insert_data(element) {
    var short_url = element.querySelector(".short-url > a").textContent;
    var id = short_url.split('/')[1];

    var label = document.createElement("td");
    label.innerHTML = id;
    label.className += " mdl-data-table__cell--non-numeric";
    element.appendChild(label);

    var tags = document.createElement("td");
    tags.innerHTML = "tags, tags";
    tags.className += " mdl-data-table__cell--non-numeric";
    element.appendChild(tags);
  }

  console.log("Working on it :)");
  window.onload = function() {
    console.log("Loaded :)");
    insert_table_header();
    var tbody = document.querySelector("body > div.main > div.shorten.content.constrain > table > tbody");
    // The mutation observer is an amazing thing-- look it up, it's magic!
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(insert_data);
      });
    });
    var config = { childList: true };
    observer.observe(tbody, config);
  };

}(window, document));
