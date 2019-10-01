const isBookmarkUncategorized = bookmark => !bookmark.children;

const removeCategory = e => {
  const id = e.target.id;
  const title = id.split("|")[1];
  const categoryId = id.split("|")[0];
  const input = prompt("Please type in the name of the category to confirm.");
  if (input == title) {
    chrome.bookmarks.remove(categoryId.toString(), output =>
      console.log(output)
    );
    location.reload();
  }
};

const getAchorTag = bookmark => {
  const anchorTag = document.createElement("a");
  anchorTag.innerHTML = bookmark.title;
  anchorTag.href = bookmark.url;
  anchorTag.target = "_blank";
  return anchorTag;
};

const formatBookmark = bookmark => {
  const newBookmark = document.createElement("div");
  const anchorTag = getAchorTag(bookmark);

  newBookmark.className = "categorized-bookmark";
  newBookmark.appendChild(anchorTag);
  return newBookmark;
};

const createNewCategory = () => {
  const category = document.createElement("div");
  category.className = "category-new";
  return category;
};

const createCategoryHeader = (heading, categoryId) => {
  const category = document.createElement("div");
  category.className = "category-heading";
  category.innerHTML = heading;

  const deleteButton = document.createElement("button");
  deleteButton.id = `${categoryId}|${heading}`;
  deleteButton.onclick = removeCategory;
  deleteButton.className = "delete-category-btn";
  deleteButton.innerHTML = "Remove";

  category.appendChild(deleteButton);
  return category;
};
const createCategoryBody = () => {
  const category = document.createElement("div");
  category.className = "category-body-bookmarks";
  return category;
};

const setupUncategorizedList = bookmark => {
  const bookmarksList = document.getElementById("uncategorized-bookmarks-body");
  const anchorTag = getAchorTag(bookmark);

  const newBookmark = document.createElement("div");
  newBookmark.className = "uncategorized-bookmark";
  newBookmark.appendChild(anchorTag);

  bookmarksList.appendChild(newBookmark);
};

const createCategorizedBookmarks = bookmarkList => {
  const newCategory = createNewCategory();
  const newCategoryHeading = createCategoryHeader(
    bookmarkList.title,
    bookmarkList.id
  );
  const newCategoryBody = createCategoryBody();

  bookmarkList.children.map(bookmark => {
    const newBookmark = formatBookmark(bookmark);
    newCategoryBody.appendChild(newBookmark);
  });

  newCategory.appendChild(newCategoryBody);
  newCategory.appendChild(newCategoryHeading);
  document
    .getElementById("categorized-bookmarks-body")
    .appendChild(newCategory);
};

const loadBookmarks = () => {
  chrome.bookmarks.getTree(output => {
    const bookmarks = output[0].children[0].children;

    bookmarks.map(bookmark => {
      if (isBookmarkUncategorized(bookmark)) {
        setupUncategorizedList(bookmark);
      } else {
        createCategorizedBookmarks(bookmark);
      }
    });
  });
};

const initialize = () => {
  loadBookmarks();
};
initialize();
