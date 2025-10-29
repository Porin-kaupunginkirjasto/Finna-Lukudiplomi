let shouldScrollToHeader = false;
let targetHeaderId = null;
let currentlyOpenCollapseId = null;

// Add click listeners to all "Sulje lista" buttons
document.querySelectorAll(".close-and-scroll").forEach((button) => {
  button.addEventListener("click", function () {
    shouldScrollToHeader = true;
  });
});

document.querySelectorAll(".accordion-collapse").forEach((collapse) => {
  collapse.addEventListener("shown.bs.collapse", function () {
    currentlyOpenCollapseId = this.id;

    // Scroll after the new accordion has opened
    if (targetHeaderId) {
      const header = document.getElementById(targetHeaderId);
      const headerPosition =
        header.getBoundingClientRect().top + window.pageYOffset;
      console.log("header position", headerPosition);
      const offset = 80;

      window.scrollTo({
        top: headerPosition - offset,
        behavior: "smooth",
      });
      targetHeaderId = null;
    }
  });

  collapse.addEventListener("hidden.bs.collapse", function () {
    if (currentlyOpenCollapseId === this.id) {
      currentlyOpenCollapseId = null;
    }

    if (shouldScrollToHeader) {
      const headerId = this.getAttribute("aria-labelledby");
      const header = document.getElementById(headerId);
      const headerPosition =
        header.getBoundingClientRect().top + window.pageYOffset;
      console.log("header position", headerPosition);
      const offset = 80;

      window.scrollTo({
        top: headerPosition - offset,
        behavior: "smooth",
      });
      shouldScrollToHeader = false;
    }
  });
});

// Track which header was clicked
document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", function () {
    const target = this.getAttribute("data-bs-target");
    const collapse = document.querySelector(target);
    const headerId = collapse.getAttribute("aria-labelledby");

    // Check if THIS collapse is currently closed (will be opened)
    const isCurrentlyClosed = collapse.id !== currentlyOpenCollapseId;

    // If we're opening this one AND another one is currently open
    if (
      isCurrentlyClosed &&
      currentlyOpenCollapseId &&
      currentlyOpenCollapseId !== collapse.id
    ) {
      targetHeaderId = headerId;
    }
  });
});
