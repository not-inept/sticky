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

  function fix_table_footer() {
    var footer = document.querySelector("body > div.main > div.shorten.content.constrain > table > tfoot > tr > td");
    footer.colSpan = footer.colSpan + 2;
  }

  function insert_data(element) {
    var short_url = element.querySelector(".short-url > a").textContent;
    var id = short_url.split('/')[1];

    // Label
    var label = document.createElement("td");

    var label_text = document.createElement("div");
    label_text.innerHTML = "Click to enter...";
    label_text.id = "sticky_" + id + "_text";

    var label_input = document.createElement("input");
    label_input.type = "text";
    label_input.placeholder = "Enter a link label";
    label_input.id = "sticky_" + id + "_input";
    label_input.style.visibility = "hidden";


    var result = localStorage.getItem("sticky_" + id + "_name");
    if (result !== null) {
      label_input.value = result;
      label_text.innerHTML = result;
    }
    function swap_display() {
      label_input = document.getElementById( "sticky_" + id + "_input");
      label_text = document.getElementById( "sticky_" + id + "_text");
      if (label_input.style.visibility == "hidden") {
        label_input.style.visibility = "visible";
        label_text.style.visibility = "hidden";
        label_input.focus();
      } else {
        label_input.style.visibility = "hidden";
        label_text.style.visibility = "visible";
      }
    }
    label_input.onchange = function() {
      localStorage.setItem("sticky_" + id + "_name", this.value);
      label_text.innerHTML = this.value;
    }

    label_input.onblur = swap_display;
    label_text.onclick = swap_display;


    label.className += " mdl-data-table__cell--non-numeric";
    label.appendChild(label_input);
    label.appendChild(label_text);
    element.appendChild(label);

    // Create tags
    var tags = document.createElement("td");
    var tags_input = document.createElement("div");
    tags_input.type = "text";
    tags_input.placeholder = "Separate with commas...";
    var result = localStorage.getItem("sticky_" + id + "_tags");
    var saved_tags = [];
    if (result !== null) {
      saved_tags = result.split(',');
    }

    tags.className += " mdl-data-table__cell--non-numeric";
    tags_input.id = "tags_for_" + id;
    tags.style.paddingTop = "10px";
    tags.appendChild(tags_input)
    element.appendChild(tags);

    var taggle_obj = new Taggle(tags_input.id, {
      tags: saved_tags,
      onTagAdd: function(event, tag) {
        var tags = taggle_obj.getTags().values;
        localStorage.setItem("sticky_" + id + "_tags", tags.join(','));
      },
      onTagRemove: function(event, tag) {
        var tags = taggle_obj.getTags().values;
        localStorage.setItem("sticky_" + id + "_tags", tags.join(','));
      }
    });
  }


  console.log("Working on it :)");
  window.onload = function() {
    console.log("Loaded :)");
    var container = document.querySelector("body > div.main > div.shorten.content.constrain");
    container.style.overflowX = "scroll";
    insert_table_header();
    var tbody = document.querySelector("body > div.main > div.shorten.content.constrain > table > tbody");
    fix_table_footer();
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
