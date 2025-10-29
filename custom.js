function finnaCustomInit() {
  initAccordionScrollBehavior("lukudiplomiAccordion");
}

//Function to select lukudiplomi-tasot
function filterTaso(filter) {
  const elements = document.querySelectorAll(".result.grid");
  //console.log("elements", elements)
  const elementArray = Array.from(elements);
  //console.log("array: ", elementArray)
  if (filter === "Kaikki tasot") {
    elementArray.forEach((el) => el.classList.remove("sata-hide"));
    return;
  }
  const allFiltered = elementArray.filter((el) =>
    el.innerText.includes(filter)
  );
  const allNotFiltered = elementArray.filter(
    (el) => !el.innerText.includes(filter)
  );
  //console.log("filtered: ", allFiltered);
  allFiltered.forEach((el) => el.classList.remove("sata-hide"));
  allNotFiltered.forEach((el) => el.classList.add("sata-hide"));
}

window.addEventListener("load", () => {
  const lukudiplomiTasoSelection = document.querySelector("#lukudiplomi-tasot");
  console.log(lukudiplomiTasoSelection);
  if (lukudiplomiTasoSelection) {
    lukudiplomiTasoSelection.addEventListener("click", () => {
      const filter = lukudiplomiTasoSelection.selectedOptions[0].innerText;
      console.log(filter);
      filterTaso(filter);
    });
  }
});

function initAccordionScrollBehavior(accordionId) {
  let shouldScrollToHeader = false;
  let targetHeaderId = null;
  let currentlyOpenCollapseId = null;

  const accordion = document.getElementById(accordionId);
  if (!accordion) {
    console.error(`Accordion with id "${accordionId}" not found`);
    return;
  }

  // Track which accordion is currently open
  accordion.querySelectorAll(".accordion-collapse").forEach((collapse) => {
    collapse.addEventListener("shown.bs.collapse", function () {
      currentlyOpenCollapseId = this.id;

      // Scroll after the new accordion has opened
      if (targetHeaderId) {
        const accordionPosition =
          accordion.getBoundingClientRect().top + window.pageYOffset;
        const offset = 80;
        window.scrollTo({
          top: accordionPosition - offset,
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
        const accordionPosition =
          accordion.getBoundingClientRect().top + window.pageYOffset;
        const offset = 80;
        window.scrollTo({
          top: accordionPosition - offset,
          behavior: "smooth",
        });
        shouldScrollToHeader = false;
      }
    });
  });

  // Add click listeners to all "Sulje lista" buttons
  accordion.querySelectorAll(".close-and-scroll").forEach((button) => {
    button.addEventListener("click", function () {
      shouldScrollToHeader = true;
    });
  });

  // Track which header was clicked
  accordion.querySelectorAll(".accordion-button").forEach((button) => {
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
}
