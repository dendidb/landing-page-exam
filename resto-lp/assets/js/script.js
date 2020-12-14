AOS.init({
	duration: 1000,
	easing: 'slide',
	once: true
});

// Navbar Sticky

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
	if (window.pageYOffset > sticky) {
		navbar.classList.add("navbar-sticky")
	} else {
		navbar.classList.remove("navbar-sticky");
	}
}

// Menu mobile

if ($(".mobile-menu").length) {
	$(".mobile-menu").on("click", function() {
		$(this).toggleClass("active");
		$(".nav-menu").slideToggle(300);
	});
}

//  Nav-menu toggle

$("a[href*=\\#]:not([href=\\#])").on("click", function() {
	if (
		location.pathname.replace(/^\//, "") ==
		this.pathname.replace(/^\//, "") &&
		location.hostname == this.hostname
		) {
		var target = $(this.hash);
	target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
	if (target.length) {
		var width = $(window).width();
		if (width < 991) {
			$(".mobile-menu").removeClass("active");
			$(".header-area .nav-menu").slideUp(200);
		}
		$("html,body").animate(
		{
			scrollTop: target.offset().top - 80
		},
		700
		);
		return false;
	}
}
});

// SmoothScroll

$(document).ready(function() {
	$(document).on("scroll", onScroll);
	$('a[href^="#"]').on("click", function(e) {
		e.preventDefault();
		$(document).off("scroll");

		$("a").each(function() {
			$(this).removeClass("active");
		});
		$(this).addClass("active");

		var target = this.hash,
		menu = target;
		var target = $(this.hash);
		$("html, body")
		.stop()
		.animate(
		{
			scrollTop: target.offset().top - 79
		},
		500,
		"swing",
		function() {
			window.location.hash = target;
			$(document).on("scroll", onScroll);
		}
		);
	});
});

//  Active Nav Link

function onScroll(event) {
	var scrollPos = $(document).scrollTop();
	$(".nav-menu a").each(function() {
		var currLink = $(this);

		try { 
			var refElement = $(currLink.attr("href"));
			if (
				refElement.position().top <= scrollPos &&
				refElement.position().top + refElement.height() > scrollPos
				) {
				$(".nav-menu li a").removeClass("active");
			currLink.addClass("active");
		} else {
			currLink.removeClass("active");
		}
	} catch (e) {
        // Ignore href='javascript:;'
      }
    });
}

const Accordion = {
    settings: {
      // Expand the first item by default
      first_expanded: false,
      // Allow items to be toggled independently
      toggle: false
    },

    openAccordion: function(toggle, content) {
      if (content.children.length) {
        toggle.classList.add("is-open");
        let final_height = Math.floor(content.children[0].offsetHeight);
        content.style.height = final_height + "px";
      }
    },

    closeAccordion: function(toggle, content) {
      toggle.classList.remove("is-open");
      content.style.height = 0;
    },

    init: function(el) {
      const _this = this;

      // Override default settings with classes
      let is_first_expanded = _this.settings.first_expanded;
      if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
      let is_toggle = _this.settings.toggle;
      if (el.classList.contains("is-toggle")) is_toggle = true;

      // Loop through the accordion's sections and set up the click behavior
      const sections = el.getElementsByClassName("accordion");
      const all_toggles = el.getElementsByClassName("accordion-head");
      const all_contents = el.getElementsByClassName("accordion-body");
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const toggle = all_toggles[i];
        const content = all_contents[i];

        // Click behavior
        toggle.addEventListener("click", function(e) {
          if (!is_toggle) {
            // Hide all content areas first
            for (let a = 0; a < all_contents.length; a++) {
              _this.closeAccordion(all_toggles[a], all_contents[a]);
            }

            // Expand the clicked item
            _this.openAccordion(toggle, content);
          } else {
            // Toggle the clicked item
            if (toggle.classList.contains("is-open")) {
              _this.closeAccordion(toggle, content);
            } else {
              _this.openAccordion(toggle, content);
            }
          }
        });

        // Expand the first item
        if (i === 0 && is_first_expanded) {
          _this.openAccordion(toggle, content);
        }
      }
    }
  };

  (function() {
    // Initiate all instances on the page
    const accordions = document.getElementsByClassName("accordions");
    for (let i = 0; i < accordions.length; i++) {
      Accordion.init(accordions[i]);
    }
  })();