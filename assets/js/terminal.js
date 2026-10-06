/*
 * =========================================================
 * HEAVENLY IRREGULARITY MONITORING
 * TERMINAL BOOT SEQUENCE
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

  const bootSequence = document.getElementById("boot-sequence");
  const archiveInterface = document.getElementById("archive-interface");

  if (!bootSequence || !archiveInterface) {
    return;
  }


  const terminalLines = document.querySelectorAll(
    ".terminal-line"
  );


  /*
   * -------------------------------------------------------
   * CONFIGURATION
   * -------------------------------------------------------
   */

  const typingSpeed = 45;

  const pauseAfterLine = 700;

  const pauseAfterBoot = 1200;


  /*
   * -------------------------------------------------------
   * TYPEWRITER
   * -------------------------------------------------------
   */

  function typeLine(element, text) {

    return new Promise((resolve) => {

      let index = 0;

      element.classList.add("active");


      const cursor = document.createElement("span");

      cursor.className = "typing-cursor";

      cursor.textContent = "█";


      element.appendChild(cursor);


      function typeCharacter() {

        if (index < text.length) {

          cursor.insertAdjacentText(
            "beforebegin",
            text.charAt(index)
          );

          index++;

          /*
           * Slightly random typing speed.
           * This prevents the animation from
           * looking completely mechanical.
           */

          const variation =
            Math.floor(
              Math.random() * 30
            );

          setTimeout(
            typeCharacter,
            typingSpeed + variation
          );

        } else {

          /*
           * Remove the typing cursor from
           * the completed line.
           */

          cursor.remove();

          /*
           * Leave a small visual pause before
           * the next command.
           */

          setTimeout(
            resolve,
            pauseAfterLine
          );

        }

      }


      typeCharacter();

    });

  }


  /*
   * -------------------------------------------------------
   * BOOT SEQUENCE
   * -------------------------------------------------------
   */

  async function startBootSequence() {

    /*
     * Make sure every line starts invisible.
     */

    terminalLines.forEach((line) => {
      line.textContent = "";
      line.classList.remove("active");
    });


    /*
     * Type every line one after another.
     */

    for (const line of terminalLines) {

      const text =
        line.getAttribute("data-text");

      await typeLine(
        line,
        text
      );

    }


    /*
     * Small pause before opening
     * the actual archive.
     */

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          pauseAfterBoot
        )
    );


    /*
     * Hide boot screen.
     */

    bootSequence.classList.add("boot-complete");


    /*
     * Reveal archive interface.
     */

    archiveInterface.classList.remove("hidden");

    archiveInterface.classList.add("interface-loaded");


    /*
     * Scroll gently toward the archive.
     */

    setTimeout(() => {

      archiveInterface.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 300);

  }


  /*
   * -------------------------------------------------------
   * START
   * -------------------------------------------------------
   */

  startBootSequence();

});
