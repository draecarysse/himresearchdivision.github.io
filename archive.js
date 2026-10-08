/* Archive filter & search logic */
(function () {
  var table = document.getElementById("archive-table");
  if (!table) return;

  var tbody = table.querySelector("tbody");
  var rows = Array.prototype.slice.call(tbody.querySelectorAll("tr"));
  var empty = document.getElementById("archive-empty");
  var filterBtns = document.querySelectorAll(".archive-filter-btn");
  var searchInput = document.getElementById("archive-search-input");

  var activeFilter = "all";

  function applyFilters() {
    var query = (searchInput ? searchInput.value : "").trim().toLowerCase();
    var visible = 0;

    rows.forEach(function (row) {
      var category = row.getAttribute("data-category") || "";
      var text = row.textContent.toLowerCase();

      var matchesFilter = (activeFilter === "all" || category === activeFilter);
      var matchesSearch = (query === "" || text.indexOf(query) !== -1);

      if (matchesFilter && matchesSearch) {
        row.style.display = "";
        visible++;
      } else {
        row.style.display = "none";
      }
    });

    if (empty) {
      empty.style.display = visible === 0 ? "block" : "none";
    }
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      activeFilter = btn.getAttribute("data-filter") || "all";
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
})();
