document.addEventListener(
	"DOMContentLoaded",
	function () {
		let answerObj = {
			1: "2",
			2: "1",
			3: "2",
			4: "3",
			5: "4",
			6: "3",
			7: "3",
			8: "1",

			result: 0,
		};

		let sldierQuiz = new Swiper(".quiz-slider", {
			slidesPerView: 1,
			watchOverflow: true,
			spaceBetween: 200,
			allowTouchMove: false,
		});

		let arrButtonNext = Array.prototype.slice.call(document.querySelectorAll(".card-variant__button"));

		arrButtonNext.forEach((element) => {
			element.addEventListener("click", function (e) {
				if (!element.classList.contains("js-final")) {
					e.preventDefault();
					sldierQuiz.slideNext();
				} else {
					if (answerObj.result <= 3) {
						window.location.href = "page-result-three.html";
					}

					if (answerObj.result > 3 && answerObj.result <= 5) {
						window.location.href = "page-result-two.html";
					}

					if (answerObj.result > 5 && answerObj.result <= 8) {
						window.location.href = "page-result-one.html";
					}
				}
			});
		});

		let arrQuest = Array.prototype.slice.call(document.querySelectorAll(".item-answer"));

		if (arrQuest.length > 0) {
			arrQuest.forEach((element, index, array) => {
				element.addEventListener("click", function () {
					if (!element.classList.contains("--not-active")) {
						let parent = element.closest(".card-variant");

						parent.classList.add("--completed");

						let idQuest = element.dataset.answer;
						let indexAnswer = element.dataset.indexAnswer;
						let arrAnswer = array.filter((item) => item.dataset.answer == idQuest);

						if (answerObj[idQuest] == indexAnswer) {
							this.classList.add("--true");

							answerObj.result += 1;

							arrAnswer.forEach((el) => {
								if (el != this) {
									el.classList.add("--disabled");
								}

								el.classList.add("--not-active");
							});
						} else {
							this.classList.add("--false");
							arrAnswer.forEach((el) => {
								if (el != this && answerObj[idQuest] != el.dataset.indexAnswer) {
									el.classList.add("--disabled");
								}

								if (answerObj[idQuest] == el.dataset.indexAnswer) {
									el.classList.add("--true");
								}

								el.classList.add("--not-active");
							});
						}
					}
				});
			});
		}

		let arrLeftImage = document.querySelectorAll(".card-variant");

		if (arrLeftImage.length > 0) {
			arrLeftImage.forEach((element) => {
				let parallaxInstanceRight = new Parallax(element, {
					hoverOnly: true,
					pointerEvents: true,
					selector: ".card-variant__image-right img",
				});

				let parallaxInstanceLeft = new Parallax(element, {
					hoverOnly: true,
					pointerEvents: true,
					selector: ".card-variant__image-left img",
				});
			});
		}
	},
	false
);
